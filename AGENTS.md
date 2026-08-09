# Repository Guidelines

## Project Structure & Module Organization

- `apps/web/` is the main Next.js 16 app (App Router). UI lives in `components/`, feature modules in `features/`, shared hooks in `hooks/`, derived data in `data/`, and utilities in `utils/`/`lib/`.
- `apps/web/public/` contains static data used at runtime (for example `problemset/`, `studyplan/`, and `tutorial/`).
- `apps/web/lc-parser/` holds the TypeScript HTML→Markdown parser; `apps/web/lc-maker/` holds Python sync/translation scripts.
- `scripts/` holds Python study-plan generation/update scripts.
- `packages/` holds shared configs and UI primitives (`eslint-config/`, `tailwind-config/`, `typescript-config/`, `ui/`).

## Build, Test, and Development Commands

Run from repo root unless noted.

- `pnpm install` installs workspace dependencies.
- `pnpm dev` starts all dev tasks via Turbo; the web app runs at `http://localhost:3001`.
- `pnpm build` builds all packages/apps with Turbo.
- `pnpm lint` runs ESLint in the workspace.
- `pnpm check-types` runs Next type generation and `tsc --noEmit`.
- `pnpm format` formats `*.ts`, `*.tsx`, and `*.md` with Prettier.

## Coding Style & Naming Conventions

- Use TypeScript, React, and Tailwind CSS conventions already in the codebase.
- Indentation and formatting are handled by Prettier (run `pnpm format`).
- Components use PascalCase (for example `ContestTable.tsx`); hooks use `useX` naming (for example `useProgress`).
- Keep files colocated by feature under `apps/web/features/`, with shared UI in `apps/web/components/` and shared hooks in `apps/web/hooks/`.

## Testing Guidelines

- There is no general test suite; rely on `pnpm lint` and `pnpm check-types` for CI safety.
- A parser test exists: `pnpm --filter web test` (uses `apps/web/lc-parser/`).
- If you add automated tests, document how to run them in this file.

## 講義 Lecture Style

Lectures live in the `summary` field of each leaf section in
`apps/web/public/studyplan/<topic>.json` and are rendered as markdown by
`TutorialMarkdownPanel` → `HandbookSectionBody`. They follow the lesson format
used by the `competitive-programming-handbook` repo, so a reader moving between
the two sites meets the same shape of explanation.

An aligned lecture carries these H2 headings, in this order:

```
## 這個技術解決什麼問題      ## 時間與空間複雜度
## 辨識題型的訊號            ## 常見錯誤與邊界條件
## 核心想法與直覺            ## 與相似技巧的比較
## 狀態／資料結構定義        ## 本節重點速查
## 不變量或正確性證明
## 逐步演算法
## C++17 模板
```

The handbook also emits `## 例題與分級練習`; lectures deliberately omit it
because the platform already renders the section's `problems` array as an
interactive, progress-tracking list directly beneath the lecture body. That is
the only intentional deviation.

Content rules:

- `## 不變量或正確性證明` must state an actual invariant and argue why it holds
  — this is the section that distinguishes a lecture from a blurb. Say which
  precondition the argument depends on (non-negative weights, acyclicity, …).
- Templates are C++17, not Python. `## 本節重點速查` is one line of recall cues.
- Inline math uses `$…$` (KaTeX runs with `nonStandard: true`).
- A markdown table only turns into an interactive problem list when its header
  has both an ID column (`ID`/`LC ID`/`題號`) and a title column
  (`Problem`/`Title`/`題目`/`題名`); other tables render as plain tables.

Authoring workflow — lectures are written as markdown, not edited into JSON by
hand:

1. Write `apps/web/scripts/lecture_content/<topic>/<n>-<slug>.md`, where `<n>`
   is the leading number of the target section title (`17.1` for
   `17.1 網路流`).
2. `python3 apps/web/scripts/apply_lectures.py <topic>` copies each file into
   the matching section's `summary`. It rewrites the minified UTF-8 JSON with
   the same separators, so diffs stay limited to the fields that changed.
   `--check` reports without writing.
3. `python3 apps/web/scripts/check_lecture_style.py <topic> --verbose` reports
   which sections are still missing which headings; `--strict` exits non-zero
   when a topic is not fully aligned.

## Commit & Pull Request Guidelines

- Commit messages are short and often use prefixes like `fix:`; keep them descriptive (for example `fix: correct rating filter`).
- Data updates may use `Update solutions` or `auto-commit` style messages; keep those consistent.
- PRs should include: a clear summary, linked issues (if any), and screenshots/GIFs for UI changes.

## Security & Configuration Tips

- Configuration lives in repo files and `.env*` is respected by Turbo; do not commit secrets.
- Keep local storage and sync settings changes isolated to `apps/web/hooks/` and `apps/web/components/common/`.
