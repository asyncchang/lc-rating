/**
 * The lesson skeleton shared with competitive-programming-handbook.
 *
 * The handbook keeps all 109 of its lessons on one rigid heading list, in one
 * order, and validates it in CI. lc-rating's 講義 follow the same list; the
 * three headings marked `extra` are lc-rating additions that the handbook has
 * no equivalent for, and they sit next to the handbook heading they elaborate.
 */

/** Handbook heading order, with lc-rating's own sections interleaved. */
export const SECTION_ORDER = [
  "這個技術解決什麼問題",
  "辨識題型的訊號",
  "核心想法與直覺",
  "狀態／資料結構定義",
  "不變量或正確性證明",
  "逐步演算法",
  "C++17 模板",
  "程式碼拆解", // extra: walks through the template line by line
  "時間與空間複雜度",
  "常見錯誤與邊界條件",
  "常見變形", // extra: neighbouring problem shapes
  "與相似技巧的比較",
  "代表例題", // extra: the ids this section is built around
  "例題與分級練習",
  "本節重點速查",
];

/** Headings every handbook lesson carries. lc-rating aims for the same set. */
export const REQUIRED_HEADINGS = SECTION_ORDER.filter(
  (heading) => !["程式碼拆解", "常見變形", "代表例題"].includes(heading),
);

export const TOPICS = [
  "binary_search",
  "sorting",
  "bitwise_operations",
  "data_structure",
  "dynamic_programming",
  "graph",
  "greedy",
  "grid",
  "math",
  "monotonic_stack",
  "sliding_window",
  "string",
  "trees",
];

const CONTENT_DIR = new URL(
  "../features/lecture/content/",
  import.meta.url,
).pathname;

export async function loadTopic(topic) {
  const module = await import(`${CONTENT_DIR}${topic}.ts`);
  const entry = Object.entries(module).find(
    ([, value]) => value && typeof value === "object" && "children" in value,
  );
  if (!entry) throw new Error(`${topic}: no exported lecture root`);
  return { exportName: entry[0], root: entry[1], path: `${CONTENT_DIR}${topic}.ts` };
}

/** Every node carrying a summary, depth-first, with its path of titles. */
export function eachSection(root, visit, trail = []) {
  const here = [...trail, root.title];
  if (typeof root.summary === "string") visit(root, here);
  for (const child of root.children ?? []) eachSection(child, visit, here);
}

/** Parse a summary into `{ preamble, sections: Map<heading, body> }`. */
export function parseSkeleton(summary) {
  const lines = summary.split("\n");
  const sections = new Map();
  const preamble = [];
  let current = null;
  let inFence = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) inFence = !inFence;
    const heading = !inFence && line.match(/^## (.+)$/);
    if (heading) {
      current = heading[1].trim();
      sections.set(current, []);
      continue;
    }
    (current ? sections.get(current) : preamble).push(line);
  }

  return {
    preamble: preamble.join("\n").trim(),
    sections: new Map(
      [...sections].map(([heading, body]) => [heading, body.join("\n").trim()]),
    ),
  };
}

/** Rebuild a summary from parsed parts, forcing SECTION_ORDER. */
export function renderSkeleton({ preamble, sections }) {
  const parts = [];
  if (preamble) parts.push(preamble);

  const ordered = [...sections.keys()].sort((a, b) => {
    const ai = SECTION_ORDER.indexOf(a);
    const bi = SECTION_ORDER.indexOf(b);
    return (ai === -1 ? Number.MAX_SAFE_INTEGER : ai) - (bi === -1 ? Number.MAX_SAFE_INTEGER : bi);
  });

  for (const heading of ordered) {
    const body = sections.get(heading);
    if (body) parts.push(`## ${heading}\n\n${body}`);
  }
  return `${parts.join("\n\n")}\n`;
}

export function serializeTopic(exportName, root) {
  return (
    `import type { TutorialData } from "@/types";\n\n` +
    `export const ${exportName} = ${JSON.stringify(root, null, 2)} as TutorialData.Root;\n`
  );
}
