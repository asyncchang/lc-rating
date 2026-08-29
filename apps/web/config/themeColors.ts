import type { ThemeColor } from "@/hooks/useGlobalSettings";

export interface ThemeColorMeta {
  /** 設定面板上顯示的名稱。 */
  label: string;
  /** 一句話說明這組色票的調性。 */
  description: string;
  /** 色票預覽用的主色，與 globals.css 的 `--primary` 一致。 */
  preview: {
    light: string;
    dark: string;
  };
}

/**
 * 主色色票的顯示資料。實際的色彩定義在 `app/globals.css` 的
 * `html[data-theme-color=...]` 區塊，這裡只放設定面板要用的名稱與預覽色，
 * 兩邊的 hex 必須一起改。
 */
export const themeColorMeta: Record<ThemeColor, ThemeColorMeta> = {
  teal: {
    label: "青藍",
    description: "預設色，與競賽手冊同一套色票",
    preview: { light: "#0c7183", dark: "#60c6d5" },
  },
  indigo: {
    label: "靛藍",
    description: "偏冷的藍紫，適合長時間閱讀",
    preview: { light: "#3f4dae", dark: "#9aa7f0" },
  },
  violet: {
    label: "紫羅蘭",
    description: "帶點華麗感的紫色",
    preview: { light: "#7040b0", dark: "#c4a3f0" },
  },
  rose: {
    label: "玫瑰",
    description: "溫暖的紅粉色",
    preview: { light: "#b23350", dark: "#f2a1b4" },
  },
  amber: {
    label: "琥珀",
    description: "偏暖的金褐色",
    preview: { light: "#96610f", dark: "#f0bf6b" },
  },
  forest: {
    label: "森綠",
    description: "沉穩的墨綠色",
    preview: { light: "#10714b", dark: "#6ed3a1" },
  },
};
