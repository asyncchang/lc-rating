"use client";

import { useGlobalSettingsStore } from "@/hooks/useGlobalSettings";
import { useEffect, useState } from "react";

/**
 * Applies global display preferences by stamping `data-text-size`,
 * `data-reading-width` and `data-theme-color` on the root element;
 * `globals.css` maps them to a root font-size scale, a
 * `--lecture-reading-width` override and a brand-color palette. Mirrors
 * cp-handbook's AppPreferenceEffects so both sites resize content the same way.
 */
export function TextSizeEffect() {
  const [mounted, setMounted] = useState(false);
  const textSize = useGlobalSettingsStore((state) => state.textSize);
  const readingWidth = useGlobalSettingsStore((state) => state.readingWidth);
  const themeColor = useGlobalSettingsStore((state) => state.themeColor);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dataset.textSize = textSize;
    return () => {
      delete document.documentElement.dataset.textSize;
    };
  }, [mounted, textSize]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dataset.readingWidth = readingWidth;
    return () => {
      delete document.documentElement.dataset.readingWidth;
    };
  }, [mounted, readingWidth]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dataset.themeColor = themeColor;
    return () => {
      delete document.documentElement.dataset.themeColor;
    };
  }, [mounted, themeColor]);

  return null;
}
