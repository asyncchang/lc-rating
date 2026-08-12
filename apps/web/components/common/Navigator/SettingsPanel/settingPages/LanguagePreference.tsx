import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useGlobalSettingsStore } from "@/hooks/useGlobalSettings";

export default function LanguagePreference() {
  const { linkLanguage, toggleLinkLanguage, tagLanguage, toggleTagLanguage } =
    useGlobalSettingsStore();

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        設定站內顯示的語言。超連結影響題目連結導向的 LeetCode
        站別，標籤影響題目分類標籤的顯示語言。
      </p>

      <div className="flex items-center gap-2">
        <span className="w-16 text-sm">超連結：</span>
        <Label className="text-sm">中文</Label>
        <Switch
          checked={linkLanguage !== "zh"}
          onCheckedChange={toggleLinkLanguage}
          className="data-[state=unchecked]:bg-red-400 data-[state=checked]:bg-primary"
        />
        <Label className="text-sm">英文</Label>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-16 text-sm">標籤：</span>
        <Label className="text-sm">中文</Label>
        <Switch
          checked={tagLanguage !== "zh"}
          onCheckedChange={toggleTagLanguage}
          className="data-[state=unchecked]:bg-red-400 data-[state=checked]:bg-primary"
        />
        <Label className="text-sm">英文</Label>
      </div>
    </div>
  );
}
