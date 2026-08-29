import { Languages, List, Palette, Wrench } from "lucide-react";
import CustomizeOptions from "./settingPages/CustomizeOption";
import LanguagePreference from "./settingPages/LanguagePreference";
import ThemeColorPreference from "./settingPages/ThemeColorPreference";
import { lazy } from "react";

const Troubleshooting = lazy(() => import("./settingPages/Troubleshooting"));

export type SettingTabType = {
  key: string;
  title: string;
  icon: React.ReactNode;
  component: React.ReactNode;
};

export const settingTabs: SettingTabType[] = [
  {
    key: "CustomizeOptions",
    title: "自訂進度選項",
    icon: <List />,
    component: <CustomizeOptions />,
  },
  {
    key: "LanguagePreference",
    title: "語言設定",
    icon: <Languages />,
    component: <LanguagePreference />,
  },
  {
    key: "ThemeColorPreference",
    title: "主題色彩",
    icon: <Palette />,
    component: <ThemeColorPreference />,
  },
  {
    key: "Troubleshooting",
    title: "故障排除",
    icon: <Wrench />,
    component: <Troubleshooting />,
  },
];
