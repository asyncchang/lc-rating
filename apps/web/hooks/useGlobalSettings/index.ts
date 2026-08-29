import { useGlobalSettingsStore } from "./hook";
import {
  isTextSize,
  isReadingWidth,
  isThemeColor,
  THEME_COLORS,
} from "./types_v2";
import type {
  GlobalSettingsStoreState,
  TextSize,
  ReadingWidth,
  ThemeColor,
} from "./types_v2";

export {
  useGlobalSettingsStore,
  isTextSize,
  isReadingWidth,
  isThemeColor,
  THEME_COLORS,
};
export type { GlobalSettingsStoreState, TextSize, ReadingWidth, ThemeColor };
