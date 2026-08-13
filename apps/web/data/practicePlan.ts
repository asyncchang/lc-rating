// 十二週競賽訓練課表，顯示於 /plan。
//
// 選題方式：以 q3_handbook 的 pattern 分組為骨幹，用 zerotrac 評分把每週排成
// 由易到難；handbook 必修題偏難的主題（例如堆積貪心的必修是 1962 分），另從
// 對應主題題單補入門題。主題順序遵循 lectureLearningPath 的前置依賴，而非難度
// 排序——線性掃描是後面所有主題的地基，DP 排在堆與貪心之後，圖論排在 DP 之後。
//
// 適用對象：週賽 Q1–Q2 穩定、Q3 偶爾（約 1400–1700），每週 4–6 小時，
// 目標是穩定 AK Q3。

export interface PracticePlanProblem {
  /** LeetCode 題號，同時是進度與筆記的 key。 */
  id: string;
  title: string;
  slug: string;
  /** zerotrac 評分；早期經典題無競賽評分，為 null。 */
  rating: number | null;
  /** 這題在課表裡的角色：練什麼、為什麼排在這個位置。 */
  role: string;
  /** 選做的加碼題，主線做完仍有餘力再碰。 */
  bonus?: boolean;
}

export interface PracticePlanWeek {
  week: number;
  topic: string;
  /** 對應的站內講義與題單。 */
  refs: { label: string; href: string }[];
  problems: PracticePlanProblem[];
  /** 本週要留下的可複用產物——課表的產出是判準與模板，不是題數。 */
  deliverable: string;
  /** 這週週六排第幾場限時模擬；沒排就不填。 */
  contest?: number;
}

export interface PracticePlanCheckpoint {
  label: string;
  items: { term: string; detail: string }[];
}

export interface PracticePlanPhase {
  id: number;
  label: string;
  title: string;
  goal: string;
  weeks: number[];
  checkpoint: PracticePlanCheckpoint;
}

export const practicePlanProfile = {
  audience:
    "適合週賽 Q1–Q2 穩定、Q3 偶爾，每週能投入 4–6 小時，目標是穩定 AK Q3 的人。",
  ratingBand: "1400 → 1900",
} as const;

export const practicePlanWeeks: PracticePlanWeek[] = [
  {
    week: 1,
    topic: "滑動視窗：不定長、恰好型與計數",
    refs: [
      { label: "講義", href: "/lecture/sliding_window" },
      { label: "題單", href: "/studyplan/sliding_window" },
    ],
    problems: [
      {
        id: "209",
        title: "長度最小的子陣列",
        slug: "minimum-size-subarray-sum",
        rating: null,
        role: "模板：越長越合法／求最短",
      },
      {
        id: "2958",
        title: "最多 K 個重複元素的最長子陣列",
        slug: "length-of-longest-subarray-with-at-most-k-frequency",
        rating: 1535,
        role: "越短越合法／求最長，用計數表維護視窗",
      },
      {
        id: "930",
        title: "和相同的二元子陣列",
        slug: "binary-subarrays-with-sum",
        rating: 1592,
        role: "恰好型：拆成兩次不定長相減",
      },
      {
        id: "1358",
        title: "包含所有三種字元的子字串數目",
        slug: "number-of-substrings-containing-all-three-characters",
        rating: 1646,
        role: "計數型：合法時右端點的貢獻是 left + 1",
      },
      {
        id: "1004",
        title: "最大連續 1 的個數 III",
        slug: "max-consecutive-ones-iii",
        rating: 1656,
        role: "把「操作次數」變成視窗內的可容忍量",
      },
      {
        id: "2962",
        title: "統計最大元素出現至少 K 次的子陣列",
        slug: "count-subarrays-where-max-element-appears-at-least-k-times",
        rating: 1701,
        role: "越長越合法的計數版",
        bonus: true,
      },
    ],
    deliverable:
      "一份不定長滑窗模板（收縮條件寫成獨立函式），以及「求最長／求最短／求個數」三種收縮寫法的差異各一行筆記。",
  },
  {
    week: 2,
    topic: "前綴和與雜湊表 ＋ 差分",
    refs: [
      { label: "講義", href: "/lecture/data_structure" },
      { label: "題單", href: "/studyplan/data_structure" },
    ],
    contest: 1,
    problems: [
      {
        id: "560",
        title: "和為 K 的子陣列",
        slug: "subarray-sum-equals-k",
        rating: null,
        role: "模板：邊掃邊把前綴和丟進雜湊表",
      },
      {
        id: "1094",
        title: "拼車",
        slug: "car-pooling",
        rating: 1441,
        role: "模板：差分陣列（區間加、末尾求前綴和）",
      },
      {
        id: "3355",
        title: "零陣列變換 I",
        slug: "zero-array-transformation-i",
        rating: 1591,
        role: "差分的判定用法",
      },
      {
        id: "1248",
        title: "統計「優美子陣列」",
        slug: "count-number-of-nice-subarrays",
        rating: 1624,
        role: "把條件轉成 0/1 後前綴和；與第 1 週的恰好型對照",
      },
      {
        id: "974",
        title: "和可被 K 整除的子陣列",
        slug: "subarray-sums-divisible-by-k",
        rating: 1676,
        role: "同餘分組；負數取模的陷阱",
      },
      {
        id: "3026",
        title: "最大好子陣列和",
        slug: "maximum-good-subarray-sum",
        rating: 1817,
        role: "雜湊表存「最小前綴和」而非出現次數",
        bonus: true,
      },
    ],
    deliverable:
      "一句判準——子陣列和且元素可正可負 ⇒ 前綴和＋雜湊表；元素全為正 ⇒ 滑動視窗。這句話是 Q3 選錯方向的最大分水嶺。",
  },
  {
    week: 3,
    topic: "二分答案：把最佳化變成判定",
    refs: [
      { label: "講義", href: "/lecture/binary_search" },
      { label: "題單", href: "/studyplan/binary_search" },
    ],
    problems: [
      {
        id: "1283",
        title: "使結果不超過閾值的最小除數",
        slug: "find-the-smallest-divisor-given-a-threshold",
        rating: 1542,
        role: "模板：把 check(x) 寫成獨立函式",
      },
      {
        id: "2187",
        title: "完成旅途的最少時間",
        slug: "minimum-time-to-complete-trips",
        rating: 1641,
        role: "上界怎麼估；long long 防溢位",
      },
      {
        id: "2226",
        title: "每個小孩最多能分到多少糖果",
        slug: "maximum-candies-allocated-to-k-children",
        rating: 1646,
        role: "求最大：可行性的單調方向相反",
      },
      {
        id: "1011",
        title: "在 D 天內送達包裹的能力",
        slug: "capacity-to-ship-packages-within-d-days",
        rating: 1725,
        role: "check 內含貪心模擬",
      },
      {
        id: "875",
        title: "愛吃香蕉的珂珂",
        slug: "koko-eating-bananas",
        rating: 1766,
        role: "上取整寫法 (a + b - 1) / b",
      },
      {
        id: "1552",
        title: "兩球之間的磁力",
        slug: "magnetic-force-between-two-balls",
        rating: 1920,
        role: "最大化最小值 ＋ 先排序",
        bonus: true,
      },
    ],
    deliverable:
      "一個半開區間 [left, right) 的二分模板，以及「看到最小的最大值／最大的最小值／能否在 K 次內完成，就先想二分答案」這條反射。",
  },
  {
    week: 4,
    topic: "單調棧與單調佇列",
    refs: [
      { label: "講義", href: "/lecture/monotonic_stack" },
      { label: "題單", href: "/studyplan/monotonic_stack" },
    ],
    contest: 2,
    problems: [
      {
        id: "739",
        title: "每日溫度",
        slug: "daily-temperatures",
        rating: null,
        role: "模板：下一個更大元素",
      },
      {
        id: "239",
        title: "滑動視窗最大值",
        slug: "sliding-window-maximum",
        rating: null,
        role: "模板：單調佇列（與第 1 週的視窗合流）",
      },
      {
        id: "2104",
        title: "子陣列範圍和",
        slug: "sum-of-subarray-ranges",
        rating: 1504,
        role: "貢獻法的入口：每個元素當幾次最大／最小值",
      },
      {
        id: "1438",
        title: "絕對差不超過限制的最長連續子陣列",
        slug: "longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit",
        rating: 1672,
        role: "視窗內同時維護最大與最小值",
      },
      {
        id: "901",
        title: "股票價格跨度",
        slug: "online-stock-span",
        rating: 1709,
        role: "單調棧的線上（streaming）版",
      },
      {
        id: "907",
        title: "子陣列的最小值之和",
        slug: "sum-of-subarray-minimums",
        rating: 1976,
        role: "貢獻法 ＋ 相等元素的歸屬（去重）",
        bonus: true,
      },
    ],
    deliverable:
      "「求每個元素左右第一個更大／更小」的模板，以及一句判準——看到子陣列的最大值或最小值被反覆用到，就想單調棧貢獻法。",
  },
  {
    week: 5,
    topic: "堆與貪心：邊掃邊維護候選集",
    refs: [
      { label: "講義", href: "/lecture/data_structure" },
      { label: "題單", href: "/studyplan/data_structure" },
    ],
    problems: [
      {
        id: "2530",
        title: "執行 K 次操作後的最大分數",
        slug: "maximal-score-after-applying-k-operations",
        rating: 1386,
        role: "暖身：大根堆的基本用法",
      },
      {
        id: "2208",
        title: "將陣列和減半的最少操作次數",
        slug: "minimum-operations-to-halve-array-sum",
        rating: 1550,
        role: "每步都取當前最大：貪心的正確性怎麼說服自己",
      },
      {
        id: "1942",
        title: "最小未被佔據椅子的編號",
        slug: "the-number-of-the-smallest-unoccupied-chair",
        rating: 1695,
        role: "雙堆：可用資源堆 ＋ 到期事件堆",
      },
      {
        id: "2462",
        title: "僱傭 K 位工人的總代價",
        slug: "total-cost-to-hire-k-workers",
        rating: 1764,
        role: "雙端候選堆",
      },
      {
        id: "1834",
        title: "單執行緒 CPU",
        slug: "single-threaded-cpu",
        rating: 1798,
        role: "按時間推進的事件模擬（Q3 高頻骨架）",
      },
      {
        id: "1642",
        title: "可以到達的最遠建築",
        slug: "furthest-building-you-can-reach",
        rating: 1962,
        role: "反悔堆——先隨便選，之後用堆換回來",
        bonus: true,
      },
    ],
    deliverable:
      "「事件按時間排序 ＋ 一個堆維護當前可用資源」的骨架程式碼。這個骨架每個月的週賽都會出現一次。",
  },
  {
    week: 6,
    topic: "區間與掃描線",
    refs: [
      { label: "講義", href: "/lecture/greedy" },
      { label: "題單", href: "/studyplan/greedy" },
    ],
    contest: 3,
    problems: [
      {
        id: "56",
        title: "合併區間",
        slug: "merge-intervals",
        rating: null,
        role: "模板：按左端點排序後合併",
      },
      {
        id: "1288",
        title: "刪除被覆蓋區間",
        slug: "remove-covered-intervals",
        rating: 1375,
        role: "排序時的第二關鍵字方向",
      },
      {
        id: "3169",
        title: "無需開會的工作日",
        slug: "count-days-without-meetings",
        rating: 1483,
        role: "合併後求空隙",
      },
      {
        id: "2406",
        title: "將區間分為最少組數",
        slug: "divide-intervals-into-minimum-number-of-groups",
        rating: 1713,
        role: "兩種解法都要寫：最小堆 ＋ 差分（答案＝最大重疊數）",
      },
      {
        id: "2054",
        title: "兩個最好的不重疊活動",
        slug: "two-best-non-overlapping-events",
        rating: 1883,
        role: "排序 ＋ 後綴最大值 ＋ 二分",
      },
      {
        id: "1943",
        title: "描述繪畫結果",
        slug: "describe-the-painting",
        rating: 1969,
        role: "掃描線的完整形式（事件點 ＋ 有序表）",
        bonus: true,
      },
    ],
    deliverable:
      "一句判準——區間題先問「按左端點還是右端點排序？」；以及「最大重疊數＝差分陣列的最大值」這個等價轉換。",
  },
  {
    week: 7,
    topic: "DP 入門與狀態機 DP",
    refs: [
      { label: "講義", href: "/lecture/dynamic_programming" },
      { label: "題單", href: "/studyplan/dynamic_programming" },
    ],
    problems: [
      {
        id: "198",
        title: "打家劫舍",
        slug: "house-robber",
        rating: null,
        role: "模板：選或不選（15 分鐘）",
      },
      {
        id: "53",
        title: "最大子陣列和",
        slug: "maximum-subarray",
        rating: null,
        role: "模板：以 i 結尾的最優（15 分鐘）",
      },
      {
        id: "3259",
        title: "超級飲料的最大強化能量",
        slug: "maximum-energy-boost-from-two-drinks",
        rating: 1484,
        role: "兩個狀態互相轉移：狀態機的最小例",
      },
      {
        id: "2320",
        title: "統計放置房子的方式數",
        slug: "count-number-of-ways-to-place-houses",
        rating: 1608,
        role: "計數型 DP 的初始化 dp[0] = 1",
      },
      {
        id: "2140",
        title: "解決智力問題",
        slug: "solving-questions-with-brainpower",
        rating: 1709,
        role: "從後往前遞推；跳躍式轉移",
      },
      {
        id: "1567",
        title: "乘積為正數的最長子陣列長度",
        slug: "maximum-length-of-subarray-with-positive-product",
        rating: 1710,
        role: "同時維護兩組狀態（正／負）",
      },
      {
        id: "1186",
        title: "刪除一次得到子陣列最大和",
        slug: "maximum-subarray-sum-with-one-deletion",
        rating: 1799,
        role: "狀態多一維「已用掉刪除機會」",
        bonus: true,
      },
    ],
    deliverable:
      "每題都寫下三行狀態定義——dp 的語意、轉移、邊界。DP 的能力全在這三行，程式碼只是抄寫。",
  },
  {
    week: 8,
    topic: "背包與劃分型 DP",
    refs: [
      { label: "講義", href: "/lecture/dynamic_programming" },
      { label: "題單", href: "/studyplan/dynamic_programming" },
    ],
    contest: 4,
    problems: [
      {
        id: "416",
        title: "分割等和子集",
        slug: "partition-equal-subset-sum",
        rating: null,
        role: "模板：0-1 背包（判定）",
      },
      {
        id: "322",
        title: "零錢兌換",
        slug: "coin-change",
        rating: null,
        role: "模板：完全背包（最少個數）",
      },
      {
        id: "494",
        title: "目標和",
        slug: "target-sum",
        rating: null,
        role: "把「加減號」轉成子集和：等價轉換",
      },
      {
        id: "2915",
        title: "和為目標值的最長子序列的長度",
        slug: "length-of-the-longest-subsequence-that-sums-to-target",
        rating: 1659,
        role: "背包求最大長度；不可達用極小值",
      },
      {
        id: "2707",
        title: "字串中的額外字元",
        slug: "extra-characters-in-a-string",
        rating: 1736,
        role: "模板：劃分型 DP（枚舉最後一段）",
      },
      {
        id: "2369",
        title: "檢查陣列是否存在有效劃分",
        slug: "check-if-there-is-a-valid-partition-for-the-array",
        rating: 1780,
        role: "劃分的判定版；最後一段長度有限",
      },
      {
        id: "1043",
        title: "分隔陣列以得到最大和",
        slug: "partition-array-for-maximum-sum",
        rating: 1916,
        role: "劃分 ＋ 段內資訊（最大值）同時維護",
        bonus: true,
      },
    ],
    deliverable:
      "一句判準——看到「把陣列／字串切成若干段」就寫 dp[i] = 最佳(dp[j] + cost(j..i))，先寫 O(n²)，能過就不優化。",
  },
  {
    week: 9,
    topic: "網格圖 BFS、0-1 BFS 與 Dijkstra",
    refs: [
      { label: "講義", href: "/lecture/grid" },
      { label: "講義", href: "/lecture/graph" },
      { label: "題單", href: "/studyplan/grid" },
    ],
    problems: [
      {
        id: "3286",
        title: "穿越網格圖的安全路徑",
        slug: "find-a-safe-walk-through-a-grid",
        rating: 1608,
        role: "0-1 BFS：邊權只有 0 和 1 時用雙端佇列",
      },
      {
        id: "1926",
        title: "迷宮中離入口最近的出口",
        slug: "nearest-exit-from-entrance-in-maze",
        rating: 1638,
        role: "模板：格點 BFS ＋ 就地標記已訪問",
      },
      {
        id: "1091",
        title: "二進位制矩陣中的最短路徑",
        slug: "shortest-path-in-binary-matrix",
        rating: 1658,
        role: "八方向；BFS 的層數就是答案",
      },
      {
        id: "1162",
        title: "地圖分析",
        slug: "as-far-from-land-as-possible",
        rating: 1666,
        role: "多源 BFS：所有源點一起入隊",
      },
      {
        id: "3341",
        title: "到達最後一個房間的最少時間 I",
        slug: "find-minimum-time-to-reach-last-room-i",
        rating: 1721,
        role: "模板：Dijkstra（優先佇列 ＋ 已定值跳過）",
      },
      {
        id: "1631",
        title: "最小體力消耗路徑",
        slug: "path-with-minimum-effort",
        rating: 1948,
        role: "三種解法（二分＋BFS／Dijkstra／並查集）各寫一遍",
        bonus: true,
      },
    ],
    deliverable:
      "一句判準——邊權全為 1 ⇒ BFS；只有 0 和 1 ⇒ 雙端佇列 BFS；任意非負 ⇒ Dijkstra。選錯就是 TLE 或 WA。",
  },
  {
    week: 10,
    topic: "樹上 DFS、樹形 DP 與拓撲排序",
    refs: [
      { label: "講義", href: "/lecture/trees" },
      { label: "講義", href: "/lecture/graph" },
      { label: "題單", href: "/studyplan/trees" },
    ],
    contest: 5,
    problems: [
      {
        id: "1026",
        title: "節點與其祖先之間的最大差值",
        slug: "maximum-difference-between-node-and-ancestor",
        rating: 1446,
        role: "自頂向下：把資訊當參數往下傳",
      },
      {
        id: "3249",
        title: "統計好節點的數目",
        slug: "count-the-number-of-good-nodes",
        rating: 1566,
        role: "自底向上：回傳子樹大小",
      },
      {
        id: "2115",
        title: "從給定原材料中找到所有可以做出的菜",
        slug: "find-all-possible-recipes-from-given-supplies",
        rating: 1679,
        role: "模板：拓撲排序（入度歸零入隊）",
      },
      {
        id: "1443",
        title: "收集樹上所有蘋果的最少時間",
        slug: "minimum-time-to-collect-all-apples-in-a-tree",
        rating: 1683,
        role: "一般樹（鄰接表 ＋ parent 去重）；有遞有歸",
      },
      {
        id: "1372",
        title: "二叉樹中的最長交錯路徑",
        slug: "longest-zigzag-path-in-a-binary-tree",
        rating: 1713,
        role: "樹形 DP：回傳兩種方向的長度",
      },
      {
        id: "1519",
        title: "子樹中標籤相同的節點數",
        slug: "number-of-nodes-in-the-sub-tree-with-the-same-label",
        rating: 1809,
        role: "子樹資訊合併（回傳計數陣列）",
        bonus: true,
      },
    ],
    deliverable:
      "一句判準——問題只關於子樹 ⇒ 後序（自底向上回傳）；只關於從根到當前的路徑 ⇒ 前序（參數往下傳）；兩者都要 ⇒ 有遞有歸。",
  },
  {
    week: 11,
    topic: "位元技巧與貢獻法",
    refs: [
      { label: "講義", href: "/lecture/bitwise_operations" },
      { label: "題單", href: "/studyplan/bitwise_operations" },
    ],
    problems: [
      {
        id: "2433",
        title: "找出字首異或的原始陣列",
        slug: "find-the-original-array-of-prefix-xor",
        rating: 1367,
        role: "暖身：a ^ b ^ b == a",
      },
      {
        id: "1442",
        title: "形成兩個異或相等陣列的三元組數目",
        slug: "count-triplets-that-can-form-two-arrays-of-equal-xor",
        rating: 1525,
        role: "異或前綴和 ＋ 雜湊表（接回第 2 週）",
      },
      {
        id: "2044",
        title: "統計按位或能得到最大值的子集數目",
        slug: "count-number-of-maximum-bitwise-or-subsets",
        rating: 1568,
        role: "子集枚舉 1 << n；n ≤ 20 的訊號",
      },
      {
        id: "2425",
        title: "所有數對的異或和",
        slug: "bitwise-xor-of-all-pairings",
        rating: 1622,
        role: "拆位：每一位獨立算貢獻",
      },
      {
        id: "2275",
        title: "按位與結果大於零的最長組合",
        slug: "largest-combination-with-bitwise-and-greater-than-zero",
        rating: 1642,
        role: "拆位後變成「哪一位的 1 最多」",
      },
      {
        id: "3097",
        title: "或值至少為 K 的最短子陣列 II",
        slug: "shortest-subarray-with-or-at-least-k-ii",
        rating: 1891,
        role: "滑窗 ＋ 按位計數（可撤銷的 OR）",
        bonus: true,
      },
    ],
    deliverable:
      "一句判準——與／或／異或的題目，先問「每一位能不能獨立處理？」，八成的位元運算 Q3 就是拆位 ＋ 前面學過的技巧。",
  },
  {
    week: 12,
    topic: "並查集與資料結構設計",
    refs: [
      { label: "講義", href: "/lecture/data_structure" },
      { label: "題單", href: "/studyplan/q3_handbook" },
    ],
    contest: 6,
    problems: [
      {
        id: "2349",
        title: "設計數字容器系統",
        slug: "design-a-number-container-system",
        rating: 1540,
        role: "雜湊表 ＋ 有序集合的組合設計",
      },
      {
        id: "981",
        title: "基於時間的鍵值儲存",
        slug: "time-based-key-value-store",
        rating: 1575,
        role: "設計題裡的二分查找",
      },
      {
        id: "990",
        title: "等式方程的可滿足性",
        slug: "satisfiability-of-equality-equations",
        rating: 1638,
        role: "模板：並查集（路徑壓縮）",
      },
      {
        id: "3532",
        title: "針對圖的路徑存在性查詢 I",
        slug: "path-existence-queries-in-a-graph-i",
        rating: 1659,
        role: "連通性查詢；何時該用並查集而非 BFS",
      },
      {
        id: "1202",
        title: "交換字串中的元素",
        slug: "smallest-string-with-swaps",
        rating: 1855,
        role: "並查集分組後各組內排序",
      },
      {
        id: "2353",
        title: "設計食物評分系統",
        slug: "design-a-food-rating-system",
        rating: 1782,
        role: "懶刪除堆 vs 有序集合的取捨",
        bonus: true,
      },
    ],
    deliverable:
      "並查集模板（含 size 或 rank），以及設計題的固定流程：先列出每個操作的目標複雜度，再回頭選容器。",
  },
];

export const practicePlanPhases: PracticePlanPhase[] = [
  {
    id: 1,
    label: "第一階段",
    title: "線性掃描與維護",
    goal: "Q1＋Q2 在 25 分鐘內收掉；看到 Q3 能認出滑窗／前綴和／二分答案",
    weeks: [1, 2, 3, 4],
    checkpoint: {
      label: "檢核點一 · 第 4 週末",
      items: [
        {
          term: "測法",
          detail:
            "從滑窗／前綴和／二分答案／單調棧四類各抽 1 題沒做過的 1600–1750 分題，限時 60 分鐘。",
        },
        { term: "通過", detail: "解出 3 題以上，進入第二階段。" },
        {
          term: "沒通過",
          detail:
            "第 5 週改成複習週，把四個主題的模板各重寫一次，主線題延後一週。不要帶著沒固化的地基進 DP。",
        },
      ],
    },
  },
  {
    id: 2,
    label: "第二階段",
    title: "貪心結構與動態規劃",
    goal: "Q3 一次過率過半；DP 能自己定義狀態，而不是回想相似題",
    weeks: [5, 6, 7, 8],
    checkpoint: {
      label: "檢核點二 · 第 8 週末",
      items: [
        {
          term: "測法",
          detail: "完整模擬一場舊週賽，目標 Q1–Q3 在 75 分鐘內全過。",
        },
        { term: "通過", detail: "進入第三階段。" },
        {
          term: "卡在 Q3 是 DP",
          detail:
            "把第 9 週換成 DP 補強週，從 q3_handbook 的「動態規劃：必修」再抓 5 題，其餘週次順延。",
        },
        {
          term: "卡在讀題與速度",
          detail: "照原計畫走，但把週六模擬改成每週一場。",
        },
      ],
    },
  },
  {
    id: 3,
    label: "第三階段",
    title: "圖、樹與位元",
    goal: "Q3 穩定 AK；Q4 至少能寫出暴力或想到方向",
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
          detail: "兩場都 Q1–Q3 全過，其中至少一場在 60 分鐘內完成 Q1–Q3。",
        },
        {
          term: "接下來",
          detail:
            "達標就轉進「進階刷題衝刺（1700→2100）」與 Q4 手冊；沒達標就把十二週裡一次過率最低的三個主題各再做 5 題，用同一套節奏跑一個月。",
        },
      ],
    },
  },
];

export const practicePlanRhythm = [
  {
    when: "週一",
    minutes: "45 分",
    what: "讀該週講義小節 20 分（只讀「訊號／不變式／套路／陷阱」四塊）＋ 模板題 1 題 25 分",
  },
  {
    when: "週二–週五",
    minutes: "40 分 ×4",
    what: "主線題各 1 題：想 10 分 → 寫 25 分 → 記四行筆記 5 分。35 分鐘無解就看題解到「啊」那一句為止，然後自己寫完",
  },
  {
    when: "週六（雙週）",
    minutes: "90 分",
    what: "限時模擬舊週賽 Q1–Q3，從競賽頁挑分數帶相近的場次。非模擬週改做 45 分鐘挑戰題",
  },
  {
    when: "週日",
    minutes: "40 分",
    what: "重寫 2 題標為「需要複習」的舊題（不看筆記）＋ 更新筆記與下週選題",
  },
];

export const practicePlanRules = [
  {
    title: "一週有 3 題卡超過 45 分鐘",
    detail:
      "這是難度超前的訊號，不是努力不夠。回到同主題題單裡低 100–150 分的題各補 2 題，本週主線延後。硬推的代價是接下來三週的信心。",
  },
  {
    title: "五題都在 20 分鐘內解完",
    detail:
      "難度落後了。直接跳做該週的挑戰題，並從 Q3 手冊對應主題的「挑戰」欄再抓 2 題。不要用多做簡單題來累積數量。",
  },
  {
    title: "出差、生病、加班週",
    detail:
      "只做週日那 40 分鐘複習，新題全部延後一週。複習是唯一不可跳過的部分——跳過新題只是慢一週，跳過複習是前面幾週白做。",
  },
  {
    title: "模擬時 Q3 想不出來",
    detail:
      "比賽當下就記下「這題的訊號是什麼」，賽後對照講義該主題的「訊號」欄。Q3 失手幾乎都是辨識失敗，不是實作失敗。",
  },
];

export const practicePlanMetrics = [
  {
    figure: "≥ 60%",
    title: "1700 分帶一次過率",
    detail:
      "不看題解就通過的比例。每月底統計一次；低於 50% 表示新題吃太快，把配比改成新題 4 題、複習 3 題。",
  },
  {
    figure: "≤ 5 分",
    title: "確定方向的時間",
    detail:
      "從讀完題到知道用哪個 pattern。這是 AK Q3 的真正瓶頸——寫得快沒用，選錯方向就沒有機會了。",
  },
  {
    figure: "≥ 70%",
    title: "複習題重寫一次過率",
    detail:
      "隔 7 天那次重寫的通過率。這個數字掉下來，代表筆記寫成了解法抄錄而不是訊號記錄。",
  },
];

export const practicePlanNoteTemplate = [
  "訊號：題目裡哪句話讓我該想到這個做法",
  "關鍵一步：整題最不顯然的那一下",
  "我當時卡在哪：想不到 X ／ 邊界寫錯 Y",
  "可複用模板：函式簽名或 3 行骨架",
].join("\n");

export const practicePlanProgressConvention = [
  { status: "進行中", meaning: "本週要做的 5 題" },
  { status: "需要複習", meaning: "看過題解、或超過 40 分鐘才寫出來的" },
  { status: "已解題", meaning: "獨立解出，且三次複習都一次過" },
  { status: "暫時跳過", meaning: "評分高於本階段上限，留給第三個月之後" },
];
