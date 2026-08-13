import type { Metadata } from "next";
import { lazy } from "react";

export const metadata: Metadata = {
  title: "訓練課表",
  description:
    "十二週競賽訓練計畫：每週一個 pattern，題目取自站內題單並依評分排成由易到難，含限時模擬與檢核點。",
};

const PracticePlan = lazy(() => import("@/features/practicePlan"));

export default function Page() {
  return <PracticePlan />;
}
