export const BASE_PATH = process.env.NEXT_PUBLIC_LC_BASE_PATH ?? "/lc-rating";

export const LC_HOST_ZH = `https://leetcode.cn`;
export const LC_HOST_EN = `https://leetcode.com`;

export const LC_RATING_GLOBAL_SETTING_KEY = "lc-rating-global-settings";
export const LC_RATING_PROGRESS_KEY = "lc-rating-progress";
export const LC_RATING_OPTION_KEY = "lc-rating-option";
export const LC_RATING_PROBLEMSET_TABLE_KEY =
  "lc-rating-problemset-table-state";
export const STORAGE_VERSION = 0;

export const BILIBILI_0X3F_SPACE = {
  url: "https://space.bilibili.com/206214/",
  title: "靈茶山艾府(0x3F)@B站",
};

export const STUDYPLANS = {
  binary_search: "二分查找",
  bitwise_operations: "位運算",
  data_structure: "數據結構",
  dynamic_programming: "動態規劃",
  graph: "圖論算法",
  greedy: "貪心",
  grid: "網格圖",
  math: "數學",
  monotonic_stack: "單調棧",
  sliding_window: "滑動窗口",
  string: "字符串",
  trees: "樹和二叉樹",
};

export const ROUTERS = {
  contest: { title: "競賽", href: `/contest` },
  problemset: { title: "題庫", href: `/problemset` },
  studyPlans: {
    title: "題單",
    children: Object.entries(STUDYPLANS).reduce(
      (acc: { title: string; href: string }[], [key, title]) => [
        ...acc,
        { title, href: `/studyplan/${key}` },
      ],
      []
    ),
  },
  v2: { title: "👉舊版", href: `/v0` },
};