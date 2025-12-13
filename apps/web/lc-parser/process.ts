// import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { streamText } from 'ai';
import "dotenv/config";
import { readFileSync, writeFileSync } from 'fs';
import { globSync } from "glob";
import { ProxyAgent, type RequestInit as UndiciRequestInit, fetch as undiciFetch } from 'undici';

const HTTP_PROXY = process.env.HTTP_PROXY!; // eg. http://localhost:8080/

function proxyFetch(input: RequestInfo | URL, init?: RequestInit) {
  console.log('使用代理進行請求:', HTTP_PROXY);
  const dispatcher = new ProxyAgent({
    uri: HTTP_PROXY,
    requestTls: {
      rejectUnauthorized: false,
    },
    proxyTls: {
      rejectUnauthorized: false,
    },
  });

  let url: string | URL;
  if (typeof input === 'string') {
    url = input;
  } else if (input instanceof URL) {
    url = input;
  } else if (input instanceof Request) {
    url = input.url;
  } else {
    throw new Error(`Unsupported input type: ${typeof input}`);
  }

  if (!init) {
    return undiciFetch(url, {
      dispatcher,
    }) as Promise<Response>;
  }

  (init as UndiciRequestInit).dispatcher = dispatcher;
  return undiciFetch(url, init as UndiciRequestInit) as Promise<Response>;
}

const openai = createOpenAICompatible({
  baseURL: process.env.BASE_URL!,
  apiKey: process.env.MY_API_KEY!,
  name: 'qwen'
});

// const google = createGoogleGenerativeAI({
//   apiKey: process.env.GOOGLE_API_KEY!,
//   fetch: proxyFetch,
// });

// const model_id='qwen-plus-latest';
const model_id=process.env.MODEL_ID!;

console.log('🤖 使用的模型介面位址:', process.env.BASE_URL);
console.log('🤖 使用的模型 API Key:', process.env.MY_API_KEY);

const systemPrompt = `你是一個專業的技術文件整理助手。處理使用者輸入 Markdown 文件，嚴格按照指定的 JSON 格式輸出，輸出內容不要包含程式碼標籤。

## 輸出要求

請嚴格按照以下 JSON Schema 輸出：

{
  "title": "文件標題，字串",
  "src": "文件源連結，字串", // 如果是一級章節則為主頁連結，二級章節則為 null,
  "summary": "章節的描述性內容，字串，可選",
  "children": [ // 子章節陣列
    {
      "title": "子章節標題，字串",
      "src": "子章節源連結，字串，可選", // 如果是題目則為題目連結，否則為 null
      "summary": "子章節的描述性內容，字串，可選",
      "problems": [ // 題目清單
        {
          "id": "題號，字串",
          "title": "題目標題，字串",
          "slug": "題目路徑，字串",
          "src": "題目連結，字串",
          "solution": "題解連結，字串，如果沒有則為 null",
          "score": "題目分數，整數",
          "isPremium": "是否為付費題目，布林值"
        }
      ],
      "children": [ /* 递归子章节结构，最大深度 3 */ ]
    }
  ],
}

## 處理規則

1. **提取標題層級**：識別 Markdown 的標題層級（#, ##, ###, ####）作為章節結構，章節結構通過 \`children\` 陣列欄位表示章節和子章節的巢狀關係
2. **章節描述性內容**：不要包含題目清單資訊，保留原文中的圖片、連結和非格式化文字，放在 \`summary\` 欄位中，如果沒有描述性內容，\`summary\` 欄位忽略
3. **識別問題清單**：提取文件中的問題、題目，練習等清單項，放在章節的 \`problems\` 陣列欄位中，每個問題包含 \`id\`（題號）、\`title\`（題目標題）、\`slug\`（題目路徑）、\`src\`（題目連結）、\`solution\`（題解連結，如果有的話，否則為 null）、\`score\`（題目分數）、\`isPremium\`（是否為付費題目，布林值）
4. **提取元資料**：識別難度、標籤、連結等資訊

## 重要提示
- 如果輸出被截斷，下一輪會發送"繼續"，請從截斷處繼續輸出，不要重複已輸出的內容
- 確保 JSON 格式完整，所有括號和引號都要閉合
`;

/**
 * 檢查 JSON 是否完整
 */
function isJsonComplete(text: string): boolean {
  try {
    JSON.parse(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * 檢查 JSON 是否可能被截斷（啟發式檢查）
 */
function isLikelyTruncated(text: string): boolean {
  const trimmed = text.trim();
  // 检查是否以完整的 JSON 结尾
  if (!trimmed.endsWith('}') && !trimmed.endsWith(']')) {
    return true;
  }
  // 检查括号是否匹配
  const openBraces = (trimmed.match(/\{/g) || []).length;
  const closeBraces = (trimmed.match(/\}/g) || []).length;
  const openBrackets = (trimmed.match(/\[/g) || []).length;
  const closeBrackets = (trimmed.match(/\]/g) || []).length;
  
  return openBraces !== closeBraces || openBrackets !== closeBrackets;
}

const runProcess = async (input_file: string) => {
  const fullText = readFileSync(input_file, 'utf-8');
  let shouldContinue = true;
  let consecutiveStops = 0; // ✅ 新增：连续 stop 计数
  let fullResponse = '';
  let iterationCount = 0;
  const maxIterations = 10;
  
  // 計算輸入文字的大致 token 數（中文約 1 字元 = 1.5-2 tokens）
  const estimatedInputTokens = fullText.length * 1.5;
  console.log(`📄 檔案大小: ${(fullText.length / 1024).toFixed(2)} KB`);
  console.log(`📊 估計輸入 tokens: ${Math.round(estimatedInputTokens)}`);

  while (shouldContinue && iterationCount < maxIterations) {
    iterationCount++;
    console.log(`\n🔄 第 ${iterationCount} 轮处理...`);

    let messages: any[] = [];
    
    if (iterationCount === 1) {
      // ✅ 第一輪：完整輸入
      messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: fullText }
      ];
    } else {
      // ✅ 續寫策略：滑動視窗 + 原文摘要
      const CONTEXT_WINDOW = 3000; // 保留最近 3000 字符
      const recentOutput = fullResponse.length > CONTEXT_WINDOW ? fullResponse.slice(-CONTEXT_WINDOW) : fullResponse;
      const omittedChars = fullResponse.length > CONTEXT_WINDOW ? fullResponse.length - CONTEXT_WINDOW : 0;
      // 提取最后几个字符作为续写锚点
      const lastChars = fullResponse.slice(-100); // 最后100个字符      
      // 構建上下文提示
      let contextHint = '';
      if (omittedChars > 0) {
        contextHint = `[已省略前面 ${omittedChars} 字符的输出]\n...\n`;
      }
      contextHint += recentOutput;
      
      messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: fullText }, // ✅ 保留原文
        { role: 'assistant', content: contextHint },
        { 
              role: 'user', 
              content: `你的上一輪輸出在這裡停止：
"""
${lastChars}
"""

請注意：
1. 這是第 ${iterationCount} 輪續寫，你已經輸出了 ${fullResponse.length} 字元
2. 上面顯示的是你輸出的最後部分內容
3. 請直接從截斷處繼續，補全剩餘的 JSON 內容
4. **不要**重複已輸出的內容
5. **不要**重新開始
6. 直接繼續寫，就像接著上面的內容繼續打字一樣

繼續：` }
      ];
    }

    try {
      const result = streamText({
        model: openai(model_id),
        // model: google("gemini-2.5-flash"),
        messages,
        // ✅ 设置足够大的输出 token（根据模型支持调整）
        maxOutputTokens: 32768, // 或更大, 视模型支持而定
        temperature: 0.1, // 降低随机性，提高一致性
      });
      
      let chunk = '';
      for await (const delta of result.textStream) {
        chunk += delta;
        process.stdout.write(delta);
      }
      
      fullResponse += chunk;
      
      const reason = await result.finishReason;
      console.log(`\n--- 完成原因: ${reason} ---`);
      console.log(`--- 本輪輸出: ${chunk.length} 字元 ---`);
      console.log(`--- 累計輸出: ${fullResponse.length} 字元 ---`);
      
      // ✅ 改进的判断逻辑
      if (reason === 'length') {
        // 因長度限制被截斷，需要繼續
        shouldContinue = true;
        consecutiveStops = 0; // 重置计数
        console.log('⚠️  輸出因長度限制被截斷，將繼續...');
      } else if (reason === 'stop') {
          
        // 儲存結果
        const outputPath = input_file.replace(/\.md$/, `_iter${iterationCount}.json`);
        writeFileSync(outputPath, fullResponse, 'utf-8');

        consecutiveStops++; // 累加 stop 次數
        
        const jsonComplete = isJsonComplete(fullResponse);
        const likelyTruncated = isLikelyTruncated(fullResponse);
        
        console.log(`JSON 完整性: ${jsonComplete ? '✅' : '❌'}`);
        console.log(`截斷檢測: ${likelyTruncated ? '⚠️  可能截斷' : '✅ 看起來完整'}`);
        console.log(`連續 stop 次數: ${consecutiveStops}`);
        
        if (jsonComplete) {
          // JSON 完整，立即停止
          shouldContinue = false;
          console.log('✅ JSON 格式完整且可解析，處理完成');
        } else if (likelyTruncated) {
          // 明顯截斷，繼續
          shouldContinue = true;
          consecutiveStops = 0; // 重置（因为确实需要继续）
          console.log('⚠️  JSON 不完整，將繼續...');
        } else if (consecutiveStops >= 2) {
          // ✅ 連續 2 次 stop 且 JSON 看起來完整（雖然解析失敗）
          // 可能是格式問題，不是截斷問題，應該停止
          shouldContinue = false;
          console.log('⚠️  連續 2 次正常停止，但 JSON 格式有誤，強制結束');
        } else if (chunk.length < 50) {
          // ✅ 輸出很少且非截斷，可能已完成
          shouldContinue = false;
          console.log('⚠️  輸出極少，判斷為已完成');
        } else {
          // 不確定，再試一輪
          shouldContinue = true;
          console.log('⚠️  狀態不明確，嘗試繼續...');
        }
      } else {
        // 其他原因（error 等），停止
        shouldContinue = false;
        console.log(`❌ 異常停止: ${reason}`);
      }
      
    } catch (error) {
      console.error(`\n❌ 第 ${iterationCount} 輪處理出錯:`, error);
      shouldContinue = false;
    }
    
    // ✅ 添加輪次間延遲，避免限流
    if (shouldContinue) {
      console.log('\n⏳ 等待 1 秒後繼續...');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  if (iterationCount >= maxIterations) {
    console.log(`\n⚠️  達到最大迭代次數 (${maxIterations})，強制停止`);
  }
  
  // 儲存結果
  const outputPath = input_file.replace(/\.md$/, '.json');
  writeFileSync(outputPath, fullResponse, 'utf-8');

  console.log(`\n✅ 生成完成，已儲存到: ${outputPath}`);
  console.log(`📊 最終輸出: ${fullResponse.length} 字元`);
  console.log(`📊 總輪次: ${iterationCount}`);
  
  // ✅ 驗證最終 JSON
  if (isJsonComplete(fullResponse)) {
    console.log('✅ 最終 JSON 驗證通過');
  } else {
    console.warn('⚠️  警告：最終 JSON 可能不完整');
  }
};

// 主函式：順序處理所有 md 文件
async function main() {
  const files = globSync('dist/graph.md');
  console.log(`\n📚 找到 ${files.length} 個檔案待處理\n`);
  const skipFiles = ['string.md', 'trees.md', 'sliding_window.md', 'monotonic_stack.md', 'grid.md'];
  for (let i = 0; i < files.length; i++) {
    const file = files[i]!;
    if (skipFiles.some(skip => file.endsWith(skip))) {
      console.log(`跳過示例檔案: ${file}`);
      continue;
    }
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🚀 [${i + 1}/${files.length}] 處理檔案: ${file}`);
    console.log(`${'='.repeat(60)}\n`);
    
    try {
      await runProcess(file);
    } catch (error) {
      console.error(`\n❌ 處理檔案失敗: ${file}`, error);
    }
    
    // 添加延迟避免 API 限流
    if (i < files.length - 1) {
      console.log('\n⏳ 等待 2 秒後處理下一個檔案...\n');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🎉 所有檔案處理完成！`);
  console.log(`${'='.repeat(60)}\n`);
}

// 执行主函数
main().catch(console.error);




