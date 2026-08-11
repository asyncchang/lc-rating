#!/usr/bin/env node
/* global process */

import { readFileSync, readdirSync } from "node:fs";
import { extname, join, relative } from "node:path";
import katex from "katex";

import { HANDBOOK_TOPICS } from "../features/handbook/content/index.ts";
import { lectureContentMap } from "../features/lecture/content/index.ts";
import { normalizeInlineMath } from "../features/studyplan/markdownMath.ts";
import { studyPlanDataMap } from "../utils/studyPlanIndex.ts";
import { MARKDOWN_ROOT } from "./lectureSkeleton.mjs";

const ROOT = new URL("../", import.meta.url).pathname;
const problems = [];
const selectedTopics = new Set(process.argv.slice(2));

function selected(topic) {
  return selectedTopics.size === 0 || selectedTopics.has(topic);
}

function stripFencedCode(markdown, where) {
  const lines = markdown.split("\n");
  const output = [];
  let fence = null;

  for (const line of lines) {
    const marker = line.trim().match(/^(```+|~~~+)/)?.[1] ?? null;
    if (marker) {
      if (fence === null) fence = marker[0];
      else if (marker[0] === fence) fence = null;
      output.push("");
      continue;
    }
    output.push(fence === null ? line : "");
  }

  if (fence !== null) problems.push(`${where}: unclosed code fence`);
  return output.join("\n");
}

function extractMath(markdown, where) {
  const text = stripFencedCode(markdown, where).replace(/`[^`\n]*`/g, "");
  const expressions = [];
  let plain = "";

  for (let i = 0; i < text.length; ) {
    if (text[i] === "\\" && text[i + 1] === "$") {
      plain += "  ";
      i += 2;
      continue;
    }
    if (text[i] !== "$") {
      plain += text[i];
      i++;
      continue;
    }

    const delimiter = text[i + 1] === "$" ? "$$" : "$";
    const start = i;
    i += delimiter.length;
    const bodyStart = i;
    let found = false;

    while (i < text.length) {
      if (text[i] === "\\" && text[i + 1] === "$") {
        i += 2;
        continue;
      }
      if (text.startsWith(delimiter, i)) {
        const body = text.slice(bodyStart, i);
        if (delimiter === "$" && body.includes("\n")) break;
        expressions.push(body);
        i += delimiter.length;
        plain += " ".repeat(i - start);
        found = true;
        break;
      }
      i++;
    }

    if (!found) {
      const context = text
        .slice(Math.max(0, start - 40), Math.min(text.length, start + 80))
        .replace(/\n/g, "\\n");
      problems.push(
        `${where}: unmatched ${delimiter} delimiter near "${context}"`,
      );
      plain += text.slice(start, i);
    }
  }

  return { expressions, plain };
}

function checkMarkdown(where, source) {
  const normalized = normalizeInlineMath(source);
  const { expressions, plain } = extractMath(normalized, where);

  const rawCommand = plain.match(
    /\\(?:begin|end|frac|sqrt|sum|prod|text|mathrm|mathbf|mathit|operatorname|left|right|lceil|rceil|lfloor|rfloor|cdot|times|leq?|geq?|infty|bmod)\b/,
  );
  if (rawCommand) {
    problems.push(
      `${where}: raw LaTeX command outside math (${rawCommand[0]})`,
    );
  }

  for (const expression of expressions) {
    try {
      katex.renderToString(expression, {
        throwOnError: true,
        strict: "error",
      });
    } catch (error) {
      const snippet = expression.replace(/\n/g, "\\n").slice(0, 120);
      problems.push(
        `${where}: KaTeX ${error.message}; expression "${snippet}"`,
      );
    }
  }
}

function visit(where, value) {
  if (!value || typeof value !== "object") return;
  const record = value;

  for (const key of ["summary", "description", "body", "content"]) {
    if (typeof record[key] === "string") {
      checkMarkdown(`${where}.${key}`, record[key]);
    }
  }

  for (const key of ["children", "sections"]) {
    if (!Array.isArray(record[key])) continue;
    record[key].forEach((child, index) =>
      visit(`${where}.${key}[${index}]`, child),
    );
  }
}

function markdownFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return markdownFiles(path);
    return extname(entry.name) === ".md" ? [path] : [];
  });
}

for (const [key, root] of Object.entries(lectureContentMap)) {
  if (!selected(key)) continue;
  visit(`lecture.${key}`, root);
}
for (const [key, root] of Object.entries(studyPlanDataMap)) {
  if (!selected(key)) continue;
  visit(`studyplan.${key}`, root);
}
if (selectedTopics.size === 0 || selectedTopics.has("handbook")) {
  HANDBOOK_TOPICS.forEach((topic, index) =>
    visit(`handbook.${topic.slug ?? index}`, topic),
  );
}
for (const path of markdownFiles(MARKDOWN_ROOT)) {
  const topic = relative(MARKDOWN_ROOT, path).split("/")[0];
  if (!selected(topic)) continue;
  checkMarkdown(relative(ROOT, path), readFileSync(path, "utf8"));
}

if (problems.length > 0) {
  console.error(`${problems.length} content-format problem(s):`);
  for (const problem of problems.slice(0, 100)) console.error(`  - ${problem}`);
  if (problems.length > 100) {
    console.error(`  ... and ${problems.length - 100} more`);
  }
  process.exit(1);
}

console.log("Content formatting is valid.");
