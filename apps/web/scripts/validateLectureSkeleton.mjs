#!/usr/bin/env node
/* global process */
/**
 * Report how far the 講義 have moved onto the handbook lesson skeleton.
 *
 * `node scripts/validateLectureSkeleton.mjs` prints per-topic coverage and
 * always exits 0. Pass `--strict` to fail when any section that already uses
 * the skeleton is missing a required heading or has them out of order — that
 * is the mode worth wiring into CI once every section is converted.
 *
 * A section counts as "on the skeleton" once it has any `##` heading at all;
 * topic overviews and other free-form prose have none and are simply listed
 * as prose, not reported as failures unless a matching authored Markdown
 * lesson proves that the node should use the skeleton.
 */
import { existsSync, readdirSync } from "node:fs";
import {
  MARKDOWN_ROOT,
  REQUIRED_HEADINGS,
  SECTION_ORDER,
  TOPICS,
  eachSection,
  leadingNumber,
  loadTopic,
  parseSkeleton,
} from "./lectureSkeleton.mjs";

const strict = process.argv.includes("--strict");
const only = process.argv.filter((arg) => !arg.startsWith("--")).slice(2);
const problems = [];
const totals = { prose: 0, partial: 0, complete: 0 };

function authoredNumbers(topic) {
  const directory = `${MARKDOWN_ROOT}${topic}`;
  if (!existsSync(directory)) return new Set();
  return new Set(
    readdirSync(directory)
      .filter((file) => file.endsWith(".md"))
      .map(leadingNumber)
      .filter(Boolean),
  );
}

function isBulletList(body) {
  const lines = body.split("\n").filter((line) => line.trim().length > 0);
  return (
    lines.length > 0 &&
    lines.some((line) => /^-\s+\S/.test(line)) &&
    lines.every((line) => /^-\s+\S/.test(line) || /^\s{2,}\S/.test(line))
  );
}

/** A line already opening a list, table, or quote. `**bold**` is not one. */
const OPENS_BLOCK = /^\s*(?:[-+]\s+|\*(?!\*)\s+|\d+\.\s+|\||>)/m;

/**
 * Pitfalls chained into one paragraph with 「；」 read as a wall of text and
 * cannot be scanned. Three or more separators means it is a list in disguise.
 */
function hasRunOnParagraph(body) {
  return body
    .replace(/```[\s\S]*?```/g, "")
    .split(/\n\s*\n/)
    .some(
      (paragraph) =>
        !OPENS_BLOCK.test(paragraph) &&
        (paragraph.match(/；/g) ?? []).length >= 3,
    );
}

for (const topic of only.length > 0 ? only : TOPICS) {
  const { root } = await loadTopic(topic);
  const counts = { prose: 0, partial: 0, complete: 0 };
  const authored = authoredNumbers(topic);

  eachSection(root, (node, trail) => {
    const { sections } = parseSkeleton(node.summary);
    const headings = [...sections.keys()];
    const where = `${topic} › ${trail.slice(1).join(" › ") || root.title}`;
    if (headings.length === 0) {
      counts.prose++;
      const number = leadingNumber(node.title);
      if (strict && number && authored.has(number)) {
        problems.push(`${where}: authored Markdown lesson is still free prose`);
      }
      return;
    }

    const missing = REQUIRED_HEADINGS.filter(
      (heading) => !sections.has(heading),
    );

    const known = headings.filter((heading) => SECTION_ORDER.includes(heading));
    const positions = known.map((heading) => SECTION_ORDER.indexOf(heading));
    const outOfOrder = positions.some(
      (pos, i) => i > 0 && pos < positions[i - 1],
    );
    if (outOfOrder)
      problems.push(`${where}: headings out of order — ${known.join(" → ")}`);

    const unknown = headings.filter(
      (heading) => !SECTION_ORDER.includes(heading),
    );
    if (unknown.length > 0)
      problems.push(`${where}: unknown heading(s) — ${unknown.join(", ")}`);

    if (
      strict &&
      sections.has("本節重點速查") &&
      !isBulletList(sections.get("本節重點速查"))
    ) {
      problems.push(`${where}: 本節重點速查 must be a Markdown bullet list`);
    }

    if (
      strict &&
      sections.has("常見錯誤與邊界條件") &&
      hasRunOnParagraph(sections.get("常見錯誤與邊界條件"))
    ) {
      problems.push(
        `${where}: 常見錯誤與邊界條件 chains pitfalls with 「；」 — use one bullet per pitfall`,
      );
    }

    if (missing.length === 0) counts.complete++;
    else {
      counts.partial++;
      if (strict) problems.push(`${where}: missing — ${missing.join(", ")}`);
    }
  });

  for (const key of Object.keys(counts)) totals[key] += counts[key];
  const onSkeleton = counts.partial + counts.complete;
  const pct =
    onSkeleton === 0 ? 0 : Math.round((counts.complete / onSkeleton) * 100);
  console.log(
    `${topic.padEnd(20)} 完整 ${String(counts.complete).padStart(3)}/${String(onSkeleton).padEnd(3)} (${String(pct).padStart(3)}%)   自由散文 ${counts.prose}`,
  );
}

const onSkeleton = totals.partial + totals.complete;
console.log(
  `\n合計：${totals.complete}/${onSkeleton} 節具備 handbook 的全部必備標題，${totals.prose} 節為自由散文（主題導讀等）。`,
);

if (problems.length > 0) {
  console.error(`\n${problems.length} 個問題：`);
  for (const problem of problems.slice(0, 40)) console.error(`  - ${problem}`);
  if (problems.length > 40)
    console.error(`  … 另有 ${problems.length - 40} 個`);
  process.exit(1);
}
