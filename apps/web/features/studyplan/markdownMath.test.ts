import assert from "node:assert/strict";
import test from "node:test";

import { complexityToKatex, normalizeInlineMath } from "./markdownMath";

test("preserves localized labels inside valid inline LaTeX", () => {
  const formula = "$\\mathrm{inc}(\\text{左})+\\mathrm{dec}(\\text{右})$";

  assert.equal(normalizeInlineMath(formula), formula);
});

test("keeps accidentally dollar-wrapped Chinese prose plain", () => {
  assert.equal(normalizeInlineMath("請看 $這段說明$。"), "請看 這段說明。");
});

test("does not normalize content inside code fences", () => {
  const code = ["```md", "$\\text{左}$", "`O(n log n)`", "```"].join("\n");

  assert.equal(normalizeInlineMath(code), code);
});

test("does not treat dollar signs in inline code as math delimiters", () => {
  const source = "使用哨兵 `^` 和 `$` 避免越界。";

  assert.equal(normalizeInlineMath(source), source);
});

test("unwraps backtick-wrapped formulas", () => {
  assert.equal(normalizeInlineMath("`$x_i + 1$`"), "$x_i + 1$");
});

test("normalizes common asymptotic authoring shortcuts", () => {
  assert.equal(
    complexityToKatex("`O(sqrt(n) * log n)`"),
    "$O(\\sqrt{n} \\cdot \\log n)$",
  );
  assert.equal(complexityToKatex("`O(n√n)`"), "$O(n\\sqrt{n})$");
  assert.equal(complexityToKatex("`O(不同狀態數)`"), "`O(不同狀態數)`");
});
