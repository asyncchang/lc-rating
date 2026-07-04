interface SectionDividerProps {
  label: string;
}

/** A labeled horizontal rule used to separate groups within a card grid. */
export function SectionDivider({ label }: SectionDividerProps) {
  return (
    <div
      role="separator"
      className="my-6 flex items-center gap-3"
      aria-label={label}
    >
      <div className="h-px flex-1 bg-border" />
      <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}
