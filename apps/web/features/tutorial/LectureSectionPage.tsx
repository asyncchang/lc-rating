import { Button } from "@/components/ui/button";
import type { LectureSectionTutorial } from "@/data/lectureSectionTutorials";
import { HandbookSectionBody } from "@/features/handbook/HandbookSectionBody";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { LectureSectionCards } from "@/features/tutorial/LectureSectionCards";
import {
  getProblemIds,
  getStudyPlanProblemsForSection,
  parseDescriptionBullets,
} from "@/features/tutorial/LectureSectionCards/cardModel";
import { studyPlanDataMap } from "@/utils/studyPlanIndex";

interface LectureSectionPageProps {
  section: LectureSectionTutorial;
}

export function LectureSectionPage({ section }: LectureSectionPageProps) {
  const hasChildren = section.children.length > 0;
  const studyPlan = studyPlanDataMap[section.planKey];
  const descriptionBullets = parseDescriptionBullets(section.description);
  const childItems = section.children.map((child) => {
    const childProblems = getStudyPlanProblemsForSection(studyPlan, child.id);
    const problemsForProgress =
      child.title === "模式總覽" && childProblems.length === 0
        ? getStudyPlanProblemsForSection(studyPlan, section.id)
        : childProblems;
    const problemIds = getProblemIds(problemsForProgress);

    return {
      id: child.id,
      title: child.title,
      description: child.description,
      slug: child.slug,
      href: `/lecture/${section.planKey}/${child.slug}`,
      summary: child.summary,
      childCount: child.childCount,
      totalSections: child.totalSections,
      problemCount: problemIds.length,
      problemIds,
      depth: child.depth,
    };
  });

  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-han">
      <div className="border-b border-border/60 bg-muted/20">
        <div className="page-shell flex flex-col gap-5 px-4 py-6 sm:px-6 md:py-8 xl:px-8">
          <nav className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            <Link
              href="/lecture"
              className="transition-colors hover:text-foreground"
            >
              講義
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link
              href={`/lecture/${section.planKey}`}
              className="transition-colors hover:text-foreground"
            >
              {section.planTitle}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-foreground">{section.title}</span>
          </nav>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              {section.title}
            </h1>
            {descriptionBullets ? (
              <ul className="mt-3 space-y-1.5 text-sm leading-6 text-muted-foreground sm:text-base">
                {descriptionBullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" />
                    <span className="min-w-0 break-words">{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : (
              section.description && (
                <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                  {section.description}
                </p>
              )
            )}
          </div>
        </div>
      </div>

      {hasChildren ? (
        <main className="page-shell flex flex-col gap-6 px-4 py-6 pb-24 sm:px-6 md:py-8 xl:px-8">
          {/* A parent unit still carries authored prose — the orientation that
              says what its sub-units are for. Show it before the card grid. */}
          {section.content && (
            <article className="overflow-hidden rounded-2xl border border-border/60 bg-card px-4 py-5 shadow-sm sm:px-6 md:py-7">
              <HandbookSectionBody
                body={section.content}
                exampleLabel="範例"
                language="zh"
              />
            </article>
          )}
          <LectureSectionCards title="子單元" items={childItems} />
        </main>
      ) : (
        <main className="page-shell flex flex-col gap-6 px-4 py-6 pb-24 sm:px-6 md:py-8 xl:px-8">
          <article className="w-full min-w-0 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
            <div className="px-4 py-5 sm:px-6 md:py-7">
              <HandbookSectionBody
                body={section.content}
                exampleLabel="範例"
                language="zh"
              />
            </div>
          </article>

          <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {section.previous ? (
              <Button asChild variant="outline" className="justify-start">
                <Link
                  href={`/lecture/${section.planKey}/${section.previous.slug}`}
                >
                  <ArrowLeft className="h-4 w-4" />
                  {section.previous.title}
                </Link>
              </Button>
            ) : (
              <span />
            )}
            {section.next ? (
              <Button
                asChild
                variant="outline"
                className="justify-start sm:justify-end"
              >
                <Link href={`/lecture/${section.planKey}/${section.next.slug}`}>
                  {section.next.title}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <span />
            )}
          </nav>
        </main>
      )}
    </div>
  );
}
