import type { Metadata } from "next";
import { lazy } from "react";

export const metadata: Metadata = {
  title: "帳號與進度",
  description: "管理帳號同步、備份，並檢視刷題進度總覽與最近做題紀錄。",
};

const Account = lazy(() => import("@/features/account"));

export default function Page() {
  return <Account />;
}
