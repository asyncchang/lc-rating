"use client";

import { SectionDivider } from "@/components/common/SectionDivider";
import { StatCard } from "@/components/common/StatCard";
import {
  practicePlanCalibration,
  practicePlanMetrics,
  practicePlanOverload,
  practicePlanNoteTemplate,
  practicePlanPhases,
  practicePlanProfile,
  practicePlanProgressConvention,
  practicePlanRhythm,
  practicePlanRules,
  practicePlanWeeks,
} from "@/data/practicePlan";
import { CalendarRange, Flag, ListChecks, Timer } from "lucide-react";
import { useMemo } from "react";

import { WeekCard } from "./WeekCard";

function PracticePlan() {
  const stats = useMemo(() => {
    const problems = practicePlanWeeks.flatMap((w) => w.problems);
    return {
      main: problems.filter((p) => !p.bonus).length,
      bonus: problems.filter((p) => p.bonus).length,
      contests: practicePlanWeeks.filter((w) => w.contest).length,
      weeks: practicePlanWeeks.length,
    };
  }, []);

  const weekByNumber = useMemo(
    () => new Map(practicePlanWeeks.map((w) => [w.week, w])),
    [],
  );

  return (
    <div className="min-h-screen bg-background font-han">
      <div className="page-shell px-3 py-4 sm:px-4 sm:py-6 md:px-6 xl:px-8">
        {/* Hero */}
        <section className="brand-glow motion-rise relative overflow-hidden rounded-3xl border border-border/60 bg-background/80 shadow-sm">
          <div className="flex flex-col gap-5 p-4 sm:p-6">
            <div className="space-y-2">
              <h1 className="page-title">訓練課表</h1>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {`十二週競賽訓練計畫：每週一個 pattern，題目取自站內題單並依評分排成由易到難。${practicePlanProfile.audience}`}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatCard icon={ListChecks} label="主線題" value={stats.main} />
              <StatCard icon={Flag} label="超載題" value={stats.bonus} />
              <StatCard icon={Timer} label="限時模擬" value={stats.contests} />
              <StatCard
                icon={CalendarRange}
                label="分數帶"
                value={practicePlanProfile.ratingBand}
              />
            </div>
          </div>
        </section>

        {/* 難度校準 */}
        <SectionDivider label="難度校準" />
        <section className="space-y-3">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {practicePlanCalibration.headline}
          </p>
          <div className="grid gap-3 lg:grid-cols-2">
            <div className="overflow-x-auto rounded-2xl border border-border/60 bg-card">
              <table className="w-full text-sm">
                <thead>
                  <tr className="whitespace-nowrap bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-4 py-2 text-left font-medium">區間</th>
                    <th className="px-4 py-2 text-right font-medium">中位數</th>
                    <th className="px-4 py-2 text-right font-medium">
                      四分位距
                    </th>
                    <th className="px-4 py-2 text-right font-medium">≥2100</th>
                    <th className="px-4 py-2 text-right font-medium">≥2300</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {practicePlanCalibration.windows.map((w) => (
                    <tr key={w.label}>
                      <td className="px-4 py-2.5">{w.label}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">
                        {w.median}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-muted-foreground">
                        {w.iqr}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-muted-foreground">
                        {w.over2100}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-muted-foreground">
                        {w.over2300}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-border/60 bg-card">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-4 py-2 text-left font-medium">年份</th>
                    <th className="px-4 py-2 text-right font-medium">
                      Q3 中位數
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {practicePlanCalibration.byYear.map((y) => (
                    <tr key={y.year}>
                      <td className="px-4 py-2.5 tabular-nums">{y.year}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">
                        {y.q3}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {`統計於 ${practicePlanCalibration.updatedAt}。${practicePlanCalibration.method}難度逐年漂移，數字過期時重跑一次並更新 practicePlan.ts 的校準區塊。`}
          </p>
        </section>

        {/* 每週節奏 */}
        <SectionDivider label="每週節奏" />
        <section className="space-y-3">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {
              "每週固定同一套節奏，只換主題。不要把新題擠到週末——新題要在腦子清醒的固定時段做，週末留給限時模擬與複習，這是三個月能撐完的關鍵。"
            }
          </p>
          <div className="overflow-x-auto rounded-2xl border border-border/60 bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-2 text-left font-medium">時段</th>
                  <th className="px-4 py-2 text-left font-medium">時間</th>
                  <th className="px-4 py-2 text-left font-medium">內容</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {practicePlanRhythm.map((row) => (
                  <tr key={row.when}>
                    <td className="whitespace-nowrap px-4 py-2.5 font-medium">
                      {row.when}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 tabular-nums text-muted-foreground">
                      {row.minutes}
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {row.what}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">複習排程：</span>
            {
              "看過題解、或寫超過 40 分鐘的題，在第 2 天、第 7 天、第 21 天各重寫一次，三次都一次過才把狀態從「需要複習」降為「已解題」。看過題解的當次不算已解題。"
            }
          </p>
        </section>

        {/* 超載題 */}
        <SectionDivider label="超載題怎麼做" />
        <section className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="rounded-2xl border-l-4 border-primary bg-accent/60 px-4 py-3">
            <p className="text-sm leading-relaxed">
              {practicePlanOverload.principle}
            </p>
          </div>
          <ol className="space-y-1.5 rounded-2xl border border-border/60 bg-card p-4 text-sm text-muted-foreground">
            {practicePlanOverload.rules.map((rule, i) => (
              <li key={rule} className="flex gap-2.5">
                <span className="shrink-0 font-mono text-xs tabular-nums text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="leading-relaxed">{rule}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* 三個階段 */}
        {practicePlanPhases.map((phase) => (
          <section key={phase.id}>
            <SectionDivider
              label={`${phase.label} · 第 ${phase.weeks[0]}–${phase.weeks[phase.weeks.length - 1]} 週`}
            />
            <div className="mb-4 rounded-2xl border-l-4 border-primary bg-accent/60 px-4 py-3">
              <h2 className="font-serif text-xl font-semibold tracking-tight">
                {phase.title}
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                目標：{phase.goal}
              </p>
            </div>

            <div className="space-y-4">
              {phase.weeks.map((weekNumber) => {
                const week = weekByNumber.get(weekNumber);
                return week ? <WeekCard key={weekNumber} data={week} /> : null;
              })}
            </div>

            <div className="mt-4 rounded-2xl border border-border/60 border-l-4 border-l-primary bg-card px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                {phase.checkpoint.label}
              </p>
              <dl className="mt-2 space-y-1.5 text-sm">
                {phase.checkpoint.items.map((item) => (
                  <div
                    key={item.term}
                    className="flex flex-col sm:flex-row sm:gap-2"
                  >
                    <dt className="shrink-0 font-medium">{item.term}：</dt>
                    <dd className="text-muted-foreground">{item.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        ))}

        {/* 運行規則 */}
        <SectionDivider label="運行規則" />
        <section className="grid gap-3 sm:grid-cols-2">
          {practicePlanRules.map((rule) => (
            <div
              key={rule.title}
              className="rounded-2xl border border-border/60 bg-card p-4"
            >
              <h3 className="font-medium">{rule.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {rule.detail}
              </p>
            </div>
          ))}
        </section>

        {/* 衡量 */}
        <SectionDivider label="只看三個數字" />
        <section className="grid gap-3 sm:grid-cols-3">
          {practicePlanMetrics.map((metric) => (
            <div key={metric.title} className="stat-card">
              <p className="font-mono text-2xl font-semibold tabular-nums text-primary">
                {metric.figure}
              </p>
              <h3 className="mt-1 font-medium">{metric.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {metric.detail}
              </p>
            </div>
          ))}
        </section>
        <p className="mt-3 text-sm text-muted-foreground">
          {`總題數不是指標。三個月 ${stats.main + stats.bonus} 題，比隨機刷 300 題有效的原因就在這三個數字上。`}
        </p>

        {/* 站內怎麼記 */}
        <SectionDivider label="在站內怎麼記" />
        <section className="grid gap-3 lg:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-card p-4">
            <h3 className="font-medium">進度狀態的約定</h3>
            <dl className="mt-2 space-y-1.5 text-sm">
              {practicePlanProgressConvention.map((item) => (
                <div key={item.status} className="flex gap-2">
                  <dt className="shrink-0 font-medium">{item.status}</dt>
                  <dd className="text-muted-foreground">{item.meaning}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card p-4">
            <h3 className="font-medium">每題筆記只寫四行</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              寫超過就是在抄題解。點每列右邊的筆記鈕即可寫入。
            </p>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-muted/60 p-3 text-xs leading-relaxed text-muted-foreground">
              {practicePlanNoteTemplate}
            </pre>
          </div>
        </section>

        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          {
            "題目與評分取自站內題單與 zerotrac 評分資料。每題右側的進度與筆記與題單、題庫共用同一份紀錄，在課表上標記會同步到其他頁面。"
          }
        </p>
      </div>
    </div>
  );
}

export default PracticePlan;
