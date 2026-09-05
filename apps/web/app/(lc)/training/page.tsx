import type { Metadata } from "next";
import { lazy } from "react";

export const metadata: Metadata = {
  title: "十二週集訓：穩定 AK Q3",
  description:
    "十二週競賽集訓：每週一個 pattern，題目取自站內題單並依評分排成由易到難，含限時模擬與檢核點。",
};

const TrainingPlan = lazy(() => import("@/features/trainingPlan"));

export default function Page() {
  return <TrainingPlan trackId="q3" />;
}
