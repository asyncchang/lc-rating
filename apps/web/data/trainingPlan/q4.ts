// Q4 十二週集訓（顯示於 /training/q4）。
//
// 選題方式：以 q4_handbook 的八個 pattern 為骨幹，DP 拆成四週（區間／狀壓／
// 數位／優化）、線段樹與樹狀陣列拆成兩週，其餘六個 pattern 各一週，湊滿十二
// 週。每週先放一到兩題無競賽評分的經典模板題，之後用 zerotrac 評分排成由易到
// 難；主題順序遵循前置依賴——DP 的狀態設計先於資料結構優化，圖／樹／字串／數
// 學排在最後，因為它們常常要把前面的結構當零件用。
//
// 適用對象：Q1–Q3 已經穩定（週賽評分約 2000 以上），每週能投入 8–10 小時，
// 目標是在週賽裡真的解出 Q4。做完 /training 的 Q3 集訓再進來。

import type {
  TrainingPlanCalibration,
  TrainingPlanMetric,
  TrainingPlanOverload,
  TrainingPlanPhase,
  TrainingPlanProgressStatus,
  TrainingPlanRhythmRow,
  TrainingPlanRule,
  TrainingPlanTrack,
  TrainingPlanWeek,
} from "./types";

const q4Profile = {
  audience:
    "適合 Q1–Q3 已經穩定、每週能投入 8–10 小時，想把週賽最後一題也拿下的人。",
  ratingBand: "2100 → 2500",
} as const;

// 集訓終點的依據：近年 Q4 的實際評分分佈，用本站 problemset 的 contests.json
// （problemIds 依序即 Q1–Q4）與 zerotrac 評分算出，只取週賽、排除雙週賽與無評
// 分的題目。難度會逐年漂移，重算方式見下方 method，數字過期時直接重跑並更新。
const q4Calibration: TrainingPlanCalibration = {
  updatedAt: "2026-09",
  method:
    "取 contests.json 內每場週賽的第四題，對照 problems.json 的 zerotrac 評分後統計。",
  headline: [
    "近 12 個月週賽 Q4：中位數 2230、上四分位 2410，2400 以上佔 25%。",
    "近一年的 Q4 明顯比前一年軟（兩年區間的中位數是 2419），但別把它當常態——2024、2025 的中位數都在 2460 以上。",
    "目標設在 2400，吃下近一年的上四分位；主線題因此排到 2410–2510。",
    "超載題再往上加 200–300，第三階段練到 2645–2770，涵蓋近一年 10% 的 2600 以上題。",
  ],
  byYearLabel: "Q4 中位數",
  byYear: [
    { year: "2022", median: 2148 },
    { year: "2023", median: 2387 },
    { year: "2024", median: 2464 },
    { year: "2025", median: 2500 },
    { year: "2026", median: 2198 },
  ],
  thresholdLabels: ["≥2400", "≥2600"],
  windows: [
    {
      label: "近 12 個月（週賽）",
      median: 2230,
      iqr: "2156–2410",
      overLow: "25%",
      overHigh: "10%",
    },
    {
      label: "近 24 個月（週賽）",
      median: 2419,
      iqr: "2206–2605",
      overLow: "53%",
      overHigh: "27%",
    },
  ],
};

// Q4 的超載題比 Q3 集訓更吃時間，所以規則也放寬：允許看題解的門檻從 25 分鐘
// 拉到 40 分鐘，重寫的期限從一週拉到兩週。不變的是「看完就關掉、從零重寫」。
const q4Overload: TrainingPlanOverload = {
  principle:
    "練習的天花板要高過目標 200–300 分，目標分數帶才會變成相對輕鬆的一檔。每週配一題超載題：第一階段 2420–2500，第二階段 2530–2630，第三階段 2645–2770。",
  rules: [
    "每週一題，排在非模擬週的週六，90 分鐘。",
    "40 分鐘沒有方向就看題解；目的是接觸技巧，不是獨立解出。",
    "看完題解就關掉，從零重寫一遍。寫不出來就再看一次。",
    "不列入一次過率，也不要求三次複習全過；只要求兩週內能重寫出來。",
    "連續兩週完全沒有頭緒，把該階段的超載題降 150 分。",
  ],
};

const q4Weeks: TrainingPlanWeek[] = [
  {
    week: 1,
    topic: "區間 DP：把「最後一步」定義清楚",
    refs: [
      { label: "講義", href: "/lecture/dynamic_programming" },
      { label: "題單", href: "/studyplan/dynamic_programming" },
      { label: "Q4 手冊", href: "/studyplan/q4_handbook" },
    ],
    problems: [
      {
        id: "516",
        title: "最長迴文子序列",
        slug: "longest-palindromic-subsequence",
        rating: null,
        role: "模板：dp[l][r] 的最小例，先把「按區間長度由小到大」的迴圈順序寫熟",
      },
      {
        id: "312",
        title: "戳氣球",
        slug: "burst-balloons",
        rating: null,
        role: "模板：枚舉「最後戳破哪一個」——區間 DP 的反推方式",
      },
      {
        id: "1547",
        title: "切棍子的最小成本",
        slug: "minimum-cost-to-cut-a-stick",
        rating: 2116,
        role: "端點離散化後仍是同一個骨架：枚舉分割點",
      },
      {
        id: "1039",
        title: "多邊形三角剖分的最低得分",
        slug: "minimum-score-triangulation-of-polygon",
        rating: 2130,
        role: "換一層幾何包裝，狀態與轉移不變",
      },
      {
        id: "1246",
        title: "刪除迴文子陣列",
        slug: "palindrome-removal",
        rating: 2203,
        role: "合併型：轉移要跳過整段，狀態語意得說得更精確",
      },
      {
        id: "1000",
        title: "合併石頭的最低成本",
        slug: "minimum-cost-to-merge-stones",
        rating: 2423,
        role: "多一維「合併後剩幾堆」，區間 DP 的完全體",
        bonus: true,
      },
    ],
    deliverable:
      "一份區間 DP 骨架（外層長度、內層左端點、最內層分割點），以及一句判準——答案由「先合併／先處理哪一段」決定就寫 dp[l][r]。",
  },
  {
    week: 2,
    topic: "狀壓 DP：把已選集合壓成一個整數",
    refs: [
      { label: "講義", href: "/lecture/dynamic_programming" },
      { label: "題單", href: "/studyplan/dynamic_programming" },
      { label: "Q4 手冊", href: "/studyplan/q4_handbook" },
    ],
    contest: 1,
    problems: [
      {
        id: "526",
        title: "優美的排列",
        slug: "beautiful-arrangement",
        rating: null,
        role: "模板：dp[mask]，用 popcount 代替「已經放了幾個」",
      },
      {
        id: "2850",
        title: "將石頭分散到網格圖的最少移動次數",
        slug: "minimum-moves-to-spread-stones-over-grid",
        rating: 2001,
        role: "暖身：把多餘的石頭與空位配對，化成排列型狀壓",
      },
      {
        id: "1799",
        title: "N 次操作後的最大分數和",
        slug: "maximize-score-after-n-operations",
        rating: 2073,
        role: "記憶化搜尋寫狀壓：兩兩配對時的枚舉順序",
      },
      {
        id: "1494",
        title: "並行課程 II",
        slug: "parallel-courses-ii",
        rating: 2082,
        role: "模板：枚舉 mask 的子集，sub = (sub - 1) & mask",
      },
      {
        id: "1349",
        title: "參加考試的最大學生數",
        slug: "maximum-students-taking-exam",
        rating: 2386,
        role: "逐行輪廓線：狀態是「上一行選了哪些位置」",
      },
      {
        id: "1994",
        title: "好子集的數目",
        slug: "the-number-of-good-subsets",
        rating: 2465,
        role: "把質因數壓成 mask 的子集狀壓計數，還要處理重複元素",
        bonus: true,
      },
    ],
    deliverable:
      "子集枚舉的兩行寫法（含複雜度 3^n 的推導），以及一句判準——n ≤ 20 且要枚舉集合／排列，就想狀壓。",
  },
  {
    week: 3,
    topic: "數位 DP：逐位決定，把上下界寫成參數",
    refs: [
      { label: "講義", href: "/lecture/dynamic_programming" },
      { label: "題單", href: "/studyplan/dynamic_programming" },
      { label: "Q4 手冊", href: "/studyplan/q4_handbook" },
    ],
    problems: [
      {
        id: "233",
        title: "數字 1 的個數",
        slug: "number-of-digit-one",
        rating: null,
        role: "模板：統計價值總和，先用最直觀的方式理解每一位的貢獻",
      },
      {
        id: "902",
        title: "最大為 N 的數字組合",
        slug: "numbers-at-most-n-given-digit-set",
        rating: 1990,
        role: "模板：受限數字集合的計數，把 isLimit 與 isNum 兩個旗標寫清楚",
      },
      {
        id: "2376",
        title: "統計特殊整數",
        slug: "count-special-integers",
        rating: 2120,
        role: "標準四參數寫法 f(i, mask, isLimit, isNum)，背下來",
      },
      {
        id: "1012",
        title: "至少有 1 位重複的數字",
        slug: "numbers-with-repeated-digits",
        rating: 2230,
        role: "補集轉換：正面難算就算反面",
      },
      {
        id: "2801",
        title: "統計範圍內的步進數字數目",
        slug: "count-stepping-numbers-in-range",
        rating: 2367,
        role: "上下界相減；邊界是字串時的大數處理",
      },
      {
        id: "3490",
        title: "統計美麗整數的數目",
        slug: "count-beautiful-numbers",
        rating: 2502,
        role: "狀態再帶上數位和與餘數，數位 DP 的完全體",
        bonus: true,
      },
    ],
    deliverable:
      "一份可以直接改的數位 DP 模板（記憶化只快取 isLimit、isNum 皆為 false 的狀態），以及前導零何時要特別處理的一行說明。",
  },
  {
    week: 4,
    topic: "DP 優化：把 O(n²) 的轉移壓到能過",
    refs: [
      { label: "講義", href: "/lecture/dynamic_programming" },
      { label: "題單", href: "/studyplan/dynamic_programming" },
      { label: "Q4 手冊", href: "/studyplan/q4_handbook" },
    ],
    contest: 2,
    problems: [
      {
        id: "1696",
        title: "跳躍遊戲 VI",
        slug: "jump-game-vi",
        rating: 1954,
        role: "模板：轉移查的是滑動視窗內的最大值 ⇒ 單調佇列",
      },
      {
        id: "1425",
        title: "帶限制的子序列和",
        slug: "constrained-subsequence-sum",
        rating: 2032,
        role: "單調佇列優化的正宗題：先寫對 O(n²) 再套結構",
      },
      {
        id: "1931",
        title: "用三種不同顏色為網格塗色",
        slug: "painting-a-grid-with-three-different-colors",
        rating: 2170,
        role: "先把狀態壓成合法的一列，再看出遞推可以用矩陣快速冪",
      },
      {
        id: "2407",
        title: "最長遞增子序列 II",
        slug: "longest-increasing-subsequence-ii",
        rating: 2280,
        role: "轉移查的是值域上的前綴最大值 ⇒ 樹狀陣列／線段樹（接第 5、6 週）",
      },
      {
        id: "3337",
        title: "字串轉換後的長度 II",
        slug: "total-characters-in-string-after-transformations-ii",
        rating: 2412,
        role: "模板：矩陣快速冪優化線性遞推，次數到 1e9 也不怕",
      },
      {
        id: "2463",
        title: "最小移動總距離",
        slug: "minimum-total-distance-traveled",
        rating: 2454,
        role: "決策單調性 ＋ 單調佇列，優化 DP 的完全體",
        bonus: true,
      },
    ],
    deliverable:
      "一句判準——先問「轉移裡我在查什麼歷史最佳值」：滑動視窗最大值用單調佇列，值域前綴最佳用樹狀陣列，固定線性遞推用矩陣快速冪。順序不能反，O(n²) 先寫對。",
  },
  {
    week: 5,
    topic: "樹狀陣列、離散化與逆序對",
    refs: [
      { label: "講義", href: "/lecture/data_structure" },
      { label: "題單", href: "/studyplan/data_structure" },
      { label: "Q4 手冊", href: "/studyplan/q4_handbook" },
    ],
    problems: [
      {
        id: "307",
        title: "區域和檢索 - 陣列可修改",
        slug: "range-sum-query-mutable",
        rating: null,
        role: "模板：樹狀陣列（lowbit、單點加、前綴查詢）",
      },
      {
        id: "315",
        title: "計算右側小於當前元素的個數",
        slug: "count-of-smaller-numbers-after-self",
        rating: null,
        role: "模板：離散化 ＋ 值域樹狀陣列，逆序對的標準流程",
      },
      {
        id: "1626",
        title: "無矛盾的最佳球隊",
        slug: "best-team-with-no-conflicts",
        rating: 2027,
        role: "排序定第一維，樹狀陣列查前綴最大值——樹狀陣列優化 DP",
      },
      {
        id: "2426",
        title: "滿足不等式的數對數目",
        slug: "number-of-pairs-satisfying-inequality",
        rating: 2030,
        role: "把兩個變數的條件移項成單一不等式後再掃描",
      },
      {
        id: "2179",
        title: "統計陣列中好三元組數目",
        slug: "count-good-triplets-in-an-array",
        rating: 2272,
        role: "兩次樹狀陣列：先算每個位置左邊比它小的，再算右邊比它大的",
      },
      {
        id: "2736",
        title: "最大和查詢",
        slug: "maximum-sum-queries",
        rating: 2533,
        role: "離線把查詢排序，樹狀陣列維護後綴最大值",
        bonus: true,
      },
    ],
    deliverable:
      "一份支援前綴和與前綴最大值的樹狀陣列模板，以及一句判準——二維偏序就排序掉一維、樹狀陣列處理另一維。",
  },
  {
    week: 6,
    topic: "線段樹：區間查詢、懶標記與線段樹上二分",
    refs: [
      { label: "講義", href: "/lecture/data_structure" },
      { label: "題單", href: "/studyplan/data_structure" },
      { label: "Q4 手冊", href: "/studyplan/q4_handbook" },
    ],
    contest: 3,
    problems: [
      {
        id: "732",
        title: "我的日程安排表 III",
        slug: "my-calendar-iii",
        rating: null,
        role: "模板：動態開點／離散化線段樹，先把 pushdown 寫對",
      },
      {
        id: "3479",
        title: "水果成籃 III",
        slug: "fruits-into-baskets-iii",
        rating: 2178,
        role: "模板：線段樹上二分——在樹上一路往左走，找第一個可行位置",
      },
      {
        id: "2940",
        title: "找到 Alice 和 Bob 可以相遇的建築",
        slug: "find-building-where-alice-and-bob-can-meet",
        rating: 2327,
        role: "離線 ＋ 線段樹查後綴最大值；再用單調棧寫一遍對照",
      },
      {
        id: "2589",
        title: "完成所有任務的最少時間",
        slug: "minimum-time-to-complete-all-tasks",
        rating: 2381,
        role: "懶標記 ＋ 貪心：從右往左填，區間求和與區間賦值一起用",
      },
      {
        id: "2569",
        title: "更新陣列後處理求和查詢",
        slug: "handling-sum-queries-after-update",
        rating: 2398,
        role: "模板：區間翻轉的懶標記（0/1 陣列上的 flip）",
      },
      {
        id: "2213",
        title: "由單個字元重複的最長子字串",
        slug: "longest-substring-of-one-repeating-character",
        rating: 2629,
        role: "節點要同時維護前綴、後綴與最長段，合併函式才是這題的重點",
        bonus: true,
      },
    ],
    deliverable:
      "一份可換 merge 函式的線段樹模板（build / update / query / pushdown 四塊分開），以及一句判準——單點改、區間查用樹狀陣列；區間改就上懶標記線段樹。",
  },
  {
    week: 7,
    topic: "位元進階：試填法、線性基與 0-1 字典樹",
    refs: [
      { label: "講義", href: "/lecture/bitwise_operations" },
      { label: "題單", href: "/studyplan/bitwise_operations" },
      { label: "Q4 手冊", href: "/studyplan/q4_handbook" },
    ],
    problems: [
      {
        id: "421",
        title: "陣列中兩個數的最大異或值",
        slug: "maximum-xor-of-two-numbers-in-an-array",
        rating: null,
        role: "模板：同一題用 0-1 字典樹與試填法各寫一遍，比較兩種思路",
      },
      {
        id: "3681",
        title: "子序列最大 XOR 值",
        slug: "maximum-xor-of-subsequences",
        rating: 2027,
        role: "模板：線性基的插入與查最大值",
      },
      {
        id: "3007",
        title: "價值和小於等於 K 的最大數字",
        slug: "maximum-number-that-sum-of-the-prices-is-less-than-or-equal-to-k",
        rating: 2258,
        role: "二分答案 ＋ 按位算貢獻，試填法的近親",
      },
      {
        id: "2935",
        title: "找出強數對的最大異或值 II",
        slug: "maximum-strong-pair-xor-ii",
        rating: 2349,
        role: "0-1 字典樹 ＋ 滑動視窗：字典樹要支援計數與撤銷",
      },
      {
        id: "1707",
        title: "與陣列中元素的最大異或值",
        slug: "maximum-xor-with-an-element-from-array",
        rating: 2359,
        role: "離線把查詢按上界排序，邊插入邊回答",
      },
      {
        id: "3287",
        title: "求出陣列中最大序列值",
        slug: "find-the-maximum-sequence-value-of-array",
        rating: 2545,
        role: "固定右端點時 OR 值只有 log 種，位元性質 ＋ 集合枚舉的完全體",
        bonus: true,
      },
    ],
    deliverable:
      "0-1 字典樹（含計數、可刪除）與線性基兩份模板，以及一句判準——最大化異或值先想從高位往低位試填。",
  },
  {
    week: 8,
    topic: "折半枚舉與分治",
    refs: [
      { label: "講義", href: "/lecture/trees" },
      { label: "題單", href: "/studyplan/trees" },
      { label: "Q4 手冊", href: "/studyplan/q4_handbook" },
    ],
    contest: 4,
    problems: [
      {
        id: "494",
        title: "目標和",
        slug: "target-sum",
        rating: null,
        role: "先用背包寫一遍，再用折半枚舉寫一遍，比較兩者的複雜度來源",
      },
      {
        id: "805",
        title: "陣列的均值分割",
        slug: "split-array-with-same-average",
        rating: null,
        role: "折半 ＋ 雜湊：把等式移項成「兩半各自能湊出什麼」",
      },
      {
        id: "1755",
        title: "最接近目標值的子序列和",
        slug: "closest-subsequence-sum",
        rating: 2364,
        role: "模板：折半後排序，再用雙指針或二分合併兩半",
      },
      {
        id: "956",
        title: "最高的廣告牌",
        slug: "tallest-billboard",
        rating: 2381,
        role: "差值 DP 與折半枚舉兩種解法都寫，弄清各自的適用邊界",
      },
      {
        id: "2035",
        title: "將陣列分成兩個陣列並最小化陣列和的差",
        slug: "partition-array-into-two-arrays-to-minimize-sum-difference",
        rating: 2490,
        role: "折半後按 popcount 分組，只在對應的組裡二分",
      },
      {
        id: "3267",
        title: "統計近似相等數對 II",
        slug: "count-almost-equal-pairs-ii",
        rating: 2545,
        role: "先分組再折半列舉數位交換，裁剪枚舉量才是這題的關鍵",
        bonus: true,
      },
    ],
    deliverable:
      "一句判準——n ≤ 40 且要枚舉子集，就把陣列切一半各自枚舉 2^(n/2) 再合併；合併方式（排序＋雙指針／雜湊／按 popcount 分組）由題目要的統計量決定。",
  },
  {
    week: 9,
    topic: "進階圖論：分層圖、Floyd、最小生成樹與基環樹",
    refs: [
      { label: "講義", href: "/lecture/graph" },
      { label: "題單", href: "/studyplan/graph" },
      { label: "Q4 手冊", href: "/studyplan/q4_handbook" },
    ],
    problems: [
      {
        id: "787",
        title: "K 站中轉內最便宜的航班",
        slug: "cheapest-flights-within-k-stops",
        rating: null,
        role: "模板：把「還能用幾次」加進狀態 ⇒ 分層圖／Bellman-Ford",
      },
      {
        id: "1584",
        title: "連線所有點的最小費用",
        slug: "min-cost-to-connect-all-points",
        rating: 1858,
        role: "模板：最小生成樹（Kruskal ＋ 併查集）",
      },
      {
        id: "2959",
        title: "關閉分部的可行集合數目",
        slug: "number-of-possible-sets-of-closing-branches",
        rating: 2077,
        role: "點數很小就先 Floyd 求全源最短路，再子集枚舉",
      },
      {
        id: "2876",
        title: "有向圖訪問計數",
        slug: "count-visited-nodes-in-a-directed-graph",
        rating: 2210,
        role: "內向基環樹：先拓撲剝掉樹枝，剩下的一定是環",
      },
      {
        id: "2127",
        title: "參加會議的最多員工數",
        slug: "maximum-employees-to-be-invited-to-a-meeting",
        rating: 2449,
        role: "基環樹的完全體：環長為 2 的情況要單獨算",
      },
      {
        id: "2977",
        title: "轉換字串的最小成本 II",
        slug: "minimum-cost-to-convert-string-ii",
        rating: 2696,
        role: "把字串切成段跑 Floyd，再用 DP 拼回去——兩層建模疊在一起",
        bonus: true,
      },
    ],
    deliverable:
      "一句判準——狀態要多帶一個「剩餘資源」就是分層圖；點數 ≤ 100 先想 Floyd；每個點恰好一條出邊就是內向基環樹，先拓撲再找環。",
  },
  {
    week: 10,
    topic: "樹上進階：LCA、DFS 時間戳與換根 DP",
    refs: [
      { label: "講義", href: "/lecture/trees" },
      { label: "題單", href: "/studyplan/trees" },
      { label: "Q4 手冊", href: "/studyplan/q4_handbook" },
    ],
    contest: 5,
    problems: [
      {
        id: "236",
        title: "二元樹的最近公共祖先",
        slug: "lowest-common-ancestor-of-a-binary-tree",
        rating: null,
        role: "模板：LCA 的遞迴寫法，先建立「往上合併」的直覺",
      },
      {
        id: "1483",
        title: "樹節點的第 K 個祖先",
        slug: "kth-ancestor-of-a-tree-node",
        rating: 2115,
        role: "模板：倍增求第 K 個祖先，也是倍增 LCA 的骨架",
      },
      {
        id: "834",
        title: "樹中距離之和",
        slug: "sum-of-distances-in-tree",
        rating: 2197,
        role: "模板：換根 DP——一次後序算子樹，一次前序把答案推給兒子",
      },
      {
        id: "2322",
        title: "從樹中刪除邊的最小分數",
        slug: "minimum-score-after-removals-on-a-tree",
        rating: 2392,
        role: "DFS 時間戳：用進出時間 O(1) 判斷祖孫關係",
      },
      {
        id: "2846",
        title: "邊權重均等查詢",
        slug: "minimum-edge-weight-equilibrium-queries-in-a-tree",
        rating: 2508,
        role: "樹上前綴和 ＋ LCA：路徑統計拆成 root→u、root→v 與 LCA 三段",
      },
      {
        id: "2836",
        title: "在傳球遊戲中最大化函式值",
        slug: "maximize-value-of-function-in-a-ball-passing-game",
        rating: 2769,
        role: "在倍增表上再做一次 DP，倍增的完全體",
        bonus: true,
      },
    ],
    deliverable:
      "一份倍增 LCA 模板（含深度與 up 表），以及一句判準——要對每個節點都算一次全樹的答案就用換根 DP；只關於子樹就一次後序解決。",
  },
  {
    week: 11,
    topic: "字串進階：KMP、Z 函數與字串雜湊",
    refs: [
      { label: "講義", href: "/lecture/string" },
      { label: "題單", href: "/studyplan/string" },
      { label: "Q4 手冊", href: "/studyplan/q4_handbook" },
    ],
    problems: [
      {
        id: "28",
        title: "找出字串中第一個匹配項的下標",
        slug: "find-the-index-of-the-first-occurrence-in-a-string",
        rating: null,
        role: "模板：手寫 KMP 的 next 陣列，不要用內建函式",
      },
      {
        id: "1392",
        title: "最長快樂字首",
        slug: "longest-happy-prefix",
        rating: 1876,
        role: "前綴函數的直接應用：最長的「既是前綴又是後綴」",
      },
      {
        id: "2223",
        title: "構造字串的總得分和",
        slug: "sum-of-scores-of-built-strings",
        rating: 2220,
        role: "模板：Z 函數（每個後綴與整串的最長公共前綴）",
      },
      {
        id: "3045",
        title: "統計前字尾下標對 II",
        slug: "count-prefix-and-suffix-pairs-ii",
        rating: 2328,
        role: "Z 函數與字典樹兩種解法，順便複習第 7 週的字典樹",
      },
      {
        id: "1044",
        title: "最長重複子串",
        slug: "longest-duplicate-substring",
        rating: 2429,
        role: "二分答案 ＋ 字串雜湊；雙模數與溢位一起處理掉",
      },
      {
        id: "1960",
        title: "兩個迴文子字串長度的最大乘積",
        slug: "maximum-product-of-the-length-of-two-palindromic-substrings",
        rating: 2691,
        role: "Manacher 算出每個位置的最長迴文，再做前後綴分解",
        bonus: true,
      },
    ],
    deliverable:
      "KMP、Z 函數、字串雜湊三份模板，以及一句判準——問「某個模式串出現在哪」用 KMP／Z；問「兩段子字串是否相同」用雜湊。",
  },
  {
    week: 12,
    topic: "數學與數論：組合計數、逆元與容斥",
    refs: [
      { label: "講義", href: "/lecture/math" },
      { label: "題單", href: "/studyplan/math" },
      { label: "Q4 手冊", href: "/studyplan/q4_handbook" },
    ],
    contest: 6,
    problems: [
      {
        id: "204",
        title: "計數質數",
        slug: "count-primes",
        rating: null,
        role: "模板：線性篩，順便把最小質因數也預處理出來",
      },
      {
        id: "2400",
        title: "恰好移動 k 步到達某一位置的方法數目",
        slug: "number-of-ways-to-reach-a-position-after-exactly-k-steps",
        rating: 1751,
        role: "模板：組合數 ＋ 費馬小定理求逆元，階乘表一次預處理",
      },
      {
        id: "1569",
        title: "將子陣列重新排序得到同一個二叉搜尋樹的方案數",
        slug: "number-of-ways-to-reorder-array-to-get-same-bst",
        rating: 2288,
        role: "多重組合數：把子樹大小當成「插空」的分配問題",
      },
      {
        id: "2513",
        title: "最小化兩個陣列中的最大值",
        slug: "minimize-the-maximum-of-two-arrays",
        rating: 2302,
        role: "二分答案 ＋ 容斥計算可用數量",
      },
      {
        id: "3272",
        title: "統計好整數的數目",
        slug: "find-the-count-of-good-integers",
        rating: 2382,
        role: "先枚舉迴文再算排列數，含前導零與重複字元的去重",
      },
      {
        id: "2954",
        title: "統計感冒序列的數目",
        slug: "count-the-number-of-infection-sequences",
        rating: 2645,
        role: "乘法原理 ＋ 組合數的層層相乘，計數題的完全體",
        bonus: true,
      },
    ],
    deliverable:
      "一份模數運算工具（階乘、逆元、組合數、快速冪），以及一句判準——答案要對 1e9+7 取模就是計數題，先問「能不能拆成獨立的乘法原理」，不行再想容斥。",
  },
];

const q4Phases: TrainingPlanPhase[] = [
  {
    id: 1,
    label: "第一階段",
    title: "進階 DP：狀態設計與轉移優化",
    goal: "看到 Q4 能先判斷「這是不是 DP」，而且能把狀態用一句話講清楚",
    weeks: [1, 2, 3, 4],
    checkpoint: {
      label: "檢核點一 · 第 4 週末",
      items: [
        {
          term: "測法",
          detail:
            "從區間／狀壓／數位／優化四類各抽 1 題沒做過的 2150–2300 分題，限時 150 分鐘。",
        },
        { term: "通過", detail: "解出 2 題以上，進入第二階段。" },
        {
          term: "沒通過",
          detail:
            "第 5 週改成複習週，把四類的狀態定義各重寫一次；只寫得出暴力版就代表卡在建模，回頭補 q4_handbook「進階動態規劃」的必修題。",
        },
      ],
    },
  },
  {
    id: 2,
    label: "第二階段",
    title: "可維護的結構：樹狀陣列、線段樹、位元與折半",
    goal: "把「帶修改的區間查詢」與「值域上的查詢」寫成肌肉記憶，不用臨場想模板",
    weeks: [5, 6, 7, 8],
    checkpoint: {
      label: "檢核點二 · 第 8 週末",
      items: [
        {
          term: "測法",
          detail:
            "完整模擬一場舊週賽 90 分鐘，目標 Q1–Q3 在 45 分鐘內全過，剩下 45 分鐘能對 Q4 寫出可行的做法（不一定 AC）。",
        },
        { term: "通過", detail: "進入第三階段。" },
        {
          term: "卡在模板寫不出來",
          detail:
            "把第 9 週換成模板週：樹狀陣列、懶標記線段樹、0-1 字典樹各默寫三遍到不查資料為止，其餘週次順延。",
        },
        {
          term: "卡在 Q1–Q3 花太久",
          detail:
            "問題不在 Q4。回 /training 的 Q3 集訓把一次過率最低的兩個主題各補 5 題，這條路線的新題暫停一週。",
        },
      ],
    },
  },
  {
    id: 3,
    label: "第三階段",
    title: "圖、樹、字串與數學",
    goal: "把上限推過近一年 Q4 的上四分位（約 2410）；這一階段的主線題會到 2450–2510",
    weeks: [9, 10, 11, 12],
    checkpoint: {
      label: "期末驗收 · 第 12 週末",
      items: [
        {
          term: "測法",
          detail: "連續兩場舊週賽模擬（可分兩天），每場 90 分鐘。",
        },
        {
          term: "達標",
          detail:
            "兩場都在 90 分鐘內拿下 Q1–Q3，其中至少一場 AK。以近一年的 Q4 分佈來看，這代表你能吃下中位數（約 2230）附近的 Q4。",
        },
        {
          term: "預期",
          detail:
            "十二週能穩定解出 2300 以下的 Q4；2600 以上的那 10% 仍會失手，那一檔通常要靠專題（AC 自動機、後綴陣列、網路流、可持久化結構）再補一季。",
        },
        {
          term: "接下來",
          detail:
            "達標就從 q4_handbook 的「挑戰」欄挑題，改成每週兩場模擬；沒達標就把十二週裡一次過率最低的三個主題各再做 5 題，用同一套節奏跑一個月。",
        },
      ],
    },
  },
];

const q4Rhythm: TrainingPlanRhythmRow[] = [
  {
    when: "週一",
    minutes: "60 分",
    what: "讀該週講義小節 30 分（Q4 手冊對應章節的「核心直覺／讀題訊號／常見錯誤」）＋ 模板題 1 題 30 分",
  },
  {
    when: "週二–週五",
    minutes: "75 分 ×4",
    what: "主線題各 1 題：想 25 分 → 寫 40 分 → 記四行筆記 10 分。65 分鐘無解就看題解到想通的那一句為止，然後自己寫完",
  },
  {
    when: "週六（雙週）",
    minutes: "150 分",
    what: "限時模擬舊週賽 Q1–Q4 共 90 分，賽後檢討 60 分（重點是 Q4 當下為什麼沒認出來）。非模擬週改做 90 分鐘超載題",
  },
  {
    when: "週日",
    minutes: "60 分",
    what: "重寫 2 題標為「需要複習」的舊題（不看筆記）＋ 更新筆記與下週選題",
  },
];

const q4Rules: TrainingPlanRule[] = [
  {
    title: "一週有 3 題卡超過 90 分鐘",
    detail:
      "難度超前的訊號。回到同主題題單裡低 200–250 分的題各補 2 題，本週主線延後。連兩週如此，就先回 Q3 集訓補基本盤。",
  },
  {
    title: "五題都在 40 分鐘內解完",
    detail:
      "難度落後的訊號。把該週的超載題當主線做（不看題解、限時 75 分鐘），並從 q4_handbook 對應主題的「挑戰」欄再抓 2 題。",
  },
  {
    title: "出差、生病、加班週",
    detail: "只做週日那 60 分鐘複習，新題全部延後一週；複習不跳過。",
  },
  {
    title: "模擬時 Q4 想不出來",
    detail:
      "賽後先分類：是「沒認出模式」還是「認出來但寫不完」。前者回去讀該主題的讀題訊號，後者就把模板再默寫三遍——Q4 的實作量夠大，模板不熟就一定寫不完。",
  },
  {
    title: "看題解的門檻比 Q3 集訓寬",
    detail:
      "Q4 的題目本來就不是每題都該獨立解出。65 分鐘無解就看題解，但只看到想通的那一句為止，剩下自己寫完，並把這題標成「需要複習」。",
  },
  {
    title: "模板要能默寫",
    detail:
      "樹狀陣列、懶標記線段樹、0-1 字典樹、倍增 LCA、KMP、組合數與逆元——這六份每個月默寫一次。臨場現推的時間，Q4 給不起。",
  },
];

const q4Metrics: TrainingPlanMetric[] = [
  {
    figure: "≥ 40%",
    title: "2300 分帶一次過率",
    detail:
      "只算主線題、不看題解就通過的比例，每月底統計一次。低於 30% 表示新題吃太快，改成新題 3 題、複習 4 題。",
  },
  {
    figure: "≤ 15 分",
    title: "確定方向的時間",
    detail:
      "從讀完題到知道用哪個 pattern。Q4 的瓶頸在建模，超過 15 分鐘還沒方向，通常是這個主題的讀題訊號沒記牢。",
  },
  {
    figure: "≤ 35 分",
    title: "模板題的實作時間",
    detail:
      "從想清楚到通過的時間。Q4 一場只剩 40–50 分鐘可用，模板寫太慢就算想對也交不出來。",
  },
];

const q4NoteTemplate = [
  "訊號：題目裡哪句話讓我該想到這個做法",
  "狀態／不變式：dp 或資料結構維護的東西，一句話",
  "關鍵一步：整題最不顯然的那一下",
  "可複用模板：函式簽名或 3 行骨架",
].join("\n");

const q4ProgressConvention: TrainingPlanProgressStatus[] = [
  { status: "進行中", meaning: "本週要做的 5 題" },
  { status: "需要複習", meaning: "看過題解、或超過 65 分鐘才寫出來的" },
  { status: "已解題", meaning: "獨立解出，且三次複習都一次過" },
  { status: "暫時跳過", meaning: "評分高於本階段上限，留給第三個月之後" },
];

export const trainingPlanQ4: TrainingPlanTrack = {
  id: "q4",
  navLabel: "Q4 集訓",
  href: "/training/q4",
  title: "十二週集訓：拿下 Q4",
  lead: "以 Q4 手冊的八個 pattern 為骨幹，每週一個主題，題目取自站內題單並依評分排成由易到難。",
  prerequisite:
    "先修：Q3 集訓十二週已經走完，或週賽能穩定在 90 分鐘內拿下 Q1–Q3。基本盤不穩就先回上一條路線。",
  profile: q4Profile,
  calibration: q4Calibration,
  overload: q4Overload,
  weeks: q4Weeks,
  phases: q4Phases,
  rhythm: q4Rhythm,
  reviewSchedule:
    "看過題解、或寫超過 65 分鐘的題，在第 2、7、21 天各重寫一次；三次都一次過，才把狀態從「需要複習」改成「已解題」。",
  rules: q4Rules,
  metrics: q4Metrics,
  noteTemplate: q4NoteTemplate,
  progressConvention: q4ProgressConvention,
  totalNote: (total) =>
    `三個月共 ${total} 題。Q4 一題的實作量抵 Q3 兩題，所以題數更不是指標，上面三個數字才是。`,
};
