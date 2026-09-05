import type { Metadata } from "next";
import { lazy } from "react";

export const metadata: Metadata = {
  title: "十二週集訓：拿下 Q4",
  description:
    "Q4 十二週競賽集訓：以 Q4 手冊的八個 pattern 為骨幹，區間／狀壓／數位 DP、線段樹與樹狀陣列、位元、折半、圖論、樹上技巧、字串與數論各一週，含限時模擬與檢核點。",
};

const TrainingPlan = lazy(() => import("@/features/trainingPlan"));

export default function Page() {
  return <TrainingPlan trackId="q4" />;
}
