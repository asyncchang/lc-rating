// 集訓計畫的資料形狀。同一套 UI 目前渲染兩條路線（Q3、Q4），差異全部收在資料裡：
// 週次、難度校準、節奏與檢核點各自獨立，元件不做任何 track 判斷。

export interface TrainingPlanProblem {
  /** LeetCode 題號，同時是進度與筆記的 key。 */
  id: string;
  title: string;
  slug: string;
  /** zerotrac 評分；早期經典題無競賽評分，為 null。 */
  rating: number | null;
  /** 這題在集訓裡的角色：練什麼、為什麼排在這個位置。 */
  role: string;
  /**
   * 超載題：刻意高過當週主線 200–300 分的一題，用來把主線難度變成相對輕鬆的
   * 一檔。做法與主線題不同，見 track.overload。
   */
  bonus?: boolean;
}

export interface TrainingPlanWeek {
  week: number;
  topic: string;
  /** 對應的站內講義與題單。 */
  refs: { label: string; href: string }[];
  problems: TrainingPlanProblem[];
  /** 本週要留下的可複用產物——集訓的產出是判準與模板，不是題數。 */
  deliverable: string;
  /** 這週週六排第幾場限時模擬；沒排就不填。 */
  contest?: number;
}

export interface TrainingPlanCheckpoint {
  label: string;
  items: { term: string; detail: string }[];
}

export interface TrainingPlanPhase {
  id: number;
  label: string;
  title: string;
  goal: string;
  weeks: number[];
  checkpoint: TrainingPlanCheckpoint;
}

export interface TrainingPlanCalibrationWindow {
  label: string;
  median: number;
  iqr: string;
  /** 低門檻佔比，欄標題見 thresholdLabels[0]。 */
  overLow: string;
  /** 高門檻佔比，欄標題見 thresholdLabels[1]。 */
  overHigh: string;
}

export interface TrainingPlanCalibration {
  updatedAt: string;
  method: string;
  headline: string[];
  /** 逐年中位數表的欄標題，例如「Q4 中位數」。 */
  byYearLabel: string;
  byYear: { year: string; median: number }[];
  /** 兩個門檻欄的標題，例如 ["≥2400", "≥2600"]。 */
  thresholdLabels: [string, string];
  windows: TrainingPlanCalibrationWindow[];
}

export interface TrainingPlanOverload {
  principle: string;
  rules: string[];
}

export interface TrainingPlanRhythmRow {
  when: string;
  minutes: string;
  what: string;
}

export interface TrainingPlanRule {
  title: string;
  detail: string;
}

export interface TrainingPlanMetric {
  figure: string;
  title: string;
  detail: string;
}

export interface TrainingPlanProgressStatus {
  status: string;
  meaning: string;
}

/** 一條完整的集訓路線。 */
export interface TrainingPlanTrack {
  id: TrainingPlanTrackId;
  /** 路線切換器上的短標籤。 */
  navLabel: string;
  href: string;
  /** 頁面主標題。 */
  title: string;
  /** 主標題下的一句話說明（會接上 profile.audience）。 */
  lead: string;
  /** 進入這條路線前應該具備的程度；顯示在切換器下方。 */
  prerequisite: string;
  profile: { audience: string; ratingBand: string };
  calibration: TrainingPlanCalibration;
  overload: TrainingPlanOverload;
  weeks: TrainingPlanWeek[];
  phases: TrainingPlanPhase[];
  rhythm: TrainingPlanRhythmRow[];
  reviewSchedule: string;
  rules: TrainingPlanRule[];
  metrics: TrainingPlanMetric[];
  noteTemplate: string;
  progressConvention: TrainingPlanProgressStatus[];
  /** 「只看三個數字」下方那句總結，收到 (totalProblems) 題數。 */
  totalNote: (total: number) => string;
}

export type TrainingPlanTrackId = "q3" | "q4";
