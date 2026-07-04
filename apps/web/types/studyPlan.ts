export interface Item {
  id?: string | number;
  title: string;
  slug: string;
  src: string;
  solution: string | null;
  score: number | null;
  difficulty?: number | null;
  difficultyLabel?: string;
  stage?: string;
  pattern?: string;
  why?: string;
  insight?: string;
  practiceOrder?: string | number;
  isPremium: boolean;
  subsection?: string;
}

/**
 * Problemset tree: the "what to practice" side of a study plan. Tutorial prose
 * lives in the matching `TutorialData` tree and is joined to sections here by
 * the stable numeric `id`.
 */
export interface Section {
  id: number;
  title: string;
  src?: string | null;
  isLeaf?: boolean;
  /**
   * Optional prose merged in from a learning-path 講義 tree. Present only for
   * self-authored plans whose 講義 was folded into the 題單 (e.g. 週賽 AK 之路).
   */
  description?: string;
  summary?: string;
  children?: Section[];
  problems?: Item[];
}

export interface Root {
  id: number;
  title: string;
  src: string | null;
  last_update: string | null;
  children: Section[];
}
