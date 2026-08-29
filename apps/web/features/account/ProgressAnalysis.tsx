import { useMemo, useState, type ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useProgressAnalysis,
  type ProgressAnalysisScope,
} from "@/features/userData";
import { useGlobalSettingsStore } from "@/hooks/useGlobalSettings";

const TAG_PREVIEW_LIMIT = 10;
const GAP_PREVIEW_LIMIT = 10;
/**
 * Tags with only a handful of problems in the whole library make for noisy
 * completion rates, so they stay hidden until the user asks for them.
 */
const NICHE_TAG_LIBRARY_SIZE = 10;

const numberFormatter = new Intl.NumberFormat("zh-TW");

const scopes: { value: ProgressAnalysisScope; label: string }[] = [
  { value: "solved", label: "已解題" },
  { value: "tracked", label: "全部已標記" },
];

function formatCount(value: number) {
  return numberFormatter.format(value);
}

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}

function formatRating(value: number) {
  return value > 0 ? Math.round(value).toString() : "--";
}

interface DistributionBarProps {
  label: string;
  count: number;
  /** Denominator to show next to `count`, when the row is a ratio. */
  total?: number;
  rate: number;
  /** Bar width in percent; rows with nothing done stay empty. */
  fill: number;
  color: string;
  /** Optional marker shown after the label, e.g. "沒碰過". */
  badge?: ReactNode;
}

function DistributionBar({
  label,
  count,
  total,
  rate,
  fill,
  color,
  badge,
}: DistributionBarProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between gap-2 text-sm">
        <span className="flex min-w-0 items-baseline gap-1.5">
          <span className="truncate">{label}</span>
          {badge}
        </span>
        <span className="shrink-0 tabular-nums text-muted-foreground">
          {formatCount(count)}
          {typeof total === "number" && ` / ${formatCount(total)}`}
          <span className="ml-1 text-xs">({formatPercent(rate)})</span>
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full"
          style={{
            width: count > 0 ? `${Math.max(fill, 2)}%` : "0%",
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}

export default function ProgressAnalysis() {
  const [scope, setScope] = useState<ProgressAnalysisScope>("solved");
  const [showAllTags, setShowAllTags] = useState(false);
  const [showAllGaps, setShowAllGaps] = useState(false);
  const [showNicheTags, setShowNicheTags] = useState(false);
  const tagLanguage = useGlobalSettingsStore((state) => state.tagLanguage);
  const isZh = tagLanguage === "zh";

  const {
    total,
    resolved,
    ratedCount,
    averageRating,
    medianRating,
    byTag,
    byRating,
    byTagCoverage,
    libraryTagCount,
    untouchedTagCount,
    isLoading,
  } = useProgressAnalysis(scope);

  const visibleTags = useMemo(
    () => (showAllTags ? byTag : byTag.slice(0, TAG_PREVIEW_LIMIT)),
    [byTag, showAllTags],
  );

  const gaps = useMemo(
    () =>
      showNicheTags
        ? byTagCoverage
        : byTagCoverage.filter(
            (tag) => tag.libraryCount >= NICHE_TAG_LIBRARY_SIZE,
          ),
    [byTagCoverage, showNicheTags],
  );

  const visibleGaps = useMemo(
    () => (showAllGaps ? gaps : gaps.slice(0, GAP_PREVIEW_LIMIT)),
    [gaps, showAllGaps],
  );

  const nicheTagCount = byTagCoverage.filter(
    (tag) => tag.libraryCount < NICHE_TAG_LIBRARY_SIZE,
  ).length;

  const maxTagCount = byTag[0]?.count ?? 0;
  const maxRatingCount = byRating.reduce(
    (max, band) => Math.max(max, band.count),
    0,
  );
  const missing = total - resolved;

  return (
    <section className="space-y-4 rounded-lg border bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold">做題分析</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            依題目分類與分數，看看自己練得多的是哪一類。
          </p>
        </div>

        <Tabs
          value={scope}
          onValueChange={(value) => setScope(value as ProgressAnalysisScope)}
        >
          <TabsList>
            {scopes.map((item) => (
              <TabsTrigger key={item.value} value={item.value}>
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">題庫載入中…</p>
      ) : resolved === 0 ? (
        <p className="text-sm text-muted-foreground">
          {total === 0
            ? "這個範圍還沒有題目，先到題庫標記進度。"
            : "已標記的題目都不在目前的題庫資料中，無法分析。"}
        </p>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-md border bg-muted/20 px-3 py-2">
              <p className="text-xs text-muted-foreground">分析題數</p>
              <p className="mt-1 text-xl font-semibold">
                {formatCount(resolved)}
              </p>
            </div>
            <div className="rounded-md border bg-muted/20 px-3 py-2">
              <p className="text-xs text-muted-foreground">平均分數</p>
              <p className="mt-1 text-xl font-semibold">
                {formatRating(averageRating)}
              </p>
            </div>
            <div className="rounded-md border bg-muted/20 px-3 py-2">
              <p className="text-xs text-muted-foreground">中位數分數</p>
              <p className="mt-1 text-xl font-semibold">
                {formatRating(medianRating)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {formatCount(ratedCount)} 題有分數
              </p>
            </div>
          </div>

          {missing > 0 && (
            <p className="text-xs text-muted-foreground">
              另有 {formatCount(missing)} 題不在題庫資料中，未計入分析。
            </p>
          )}

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h4 className="text-sm font-medium">題型分布</h4>
                <Badge variant="secondary">
                  {formatCount(byTag.length)} 種分類
                </Badge>
              </div>

              <div className="space-y-2.5">
                {visibleTags.map((tag) => (
                  <DistributionBar
                    key={tag.id}
                    label={isZh ? tag.zh : tag.en}
                    count={tag.count}
                    rate={tag.rate}
                    fill={maxTagCount > 0 ? (tag.count / maxTagCount) * 100 : 0}
                    color="#1E90FF"
                  />
                ))}
              </div>

              {byTag.length > TAG_PREVIEW_LIMIT && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllTags((value) => !value)}
                >
                  {showAllTags
                    ? "只顯示前 10 名"
                    : `顯示全部 ${formatCount(byTag.length)} 種分類`}
                </Button>
              )}

              <p className="text-xs text-muted-foreground">
                一題可能同時屬於多個分類，因此百分比加總會超過 100%。
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium">分數分布</h4>

              <div className="space-y-2.5">
                {byRating.map((band) => (
                  <DistributionBar
                    key={band.key}
                    label={band.label}
                    count={band.count}
                    rate={band.rate}
                    fill={
                      maxRatingCount > 0
                        ? (band.count / maxRatingCount) * 100
                        : 0
                    }
                    color={band.color}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3 border-t pt-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-medium">分類缺口</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  {scope === "solved" ? "已解題數" : "已標記題數"}
                  {" ÷ 題庫該分類總題數，完成率低的排在前面。"}
                </p>
              </div>
              <Badge variant="secondary">
                {formatCount(untouchedTagCount)} /{" "}
                {formatCount(libraryTagCount)} 種分類沒碰過
              </Badge>
            </div>

            <div className="grid gap-x-6 gap-y-2.5 lg:grid-cols-2">
              {visibleGaps.map((tag) => (
                <DistributionBar
                  key={tag.id}
                  label={isZh ? tag.zh : tag.en}
                  count={tag.count}
                  total={tag.libraryCount}
                  rate={tag.rate}
                  fill={tag.rate}
                  color="#28a745"
                  badge={
                    tag.count === 0 ? (
                      <Badge
                        variant="outline"
                        className="shrink-0 px-1.5 py-0 text-[11px] font-normal text-muted-foreground"
                      >
                        沒碰過
                      </Badge>
                    ) : undefined
                  }
                />
              ))}
            </div>

            {gaps.length === 0 && (
              <p className="text-sm text-muted-foreground">
                沒有符合條件的分類。
              </p>
            )}

            <div className="flex flex-wrap items-center gap-1">
              {gaps.length > GAP_PREVIEW_LIMIT && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllGaps((value) => !value)}
                >
                  {showAllGaps
                    ? `只顯示缺口最大的 ${GAP_PREVIEW_LIMIT} 種`
                    : `顯示全部 ${formatCount(gaps.length)} 種分類`}
                </Button>
              )}

              {nicheTagCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNicheTags((value) => !value)}
                >
                  {showNicheTags
                    ? `隱藏冷門分類（${formatCount(nicheTagCount)} 種）`
                    : `含冷門分類（題庫不到 ${NICHE_TAG_LIBRARY_SIZE} 題，${formatCount(nicheTagCount)} 種）`}
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
