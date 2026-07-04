import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  isTextSize,
  useGlobalSettingsStore,
  type TextSize,
} from "@/hooks/useGlobalSettings";
import { isThemePreference, ThemePreference } from "@/types/siteStorage";
import { useTheme } from "next-themes";

const themeOptions: { value: ThemePreference; label: string }[] = [
  { value: "system", label: "跟隨系統" },
  { value: "light", label: "淺色" },
  { value: "dark", label: "深色" },
];

const textSizeOptions: { value: TextSize; label: string }[] = [
  { value: "small", label: "小" },
  { value: "standard", label: "標準" },
  { value: "large", label: "大" },
];

const Preference = () => {
  const {
    linkLanguage,
    toggleLinkLanguage,
    tagLanguage,
    toggleTagLanguage,
    textSize,
    setTextSize,
  } = useGlobalSettingsStore();
  const { theme = "system", setTheme } = useTheme();

  const handleThemeChange = (value: string) => {
    if (!isThemePreference(value)) {
      console.error(`[Preference] Invalid theme preference: ${value}`);
      return;
    }

    setTheme(value);
  };

  const handleTextSizeChange = (value: string) => {
    if (!isTextSize(value)) {
      console.error(`[Preference] Invalid text size: ${value}`);
      return;
    }

    setTextSize(value);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="theme-preference">主題</Label>
        <Select value={theme} onValueChange={handleThemeChange}>
          <SelectTrigger id="theme-preference" className="w-[12rem]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {themeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="text-size-preference">文字大小</Label>
        <Select value={textSize} onValueChange={handleTextSizeChange}>
          <SelectTrigger id="text-size-preference" className="w-[12rem]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {textSizeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          調整整個網站的文字比例，包含導覽、題單與講義內容。
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span>超連結:</span>
        <Label htmlFor="airplane-mode">中文</Label>
        <Switch
          id="airplane-mode"
          checked={linkLanguage !== "zh"}
          onCheckedChange={toggleLinkLanguage}
          className="data-[state=unchecked]:bg-red-400 data-[state=checked]:bg-primary"
        />
        <Label htmlFor="airplane-mode">英文</Label>
      </div>
      <div className="flex items-center gap-2">
        <span>標籤:</span>
        <Label htmlFor="airplane-mode">中文</Label>
        <Switch
          id="airplane-mode"
          checked={tagLanguage !== "zh"}
          onCheckedChange={toggleTagLanguage}
          className="data-[state=unchecked]:bg-red-400 data-[state=checked]:bg-primary"
        />
        <Label htmlFor="airplane-mode">英文</Label>
      </div>
    </div>
  );
};

Preference.displayName = "Preference";

export { Preference };
