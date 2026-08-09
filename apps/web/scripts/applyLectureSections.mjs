#!/usr/bin/env node
/**
 * Apply authored lesson sections to the 講義 content trees.
 *
 * Usage:
 *   node scripts/applyLectureSections.mjs                 # reorder only
 *   node scripts/applyLectureSections.mjs additions.json  # reorder + insert
 *
 * Every summary that already uses `##` headings is re-emitted in
 * SECTION_ORDER, so a heading can be authored without worrying about where it
 * goes. The optional JSON file is:
 *
 *   { "<topic>": { "<section title>": { "<heading>": "<markdown body>" } } }
 *
 * Section titles are matched against the node's own `title`. A heading that
 * already has a body is replaced; anything not mentioned is left alone.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import {
  SECTION_ORDER,
  TOPICS,
  eachSection,
  loadTopic,
  parseSkeleton,
  renderSkeleton,
  serializeTopic,
} from "./lectureSkeleton.mjs";

const additionsPath = process.argv[2];
const additions = additionsPath
  ? JSON.parse(readFileSync(additionsPath, "utf8"))
  : {};

for (const heading of Object.values(additions).flatMap((topic) =>
  Object.values(topic).flatMap((section) => Object.keys(section)),
)) {
  if (!SECTION_ORDER.includes(heading)) {
    throw new Error(`unknown heading in additions: ${heading}`);
  }
}

let reordered = 0;
let inserted = 0;
const unmatched = new Map();

for (const topic of TOPICS) {
  const { exportName, root, path } = await loadTopic(topic);
  const wanted = additions[topic] ?? {};
  const seen = new Set();

  eachSection(root, (node) => {
    const parsed = parseSkeleton(node.summary);
    if (parsed.sections.size === 0 && !wanted[node.title]) return;

    const authored = wanted[node.title];
    if (authored) {
      seen.add(node.title);
      for (const [heading, body] of Object.entries(authored)) {
        parsed.sections.set(heading, body.trim());
        inserted++;
      }
    }

    const next = renderSkeleton(parsed);
    if (next !== node.summary) {
      node.summary = next;
      reordered++;
    }
  });

  const missed = Object.keys(wanted).filter((title) => !seen.has(title));
  if (missed.length > 0) unmatched.set(topic, missed);

  writeFileSync(path, serializeTopic(exportName, root));
}

if (unmatched.size > 0) {
  console.error("這些小節標題在內容樹裡找不到：");
  for (const [topic, titles] of unmatched) {
    console.error(`  ${topic}: ${titles.join(", ")}`);
  }
  process.exit(1);
}

console.log(`${reordered} 節重新排序，插入 ${inserted} 個小節`);
execFileSync("npx", ["prettier", "--write", "features/lecture/content/*.ts"], {
  stdio: "inherit",
  cwd: new URL("..", import.meta.url).pathname,
  shell: true,
});
