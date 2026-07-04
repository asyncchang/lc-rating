import { lectureContentMap } from "@/features/lecture/content";
import type { TutorialData } from "@/types";

/**
 * Returns the authored 講義 tree for a category. Content lives in static
 * TypeScript modules (`features/lecture/content`), so this is a synchronous
 * lookup — no runtime fetch. Only 0x3F 主題 have standalone 講義 pages; the
 * self-authored learning paths fold their prose into their 題單 (see
 * `getMergedStudyPlan`), so they intentionally return `undefined` here. The
 * `{ isPending, error }` shape is kept for backward compatibility.
 */
export function useTutorial(plan: string) {
  const tutorial = lectureContentMap[plan] as TutorialData.Root | undefined;
  return { tutorial, isPending: false, error: null as Error | null };
}
