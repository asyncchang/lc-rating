"use client";

import { Badge } from "@/components/ui/badge";
import { useProgressMap } from "@/features/userData";
import { useOptions } from "@/hooks/useOptions";
import { useMemo } from "react";
import { getCardProgressState, type LectureSectionCardItem } from "./cardModel";
import { LectureSectionCard } from "./LectureSectionCard";

export {
  getStudyPlanProblemsForSection,
  makeLectureSectionCardItem,
} from "./cardModel";

interface LectureSectionCardsProps {
  title: string;
  items: LectureSectionCardItem[];
  emptyText?: string;
}

export function LectureSectionCards({
  title,
  items,
  emptyText = "此層目前沒有可顯示的單元。",
}: LectureSectionCardsProps) {
  const progress = useProgressMap();
  const { getOption } = useOptions();
  const pendingKey = getOption().key;

  const progressByItemId = useMemo(
    () =>
      new Map(
        items.map((item) => [
          item.id,
          getCardProgressState(item.problemIds, progress, pendingKey),
        ]),
      ),
    [items, pendingKey, progress],
  );

  return (
    <section className="rounded-3xl border border-border/60 bg-card p-4 shadow-sm sm:p-5 xl:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        <Badge variant="outline" className="w-fit rounded-full">
          {items.length} 個單元
        </Badge>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/70 bg-muted/20 px-4 py-10 text-center text-sm text-muted-foreground">
          {emptyText}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <LectureSectionCard
              key={item.id}
              item={item}
              progressState={progressByItemId.get(item.id)!}
            />
          ))}
        </div>
      )}
    </section>
  );
}
