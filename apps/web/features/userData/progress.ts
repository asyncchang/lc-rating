"use client";

import { useOptions } from "@/hooks/useOptions";
import { useProblems } from "@/hooks/useProblems";
import {
  useProgress,
  useProgressStore,
  type Progress,
} from "@/hooks/useProgress";
import { useTags } from "@/hooks/useTags";
import { isTruthy } from "@/types/common";
import type { Tag } from "@/types";
import { useMemo } from "react";

interface ProgressStatusBreakdown {
  key: string;
  label: string;
  color: string;
  count: number;
}

interface ProgressStats {
  /** Number of problems the user has given any status. */
  tracked: number;
  /** Number of problems marked solved (AC). */
  solved: number;
  /** Solved as a percentage of tracked problems. */
  solvedRate: number;
  /** Total number of problems in the library, when loaded. */
  totalProblems: number;
  /** Tracked as a percentage of the whole library. */
  coverageRate: number;
  byStatus: ProgressStatusBreakdown[];
}

interface RecentProgressItem {
  /** Problem id (matches the key used in the library). */
  id: string;
  /** Display title, falling back to the id when the library is missing it. */
  title: string;
  /** LeetCode slug, used to build a direct problem link. */
  titleSlug?: string;
  /** Problem rating, when known. */
  rating?: number;
  /** Raw status/option key. */
  status: string;
  /** Human-readable status label. */
  statusLabel: string;
  /** Status colour used for the badge dot. */
  statusColor: string;
  /** Resolved topic tags (e.g. DFS, Binary Search), when known. */
  tags: Tag[];
  /** Epoch millis of the last status change (0 when unknown). */
  updatedAt: number;
}

/** Aggregated, user-facing progress statistics (no timestamps or raw keys). */
export function useProgressStats(): ProgressStats {
  const { getOption } = useOptions();
  const { problemMap } = useProblems();
  const progress = useProgressStore((state) => state.progress);

  return useMemo(() => {
    const entries = Object.entries(progress);
    const tracked = entries.length;
    const totalProblems = problemMap ? Object.keys(problemMap).length : 0;

    const counts: Record<string, number> = {};
    for (const [, status] of entries) {
      counts[status] = (counts[status] ?? 0) + 1;
    }

    const byStatus: ProgressStatusBreakdown[] = Object.entries(counts)
      .map(([key, count]) => {
        const option = getOption(key);
        return {
          key,
          count,
          label: option.label || option.key,
          color: option.color,
        };
      })
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));

    const solved = counts.SOLVED ?? 0;
    const solvedRate = tracked > 0 ? (solved / tracked) * 100 : 0;
    const coverageRate =
      totalProblems > 0 ? (tracked / totalProblems) * 100 : 0;

    return {
      tracked,
      solved,
      solvedRate,
      totalProblems,
      coverageRate,
      byStatus,
    };
  }, [getOption, problemMap, progress]);
}

/**
 * The user's most recently updated problems, newest first. Combines progress
 * timestamps with library metadata so the UI can render a ready-to-show list.
 * Pass a positive `limit` to cap the list (defaults to 20); `0` returns all.
 */
export function useRecentProgress(limit = 20): RecentProgressItem[] {
  const { getOption } = useOptions();
  const { problemMap } = useProblems();
  const { tagMap } = useTags();
  const progress = useProgressStore((state) => state.progress);
  const progressUpdatedAt = useProgressStore(
    (state) => state.progressUpdatedAt,
  );

  return useMemo(() => {
    const items = Object.entries(progress).map(([id, status]) => {
      const option = getOption(status);
      const problem = problemMap?.[id];
      const tags =
        problem && tagMap
          ? problem.tagIds.map((tagId) => tagMap[tagId]).filter(isTruthy)
          : [];
      return {
        id,
        title: problem?.title ?? id,
        titleSlug: problem?.titleSlug,
        rating: problem?.rating,
        status,
        statusLabel: option.label || option.key,
        statusColor: option.color,
        tags,
        updatedAt: progressUpdatedAt?.[id] ?? 0,
      } satisfies RecentProgressItem;
    });

    items.sort((a, b) => b.updatedAt - a.updatedAt);

    return limit > 0 ? items.slice(0, limit) : items;
  }, [getOption, problemMap, tagMap, progress, progressUpdatedAt, limit]);
}

/**
 * Read-only access to every tracked problem's status, keyed by problem id.
 * Use this for lists, tables and cards that derive counts or badges from a
 * user's overall progress.
 */
export function useProgressMap(): Progress {
  return useProgressStore((state) => state.progress);
}

/** Read and update a single problem's progress status. */
export function useProblemProgress() {
  const { progress, setProgress, delProgress } = useProgress();
  return {
    progress,
    setStatus: setProgress,
    clearStatus: delProgress,
  };
}

/** Returns the number of tracked problems on this device. */
export function useTrackedCount() {
  const progress = useProgressStore((state) => state.progress);
  return Object.keys(progress).length;
}

/** Permanently clears all locally saved progress. */
export function useClearProgress() {
  return useProgressStore((state) => state.clearAllProgress);
}

const RATING_BANDS = [
  { key: "unknown", label: "未知", max: 1000, color: "#8E8E93" },
  { key: "1000", label: "[1000, 1200)", max: 1200, color: "#C0C0C0" },
  { key: "1200", label: "[1200, 1400)", max: 1400, color: "#A0BA87" },
  { key: "1400", label: "[1400, 1600)", max: 1600, color: "#80B44E" },
  { key: "1600", label: "[1600, 1900)", max: 1900, color: "#FFB800" },
  { key: "1900", label: "[1900, 2100)", max: 2100, color: "#FF9616" },
  { key: "2100", label: "[2100, 2400)", max: 2400, color: "#FF732B" },
  { key: "2400", label: "[2400, 3000)", max: 3000, color: "#FF2D55" },
  { key: "3000", label: ">= 3000", max: Infinity, color: "#663399" },
] as const;

/** Which problems the analysis covers. */
export type ProgressAnalysisScope = "solved" | "tracked";

export interface ProgressTagBreakdown {
  id: string;
  zh: string;
  en: string;
  count: number;
  /** Share of analysed problems carrying this tag, in percent. */
  rate: number;
}

export interface ProgressTagCoverage {
  id: string;
  zh: string;
  en: string;
  /** Problems with this tag inside the analysed scope. */
  count: number;
  /** Problems with this tag in the whole library. */
  libraryCount: number;
  /** count / libraryCount, in percent. */
  rate: number;
}

export interface ProgressRatingBreakdown {
  key: string;
  label: string;
  color: string;
  count: number;
  /** Share of analysed problems in this band, in percent. */
  rate: number;
}

export interface ProgressAnalysis {
  /** How many problems the scope selects. */
  total: number;
  /** How many of those were found in the problem library. */
  resolved: number;
  /** How many resolved problems carry a known (non-zero) rating. */
  ratedCount: number;
  /** Mean rating over rated problems (0 when there are none). */
  averageRating: number;
  /** Median rating over rated problems (0 when there are none). */
  medianRating: number;
  /** Topic tags, most-practised first. */
  byTag: ProgressTagBreakdown[];
  /** Rating bands that have at least one problem, easiest first. */
  byRating: ProgressRatingBreakdown[];
  /**
   * Every topic tag in the library measured against how much of it the user
   * has finished, least-covered first. Answers "what should I practise next?".
   */
  byTagCoverage: ProgressTagCoverage[];
  /** Tags that exist in the library (tags with no problems are ignored). */
  libraryTagCount: number;
  /** Library tags with at least one problem inside the analysed scope. */
  touchedTagCount: number;
  /** Library tags with nothing done at all. */
  untouchedTagCount: number;
  /** True while the problem library or tag list is still loading. */
  isLoading: boolean;
}

/**
 * Breaks the user's finished problems down by topic tag and rating band, so
 * the UI can answer "which kinds of problems have I actually practised?".
 * `scope` picks between AC-only ("solved") and everything the user has
 * marked ("tracked").
 */
export function useProgressAnalysis(
  scope: ProgressAnalysisScope = "solved",
): ProgressAnalysis {
  const { problemMap, isPending: problemsPending } = useProblems();
  const { tagMap, isPending: tagsPending } = useTags();
  const progress = useProgressStore((state) => state.progress);

  // How many problems each tag has in the whole library. Kept separate so
  // marking a problem doesn't re-scan the entire library.
  const libraryTagCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const problem of Object.values(problemMap ?? {})) {
      for (const tagId of problem.tagIds) {
        counts.set(tagId, (counts.get(tagId) ?? 0) + 1);
      }
    }
    return counts;
  }, [problemMap]);

  return useMemo(() => {
    const ids = Object.entries(progress)
      .filter(([, status]) => (scope === "solved" ? status === "SOLVED" : true))
      .map(([id]) => id);

    const problems = ids.map((id) => problemMap?.[id]).filter(isTruthy);

    const tagCounts = new Map<string, number>();
    const ratingCounts = new Map<string, number>();
    const ratings: number[] = [];

    for (const problem of problems) {
      for (const tagId of problem.tagIds) {
        tagCounts.set(tagId, (tagCounts.get(tagId) ?? 0) + 1);
      }

      const rating = problem.rating ?? 0;
      const band =
        RATING_BANDS.find((item) => rating < item.max) ??
        RATING_BANDS[RATING_BANDS.length - 1]!;
      ratingCounts.set(band.key, (ratingCounts.get(band.key) ?? 0) + 1);

      if (rating > 0) ratings.push(rating);
    }

    const resolved = problems.length;

    const resolveTag = (tagId: string) => {
      const tag = tagMap?.[tagId];
      return { zh: tag?.zh ?? tagId, en: tag?.en ?? tagId };
    };

    const byTag: ProgressTagBreakdown[] = [...tagCounts.entries()]
      .map(([tagId, count]) => ({
        id: tagId,
        ...resolveTag(tagId),
        count,
        rate: resolved > 0 ? (count / resolved) * 100 : 0,
      }))
      .sort((a, b) => b.count - a.count || a.en.localeCompare(b.en));

    const byRating: ProgressRatingBreakdown[] = RATING_BANDS.map((band) => ({
      key: band.key,
      label: band.label,
      color: band.color,
      count: ratingCounts.get(band.key) ?? 0,
      rate:
        resolved > 0 ? ((ratingCounts.get(band.key) ?? 0) / resolved) * 100 : 0,
    })).filter((band) => band.count > 0);

    const byTagCoverage: ProgressTagCoverage[] = [...libraryTagCounts.entries()]
      .map(([tagId, libraryCount]) => {
        const count = tagCounts.get(tagId) ?? 0;
        return {
          id: tagId,
          ...resolveTag(tagId),
          count,
          libraryCount,
          rate: libraryCount > 0 ? (count / libraryCount) * 100 : 0,
        };
      })
      // Least-covered first; among equally-covered tags, the one with more
      // problems in the library is the bigger gap.
      .sort(
        (a, b) =>
          a.rate - b.rate ||
          b.libraryCount - a.libraryCount ||
          a.en.localeCompare(b.en),
      );

    const touchedTagCount = byTagCoverage.filter((tag) => tag.count > 0).length;

    ratings.sort((a, b) => a - b);
    const ratedCount = ratings.length;
    const averageRating =
      ratedCount > 0 ? ratings.reduce((sum, x) => sum + x, 0) / ratedCount : 0;
    const middle = Math.floor(ratedCount / 2);
    const medianRating =
      ratedCount === 0
        ? 0
        : ratedCount % 2 === 1
          ? ratings[middle]!
          : (ratings[middle - 1]! + ratings[middle]!) / 2;

    return {
      total: ids.length,
      resolved,
      ratedCount,
      averageRating,
      medianRating,
      byTag,
      byRating,
      byTagCoverage,
      libraryTagCount: byTagCoverage.length,
      touchedTagCount,
      untouchedTagCount: byTagCoverage.length - touchedTagCount,
      isLoading: problemsPending || tagsPending,
    };
  }, [
    problemMap,
    tagMap,
    libraryTagCounts,
    progress,
    scope,
    problemsPending,
    tagsPending,
  ]);
}
