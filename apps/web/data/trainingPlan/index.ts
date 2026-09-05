import { trainingPlanQ3 } from "./q3";
import { trainingPlanQ4 } from "./q4";
import type { TrainingPlanTrack, TrainingPlanTrackId } from "./types";

export * from "./types";
export { trainingPlanQ3 } from "./q3";
export { trainingPlanQ4 } from "./q4";

/** 切換器上的顯示順序：先 Q3 再 Q4，與難度遞進一致。 */
export const trainingPlanTracks: TrainingPlanTrack[] = [
  trainingPlanQ3,
  trainingPlanQ4,
];

export function getTrainingPlanTrack(id: TrainingPlanTrackId) {
  const track = trainingPlanTracks.find((t) => t.id === id);
  if (!track) throw new Error(`Unknown training plan track: ${id}`);
  return track;
}
