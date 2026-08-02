import { HandbookSectionBody } from "@/features/handbook/HandbookSectionBody";
import React from "react";

interface TutorialMarkdownPanelProps {
  title: string;
  /** Only worth passing when it adds something the title does not already say. */
  description?: string;
  content: string;
}

export function TutorialMarkdownPanel({
  title,
  description,
  content,
}: TutorialMarkdownPanelProps) {
  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-border/60 bg-card shadow-sm">
      <div className="border-b border-border/60 bg-muted/20 px-4 py-4 sm:px-5">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="p-4 sm:p-5 md:p-6">
        <HandbookSectionBody body={content} exampleLabel="範例" language="zh" />
      </div>
    </section>
  );
}
