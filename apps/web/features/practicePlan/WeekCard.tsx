"use client";

import { I18NLink } from "@/components/common/I18NLink";
import { ProblemNoteButton } from "@/components/common/ProblemNoteButton";
import { ProgressSelector } from "@/components/common/ProgressSelector";
import { LC_HOST_EN, LC_HOST_ZH } from "@/config/constants";
import type { PracticePlanWeek } from "@/data/practicePlan";
import { Timer } from "lucide-react";
import Link from "next/link";

import { RatingChip } from "./RatingChip";

interface WeekCardProps {
  data: PracticePlanWeek;
}

/** 一週的課表：主線題與挑戰題各一列，掛上站上既有的進度與筆記。 */
export function WeekCard({ data }: WeekCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5 border-b border-border/60 px-4 py-3 sm:px-5">
        <span className="font-mono text-lg font-semibold tabular-nums text-primary">
          W{String(data.week).padStart(2, "0")}
        </span>
        <h3 className="flex-1 font-serif text-lg font-semibold tracking-tight">
          {data.topic}
        </h3>
        <div className="flex flex-wrap items-center gap-1.5">
          {data.contest && (
            <span
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
              style={{
                color: "var(--warning)",
                backgroundColor:
                  "color-mix(in oklab, var(--warning) 12%, transparent)",
              }}
            >
              <Timer className="h-3 w-3" />第 {data.contest} 場模擬
            </span>
          )}
          {data.refs.map((ref) => (
            <Link
              key={`${ref.label}-${ref.href}`}
              href={ref.href}
              className="rounded-full border border-border/60 px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {ref.label}
            </Link>
          ))}
        </div>
      </header>

      <ul className="divide-y divide-border/60">
        {data.problems.map((problem) => (
          <li
            key={problem.id}
            className={`flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 sm:px-5 ${
              problem.bonus ? "bg-muted/40" : ""
            }`}
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs tabular-nums text-muted-foreground">
                  {problem.id}
                </span>
                <I18NLink
                  link={{
                    zh: `${LC_HOST_ZH}/problems/${problem.slug}/`,
                    en: `${LC_HOST_EN}/problems/${problem.slug}/`,
                  }}
                  title={problem.title}
                  className="font-medium"
                />
                <RatingChip rating={problem.rating} />
                {problem.bonus && (
                  <span className="rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">
                    挑戰
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {problem.role}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <ProblemNoteButton
                problemId={problem.id}
                title={problem.title}
                triggerClassName="size-9 px-0"
              />
              <ProgressSelector
                problemId={problem.id}
                triggerClassName="min-w-[7.5rem] max-w-[12rem]"
              />
            </div>
          </li>
        ))}
      </ul>

      <p className="border-t border-border/60 bg-muted/40 px-4 py-3 text-sm text-muted-foreground sm:px-5">
        <span className="font-medium text-foreground">本週要留下的東西：</span>
        {data.deliverable}
      </p>
    </article>
  );
}
