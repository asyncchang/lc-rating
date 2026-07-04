type Language = "zh" | "en";

/** 全站文字大小；縮放比例與 cp-handbook 相同（93.75% / 100% / 112.5%）。 */
export type TextSize = "small" | "standard" | "large";

export const isTextSize = (value: string): value is TextSize =>
  value === "small" || value === "standard" || value === "large";

export interface GlobalSettingsStoreState {
  tagLanguage: Language;
  linkLanguage: Language;
  premium: boolean;
  textSize: TextSize;
}

interface GlobalSettingsStoreActions {
  toggleTagLanguage: () => void;
  setTagLanguage: (lang: Language) => void;
  toggleLinkLanguage: () => void;
  setLinkLanguage: (lang: Language) => void;
  togglePremium: () => void;
  setPremium: (premium: boolean) => void;
  setTextSize: (size: TextSize) => void;
}

export type GlobalSettingsStore = GlobalSettingsStoreState &
  GlobalSettingsStoreActions;
