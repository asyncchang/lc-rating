#!/usr/bin/env node
/* global process */
/**
 * Build an `applyLectureSections.mjs` additions file from authored markdown.
 *
 * The markdown under `scripts/lecture_content/<topic>/<n>-<slug>.md` is written
 * with the same `## ` headings as the 講義 skeleton. This script matches each
 * file to a 講義 section by the leading number in the section title, then emits
 * only the headings that section is actually missing — so prose already written
 * on the 講義 side is never overwritten.
 *
 * Usage:
 *   node scripts/buildAdditionsFromMarkdown.mjs graph > additions.json
 */
import { readFileSync, readdirSync } from "node:fs";
import {
  MARKDOWN_ROOT,
  REQUIRED_HEADINGS,
  eachSection,
  leadingNumber,
  loadTopic,
  parseSkeleton,
} from "./lectureSkeleton.mjs";

const topics = process.argv.slice(2);
if (topics.length === 0) {
  console.error("usage: buildAdditionsFromMarkdown.mjs <topic>...");
  process.exit(2);
}

const additions = {};
const notes = [];

for (const topic of topics) {
  const byNumber = new Map();
  for (const file of readdirSync(`${MARKDOWN_ROOT}${topic}`)) {
    if (!file.endsWith(".md")) continue;
    const number = leadingNumber(file);
    if (!number) continue;
    byNumber.set(
      number,
      parseSkeleton(readFileSync(`${MARKDOWN_ROOT}${topic}/${file}`, "utf8")),
    );
  }

  const { root } = await loadTopic(topic);
  const topicAdditions = {};
  const used = new Set();

  eachSection(root, (node) => {
    const parsed = parseSkeleton(node.summary);
    const number = leadingNumber(node.title);
    const authored = number ? byNumber.get(number) : undefined;
    // Topic intros and other free prose have no authored lesson. A numbered
    // Markdown-backed leaf is different: treat it as a lesson even when its
    // runtime summary currently has no H2 headings, otherwise a migration gap
    // such as graph 17.1 is silently skipped.
    if (parsed.sections.size === 0 && !authored) return;
    if (!authored) {
      notes.push(`${topic}: no markdown for "${node.title}"`);
      return;
    }
    used.add(number);

    const fill = {};
    for (const heading of REQUIRED_HEADINGS) {
      if (parsed.sections.has(heading)) continue; // keep existing prose
      const body = authored.sections.get(heading);
      if (body) fill[heading] = body;
      else
        notes.push(
          `${topic}: "${node.title}" needs ${heading}, markdown has none`,
        );
    }
    if (Object.keys(fill).length > 0) topicAdditions[node.title] = fill;
  });

  for (const number of byNumber.keys()) {
    if (!used.has(number)) {
      notes.push(`${topic}: markdown ${number} matched no 講義 section`);
    }
  }
  additions[topic] = topicAdditions;
}

for (const note of notes) console.error(note);
console.log(JSON.stringify(additions, null, 2));
