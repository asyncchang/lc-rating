type Language = "zh" | "en";

/** 全站文字大小；縮放比例與 cp-handbook 相同（93.75% / 100% / 112.5%）。 */
export type TextSize = "small" | "standard" | "large";

export const isTextSize = (value: string): value is TextSize =>
  value === "small" || value === "standard" || value === "large";

/** 長文閱讀欄寬；對應 globals.css 對 `--lecture-reading-width` 的覆寫。 */
export type ReadingWidth = "standard" | "wide" | "full";

export const isReadingWidth = (value: string): value is ReadingWidth =>
  value === "standard" || value === "wide" || value === "full";

export interface GlobalSettingsStoreState {
  tagLanguage: Language;
  linkLanguage: Language;
  premium: boolean;
  textSize: TextSize;
  readingWidth: ReadingWidth;
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
}

export type GlobalSettingsStore = GlobalSettingsStoreState &
  GlobalSettingsStoreActions;
