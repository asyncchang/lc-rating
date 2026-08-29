type Language = "zh" | "en";

/** 全站文字大小；縮放比例與 cp-handbook 相同（93.75% / 100% / 112.5%）。 */
export type TextSize = "small" | "standard" | "large";

export const isTextSize = (value: string): value is TextSize =>
  value === "small" || value === "standard" || value === "large";

/** 長文閱讀欄寬；對應 globals.css 對 `--lecture-reading-width` 的覆寫。 */
export type ReadingWidth = "standard" | "wide" | "full";

export const isReadingWidth = (value: string): value is ReadingWidth =>
  value === "standard" || value === "wide" || value === "full";

/** 全站主色；對應 globals.css 對 `html[data-theme-color]` 的色票覆寫。 */
export const THEME_COLORS = [
  "teal",
  "indigo",
  "violet",
  "rose",
  "amber",
  "forest",
] as const;

export type ThemeColor = (typeof THEME_COLORS)[number];

export const isThemeColor = (value: string): value is ThemeColor =>
  (THEME_COLORS as readonly string[]).includes(value);

export interface GlobalSettingsStoreState {
  tagLanguage: Language;
  linkLanguage: Language;
  premium: boolean;
  textSize: TextSize;
  readingWidth: ReadingWidth;
  themeColor: ThemeColor;
}

interface GlobalSettingsStoreActions {
  toggleTagLanguage: () => void;
  setTagLanguage: (lang: Language) => void;
  toggleLinkLanguage: () => void;
  setLinkLanguage: (lang: Language) => void;
  togglePremium: () => void;
  setPremium: (premium: boolean) => void;
  setTextSize: (size: TextSize) => void;
  setReadingWidth: (width: ReadingWidth) => void;
  setThemeColor: (color: ThemeColor) => void;
}

export type GlobalSettingsStore = GlobalSettingsStoreState &
  GlobalSettingsStoreActions;
