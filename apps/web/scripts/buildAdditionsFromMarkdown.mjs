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
  REQUIRED_HEADINGS,
  eachSection,
  loadTopic,
  parseSkeleton,
} from "./lectureSkeleton.mjs";

const CONTENT_DIR = new URL("./lecture_content/", import.meta.url).pathname;

/** Leading section number: "17.1 網路流" -> "17.1", "9-layered.md" -> "9". */
function leadingNumber(text) {
  return text.match(/^\s*(\d+(?:\.\d+)*)[-.、]?\s*/)?.[1] ?? null;
}

const topics = process.argv.slice(2);
if (topics.length === 0) {
  console.error("usage: buildAdditionsFromMarkdown.mjs <topic>...");
  process.exit(2);
}

const additions = {};
const notes = [];

for (const topic of topics) {
  const byNumber = new Map();
  for (const file of readdirSync(`${CONTENT_DIR}${topic}`)) {
    if (!file.endsWith(".md")) continue;
    const number = leadingNumber(file);
    if (!number) continue;
    byNumber.set(
      number,
      parseSkeleton(readFileSync(`${CONTENT_DIR}${topic}/${file}`, "utf8")),
    );
  }

  const { root } = await loadTopic(topic);
  const topicAdditions = {};
  const used = new Set();

  eachSection(root, (node) => {
    const parsed = parseSkeleton(node.summary);
    // Skip 自由散文 nodes (topic intros); they carry no skeleton by design.
    if (parsed.sections.size === 0) return;

    const number = leadingNumber(node.title);
    const authored = number ? byNumber.get(number) : undefined;
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
      else notes.push(`${topic}: "${node.title}" needs ${heading}, markdown has none`);
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
