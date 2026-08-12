"use client";

import { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  useGlobalSettingsStore,
  type ReadingWidth,
  type TextSize,
} from "@/hooks/useGlobalSettings";
import { isThemePreference, type ThemePreference } from "@/types/siteStorage";

const themeOptions: { value: ThemePreference; label: string }[] = [
  { value: "system", label: "系統" },
  { value: "light", label: "淺色" },
  { value: "dark", label: "深色" },
];

const textSizeOptions: { value: TextSize; label: string }[] = [
  { value: "small", label: "小" },
  { value: "standard", label: "標準" },
  { value: "large", label: "大" },
];

const readingWidthOptions: { value: ReadingWidth; label: string }[] = [
  { value: "standard", label: "標準" },
  { value: "wide", label: "寬" },
  { value: "full", label: "全寬" },
];

interface SegmentedRowProps<T extends string> {
  label: string;
  value: T | undefined;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}

function SegmentedRow<T extends string>({
  label,
  value,
  options,
  onChange,
}: SegmentedRowProps<T>) {
  return (
    <div className="space-y-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="grid auto-cols-fr grid-flow-col gap-1 rounded-lg bg-muted/60 p-1">
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={active}
              className={cn(
                "cursor-pointer rounded-md px-2 py-1.5 text-sm transition-colors",
                active
                  ? "bg-background font-medium text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function AppearanceMenu() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { textSize, setTextSize, readingWidth, setReadingWidth } =
    useGlobalSettingsStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // `next-themes` resolves `theme` only on the client; before mount leave the
  // theme row unselected to avoid a hydration mismatch in the always-rendered
  // navbar.
  const currentTheme =
    mounted && theme && isThemePreference(theme) ? theme : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="顯示設定">
          <SlidersHorizontal className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 space-y-4">
        <SegmentedRow
          label="主題"
          value={currentTheme}
          options={themeOptions}
          onChange={setTheme}
        />
        <SegmentedRow
          label="文字大小"
          value={mounted ? textSize : undefined}
          options={textSizeOptions}
          onChange={setTextSize}
        />
        <SegmentedRow
          label="閱讀寬度"
          value={mounted ? readingWidth : undefined}
          options={readingWidthOptions}
          onChange={setReadingWidth}
        />
      </PopoverContent>
    </Popover>
  );
}

AppearanceMenu.displayName = "AppearanceMenu";
