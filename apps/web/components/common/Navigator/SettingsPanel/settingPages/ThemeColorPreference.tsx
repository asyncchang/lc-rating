"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useTheme } from "next-themes";
import { themeColorMeta } from "@/config/themeColors";
import {
  THEME_COLORS,
  useGlobalSettingsStore,
  type ThemeColor,
} from "@/hooks/useGlobalSettings";
import { cn } from "@/lib/utils";

export default function ThemeColorPreference() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const themeColor = useGlobalSettingsStore((state) => state.themeColor);
  const setThemeColor = useGlobalSettingsStore((state) => state.setThemeColor);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 選中狀態與預覽色都只在掛載後才成立：`themeColor` 來自 localStorage，
  // `resolvedTheme` 來自 next-themes，兩者在伺服器端都拿不到。
  const current: ThemeColor | undefined = mounted ? themeColor : undefined;
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        選擇全站的主色。主色會套用到按鈕、連結、圖表與標題色條；淺色與深色模式
        各有一組對應的色票，切換深淺色時會自動換用。
      </p>

      <div
        role="radiogroup"
        aria-label="主題色彩"
        className="grid grid-cols-1 gap-2 sm:grid-cols-2"
      >
        {THEME_COLORS.map((color) => {
          const meta = themeColorMeta[color];
          const active = color === current;
          const preview = isDark ? meta.preview.dark : meta.preview.light;

          return (
            <button
              key={color}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setThemeColor(color)}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-left transition-colors",
                active
                  ? "border-primary bg-accent/60"
                  : "border-border hover:bg-muted/60",
              )}
            >
              <span
                aria-hidden
                className="h-8 w-8 shrink-0 rounded-full border border-border/60"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${meta.preview.light} 0%, ${meta.preview.light} 50%, ${meta.preview.dark} 50%, ${meta.preview.dark} 100%)`,
                }}
              />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">{meta.label}</span>
                <span className="block text-xs text-muted-foreground">
                  {meta.description}
                </span>
              </span>
              {active ? (
                <Check
                  className="h-4 w-4 shrink-0"
                  style={{ color: preview }}
                  aria-hidden
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
