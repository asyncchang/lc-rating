import { List, RefreshCw, Settings } from "lucide-react";
import CustomizeOptions from "./settingPages/CustomizeOption";
import { Preference } from "./settingPages/Preference";
import SyncStorage from "./settingPages/SyncStorage";

export type SettingTabType = {
  key: string;
  title: string;
  icon: React.ReactNode;
  component: React.ReactNode;
};

export const settingTabs: SettingTabType[] = [
  {
    key: "SyncProgress",
    title: "同步站點數據",
    icon: <RefreshCw />,
    component: <SyncStorage />,
  },
  {
    key: "CustomizeOptions",
    title: "自定義進度選項",
    icon: <List />,
    component: <CustomizeOptions />,
  },
  {
    key: "Preference",
    title: "頁面偏好設置",
    icon: <Settings />,
    component: <Preference />,
  },
];