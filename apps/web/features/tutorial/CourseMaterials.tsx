import { getStudyPlanCourseMaterial } from "@/data/studyPlanCourseMaterials";
import { TutorialMarkdownPanel } from "./MarkdownPanel";

interface CourseMaterialsProps {
  plan: string;
}

export function CourseMaterials({ plan }: CourseMaterialsProps) {
  const material = getStudyPlanCourseMaterial(plan);

  if (!material) {
    return null;
  }

  return <TutorialMarkdownPanel title="競程課程講義" content={material} />;
}
