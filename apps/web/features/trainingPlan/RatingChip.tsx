import { ratingInfo } from "@/components/common/RatingCircle";

interface RatingChipProps {
  /** zerotrac 評分；經典題無競賽評分，傳 null。 */
  rating: number | null;
}

/** 集訓題目列上的評分標記，沿用題庫的分數帶配色。 */
export function RatingChip({ rating }: RatingChipProps) {
  if (rating === null) {
    return (
      <span className="inline-flex items-center rounded-full border border-border/60 px-2 py-0.5 text-xs text-muted-foreground">
        經典
      </span>
    );
  }

  const { color } = ratingInfo(rating);

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium tabular-nums"
      style={{ borderColor: color, color }}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {rating}
    </span>
  );
}
