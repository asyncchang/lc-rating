"use client";

import { trainingPlanTracks } from "@/data/trainingPlan";
import type { TrainingPlanTrackId } from "@/data/trainingPlan";
import Link from "next/link";

interface TrackSwitcherProps {
  current: TrainingPlanTrackId;
}

/** 兩條集訓路線的切換：Q3 打底，Q4 進階。 */
export function TrackSwitcher({ current }: TrackSwitcherProps) {
  return (
    <div
      className="inline-flex rounded-full border border-border/60 bg-card p-0.5"
      role="group"
      aria-label="集訓路線"
    >
      {trainingPlanTracks.map((track) => {
        const active = track.id === current;
        return (
          <Link
            key={track.id}
            href={track.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {track.navLabel}
          </Link>
        );
      })}
    </div>
  );
}
