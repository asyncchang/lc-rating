// User-data facade: the single entry point UI should use to read and update
// a user's progress, solutions and sync state. It deliberately hides the
// underlying zustand stores, localStorage keys, auth tokens and remote
// transport so the UI can speak purely in user terms.

export {
  useSyncState,
  useCloudSync,
  signIn,
  reauthenticate,
  signOut,
} from "./sync";

export {
  useProgressStats,
  useProgressAnalysis,
  useRecentProgress,
  useProgressMap,
  useProblemProgress,
  useTrackedCount,
  useClearProgress,
  type ProgressAnalysis,
  type ProgressAnalysisScope,
  type ProgressRatingBreakdown,
  type ProgressTagBreakdown,
  type ProgressTagCoverage,
} from "./progress";

export { useProblemSolutions, type ProblemSolution } from "./solutions";

export { useProblemNote } from "./notes";

export { useDataBackup } from "./backup";
