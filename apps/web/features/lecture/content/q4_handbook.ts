import type { TutorialData } from "@/types";
import {
  buildPatternSection,
  Q4_PATTERN_META,
  Q4_PATTERN_TOPIC_IDS,
} from "./q4_subtopics";
import q4HandbookPractice from "@/public/studyplan/q4_handbook.json";

const problemTableHeader =
  "| ID | Problem | Rating | Labels |\n| --- | --- | --- | --- |";

type PracticeProblem = {
  id: string | number;
  title: string;
  slug: string;
  src?: string;
  score?: number | null;
  subsection?: string | null;
};

type PracticeSection = {
  id: number;
  children?: PracticeSection[];
  problems?: PracticeProblem[];
};

const practiceSections = q4HandbookPractice.children as PracticeSection[];

function findPracticeSection(sectionId: number): PracticeSection | undefined {
  const stack = [...practiceSections];
  while (stack.length > 0) {
    const section = stack.pop()!;
    if (section.id === sectionId) {
      return section;
    }
    if (section.children) {
      stack.push(...section.children);
    }
  }
  return undefined;
}

function problemToTableRow(problem: PracticeProblem) {
  const href = problem.src ?? `https://leetcode.cn/problems/${problem.slug}/`;
  const rating =
    typeof problem.score === "number"
      ? Math.round(problem.score).toString()
      : "";
  return `| ${problem.id} | [${problem.title}](${href}) | ${rating} | ${problem.subsection ?? ""} |`;
}

function practiceRowsForSection(sectionId: number) {
  return findPracticeSection(sectionId)?.problems?.map(problemToTableRow) ?? [];
}

function stageTable(label: string, sectionId: number) {
  const rows = practiceRowsForSection(sectionId);
  if (rows.length === 0) return "";
  return `**${label}**\n${problemTableHeader}\n${rows.join("\n")}`;
}

function withTopicPractice(summary: string, topicId: number) {
  const intro =
    "## 搭配追蹤題單\n\n完成下面的追蹤題表，就能直接在本頁記錄每題的進度並貼上解法；題目分成必修、進階、挑戰三組，每列 Labels 會標出對應的細分模式，建議依序練習。";
  const tables = [
    stageTable("必修", topicId * 10 + 1),
    stageTable("進階", topicId * 10 + 2),
    stageTable("挑戰", topicId * 10 + 3),
  ].filter(Boolean);
  return `${summary}\n\n${intro}\n\n${tables.join("\n\n")}`;
}

export const q4Handbook = {
  id: 940,
  title: "LeetCode 競賽 Q4 手冊：第四題模式訓練",
  description:
    "把 Q4（週賽最後一題）常見的進階模式講義與精選追蹤題單整合成同一套章節：每個模式拆成多個子主題講義，再搭配可追蹤題表練習。",
  src: null,
  last_update: "2026-07-04T00:00:00.000Z",
  summary:
    "# LeetCode 競賽 Q4 手冊\n\n這份手冊接續《Q3 手冊》，專攻週賽的第四題——通常是整場最難、決定名次的一題。它把 Q4 常見的進階模式說明與可追蹤題單整合在同一套章節。每個模式章節先提供「模式總覽」，總覽中包含核心直覺、辨識訊號、模板、常見錯誤與帶 Labels 的題表；再拆成多個細分子頁逐一說明概念、直覺、作法與常見錯誤。\n\n## 使用方式\n\n1. 先讀「Q4 解題流程與模式識別」，並確認你已熟悉《Q3 手冊》的基礎模式。\n2. 選一個模式章節，先讀「模式總覽」並完成必修題。\n3. 遇到卡住的 Labels，再回到對應子主題補概念與模板。\n4. 每題完成後記錄進度；如果做錯，補一句「下次看到什麼訊號要想到這個模式」。\n\n## Q4 的核心判斷\n\nQ4 的難點很少是「多寫幾行」，而是：能不能把問題翻譯成正確的模型（哪種 DP 狀態、哪種圖、哪種資料結構），以及能不能把暴力轉移用一個對數級結構加速。它幾乎總是《Q3 手冊》某個模式的加深版——區間／狀壓／數位 DP、線段樹與樹狀陣列、狀態最短路、字串雜湊與 Trie、數論與容斥、樹上換根、折半枚舉、位元壓縮。",
  children: [
    {
      id: 94100,
      title: "1. Q4 解題流程與模式識別",
      summary:
        "## Q4 與 Q3 的差別\n\nQ3 通常是把暴力法的重複工作換成一個標準結構（視窗、前綴、二分答案、堆、掃描線）。Q4 則常常要求兩層洞察：先建對模型，再對模型上的轉移或查詢做加速。所以開題後除了問「暴力是什麼、重複在哪」，還要問「這個重複能不能用一個 O(log n) 的結構吃掉」。\n\n## 從限制反推模型\n\n讀完題先看數據範圍，它往往直接洩露模型：\n\n- n ≤ 20 左右、要枚舉集合或排列：狀壓 DP / 子集枚舉。\n- n 在 30～40：折半枚舉（meet in the middle）。\n- 要對 [0, N] 統計某數位性質的個數，N 很大：數位 DP。\n- 反覆區間查詢 + 修改：線段樹 / 樹狀陣列。\n- 網格或狀態求最短，且狀態要帶額外資訊：分層 / 狀態最短路。\n- 答案要對 1e9+7 取模且是方案數：組合計數 + 快速冪 / 逆元。\n- 對每個節點都要一個答案的樹上問題：換根 DP。\n- 出現 AND / OR / XOR / mask：位元技巧。\n\n## 三分鐘檢查清單\n\n1. 暴力是什麼？瓶頸的重複工作是哪一步？\n2. 這個重複查的是「前綴／窗口／值域最佳值」還是「連通性」？前者上樹或單調結構，後者用併查集。\n3. 狀態能不能一句話說清楚每一維的語意？\n4. 如果是計數題，選擇之間獨立嗎？要不要容斥去重？\n\n## 何時換方向\n\n如果 12～15 分鐘還說不出明確的狀態定義、check(x) 單調性、圖狀態或可加速的查詢型態，先停下重讀限制。Q4 最常見的失敗是把題目放進錯的模型，或先急著套資料結構卻沒寫對暴力轉移。",
    },
    {
      id: 94200,
      title: "2. Q4 核心模式與追蹤題單",
      summary:
        "以下每個模式章節的「模式總覽」都會先給直覺、訊號、模板與完整題表；再依需要進入子主題講義補強特定 Labels。這些模式多半是《Q3 手冊》對應章節的加深版，建議先確認自己已掌握 Q3 的基礎再往下練。",
      children: Q4_PATTERN_TOPIC_IDS.map((topicId) => {
        const meta = Q4_PATTERN_META[topicId];
        return buildPatternSection(
          topicId,
          meta.title,
          meta.description,
          meta.overview,
          withTopicPractice,
        );
      }),
    },
    {
      id: 94400,
      title: "3. 兩週 Q4 練習安排",
      summary:
        "## 第一週：進階狀態與資料結構\n\n- Day 1：區間 DP 與狀壓 DP 必修題，重點是把「最後一步」與「已選集合」說清楚。\n- Day 2：數位 DP 必修與進階題，重點是 tight 邊界與前導零。\n- Day 3：線段樹與樹狀陣列必修題，重點是離散化與逆序對框架。\n- Day 4：進階圖論必修題，重點是先認邊權型態再選演算法。\n- Day 5：字串進階必修題，重點是雜湊 O(1) 比較與 KMP next 陣列。\n- Day 6：混合計時三題，每題 40 分鐘。\n- Day 7：重做錯題，補模式訊號筆記。\n\n## 第二週：數學、樹上與高頻技巧\n\n- Day 8：數學與數論（快速冪、逆元、容斥）。\n- Day 9：樹上進階（換根 DP、直徑、LCA）。\n- Day 10：折半枚舉與分治。\n- Day 11：位元進階（子集枚舉、SOS、01-Trie）。\n- Day 12：DP 轉移優化（單調隊列、矩陣快速冪）。\n- Day 13：跨模式綜合題（線段樹 + 掃描線、圖 + DP）。\n- Day 14：挑戰題與最近失敗 Q4 復盤。\n\n每一天只要求一件事：做完題後能用一句話說出「這題屬於哪個模式、核心狀態或不變式是什麼、瓶頸靠什麼結構加速」。",
    },
  ],
} satisfies TutorialData.Root;
