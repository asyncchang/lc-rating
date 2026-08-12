"use client";

import ProgressOverview from "./ProgressOverview";
import RecentSubmissions from "./RecentSubmissions";
import SyncStorage from "./SyncStorage";

const sections = [
  { title: "帳號與同步", component: <SyncStorage /> },
  { title: "進度總覽", component: <ProgressOverview /> },
  { title: "最近紀錄", component: <RecentSubmissions /> },
];

export default function Account() {
  return (
    <div className="min-h-screen bg-background font-han">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-10 xl:px-8">
        <h1 className="page-title mb-8">帳號與進度</h1>
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title} className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                {section.title}
              </h2>
              {section.component}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
