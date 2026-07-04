"use client";

import { useGlobalSettingsStore } from "@/hooks/useGlobalSettings";
import { useEffect, useState } from "react";

/**
 * Applies the global text-size preference by stamping `data-text-size` on the
 * root element; `globals.css` maps it to a root font-size scale. Mirrors
 * cp-handbook's AppPreferenceEffects so both sites resize text the same way.
 */
export function TextSizeEffect() {
  const [mounted, setMounted] = useState(false);
  const textSize = useGlobalSettingsStore((state) => state.textSize);

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

  return null;
}
