// Greek letters used in asymptotic notation (for example `O(α(n))`) mapped to
// LaTeX commands so KaTeX renders them as symbols instead of plain text.
const GREEK_TO_LATEX: Record<string, string> = {
  α: "\\alpha",
  β: "\\beta",
  γ: "\\gamma",
  δ: "\\delta",
  ε: "\\epsilon",
  ζ: "\\zeta",
  η: "\\eta",
  θ: "\\theta",
  λ: "\\lambda",
  μ: "\\mu",
  π: "\\pi",
  ρ: "\\rho",
  σ: "\\sigma",
  τ: "\\tau",
  φ: "\\phi",
  χ: "\\chi",
  ψ: "\\psi",
  ω: "\\omega",
  Γ: "\\Gamma",
  Δ: "\\Delta",
  Θ: "\\Theta",
  Λ: "\\Lambda",
  Σ: "\\Sigma",
  Φ: "\\Phi",
  Ω: "\\Omega",
};

/**
 * Convert backtick-wrapped asymptotic expressions to inline KaTeX.
 *
 * CJK descriptions such as `O(不同前綴狀態數)` remain inline code because they
 * are explanatory labels rather than formulas.
 */
export function complexityToKatex(text: string) {
  return text.replace(/`([^`\n]+)`/g, (match, inner: string) => {
    const expr = inner.trim();
    if (!/^[OΘΩ]\(.+\)$/.test(expr)) return match;
    if (/[\u3400-\u9fff\uf900-\ufaff]/.test(expr)) return match;

    const latex = expr
      .replace(/(?<!\\)\bsqrt\s*\(\s*([^()]*?)\s*\)/g, "\\sqrt{$1}")
      .replace(/(?<!\\)\bsqrt\s*\{\s*([^{}]*?)\s*\}/g, "\\sqrt{$1}")
      .replace(/(?<!\\)\bsqrt\s+([A-Za-z0-9]+)/g, "\\sqrt{$1}")
      .replace(/√\s*([A-Za-z0-9]+)/g, "\\sqrt{$1}")
      .replace(/\blog\b/g, "\\log")
      .replace(/\bmin\b/g, "\\min")
      .replace(/\bmax\b/g, "\\max")
      .replace(
        /([A-Za-z][A-Za-z0-9]*)_([A-Za-z0-9]{2,}(?:_[A-Za-z0-9]+)*)/g,
        (_matched, base: string, run: string) =>
          `${base}_{${run.replace(/_/g, "\\_")}}`,
      )
      .replace(/[\u0370-\u03ff]/g, (letter) => GREEK_TO_LATEX[letter] ?? letter)
      .replace(/\s*\*\s*/g, " \\cdot ");

    return `$${latex}$`;
  });
}

function shouldRenderAsPlainText(math: string) {
  const normalized = math.trim();

  if (/[\u3400-\u9fff]/.test(normalized)) {
    // Chinese prose is occasionally wrapped in dollar signs by imported
    // content. Keep that prose plain, but preserve real LaTeX containing
    // localized labels such as `\text{左}` or
    // `\mathrm{inc}(\text{右})`. The previous blanket CJK check stripped the
    // delimiters from those formulas and leaked raw commands into the page.
    return !/\\[A-Za-z]+/.test(normalized);
  }

  return /^\([A-Za-z_][\w\s,]*\)$/.test(normalized);
}

/**
 * Normalize authoring shortcuts without touching fenced code.
 */
export function normalizeInlineMath(markdown: string) {
  return markdown
    .split(/(```[\s\S]*?```)/g)
    .map((segment) => {
      if (segment.startsWith("```")) {
        return segment;
      }

      const prepared = complexityToKatex(segment).replace(
        /`(\${1,2}[^`\n]+?\${1,2})`/g,
        "$1",
      );

      return prepared
        .split(/(`[^`\n]*`)/g)
        .map((part) => {
          if (part.startsWith("`")) return part;
          return part.replace(
            /(^|[^$])\$([^$\n]+)\$(?!\$)/g,
            (match, prefix, math) => {
              if (shouldRenderAsPlainText(math)) {
                return `${prefix}${math}`;
              }
              return match;
            },
          );
        })
        .join("");
    })
    .join("");
}
