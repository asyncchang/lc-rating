#!/usr/bin/env python3
"""Report how far each study-plan topic is from the handbook lecture style.

The competitive-programming-handbook renders every lesson with a fixed set of
H2 headings. The 講義 lectures stored in `apps/web/public/studyplan/*.json`
should read the same way, so this script measures each leaf section against
that heading set and prints what is missing.

Usage:
    python3 apps/web/scripts/check_lecture_style.py               # all topics
    python3 apps/web/scripts/check_lecture_style.py graph trees   # some topics
    python3 apps/web/scripts/check_lecture_style.py --verbose graph
"""

from __future__ import annotations

import argparse
import json
import pathlib
import sys

STUDYPLAN_DIR = (
    pathlib.Path(__file__).resolve().parents[1] / "public" / "studyplan"
)

# The headings every aligned lecture must carry, in canonical order.
#
# The handbook also emits "## 例題與分級練習"; lectures deliberately omit it
# because the platform already renders the section's `problems` array as an
# interactive, progress-tracking list directly beneath the lecture body.
REQUIRED_HEADINGS = [
    "## 這個技術解決什麼問題",
    "## 辨識題型的訊號",
    "## 核心想法與直覺",
    "## 狀態／資料結構定義",
    "## 不變量或正確性證明",
    "## 逐步演算法",
    "## C++17 模板",
    "## 時間與空間複雜度",
    "## 常見錯誤與邊界條件",
    "## 與相似技巧的比較",
    "## 本節重點速查",
]


def iter_sections(node):
    """Yield every leaf node (a node with no children) depth-first.

    `isLeaf` is unreliable — trees.json marks real leaves `false` — so the
    structural test is the one that counts.
    """
    if not node.get("children"):
        yield node
        return
    for child in node["children"]:
        yield from iter_sections(child)


def audit(summary: str) -> list[str]:
    """Return the required headings missing from one lecture body."""
    return [h for h in REQUIRED_HEADINGS if h not in summary]


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("topics", nargs="*", help="topic names (default: all)")
    parser.add_argument(
        "--verbose",
        action="store_true",
        help="list every unaligned section and its missing headings",
    )
    parser.add_argument(
        "--strict",
        action="store_true",
        help="exit non-zero when any listed topic is not fully aligned",
    )
    args = parser.parse_args()

    if args.topics:
        files = [STUDYPLAN_DIR / f"{t}.json" for t in args.topics]
        missing_files = [f for f in files if not f.exists()]
        if missing_files:
            for f in missing_files:
                print(f"no such topic: {f.stem}", file=sys.stderr)
            return 2
    else:
        files = sorted(STUDYPLAN_DIR.glob("*.json"))

    print(f"{'topic':24}{'sections':>9}{'aligned':>9}{'todo':>7}")
    print("-" * 49)

    total_sections = total_aligned = 0
    for path in files:
        data = json.loads(path.read_text(encoding="utf-8"))
        sections = list(iter_sections(data))
        aligned = 0
        problems = []
        for section in sections:
            gaps = audit(section.get("summary") or "")
            if gaps:
                problems.append((section.get("title", "?"), gaps))
            else:
                aligned += 1

        total_sections += len(sections)
        total_aligned += aligned
        todo = len(sections) - aligned
        flag = "" if todo == 0 else "  <-- todo"
        print(f"{path.stem:24}{len(sections):9}{aligned:9}{todo:7}{flag}")

        if args.verbose and problems:
            for title, gaps in problems:
                # An empty lecture is the common case; don't print 11 lines for it.
                detail = (
                    "no lecture yet"
                    if len(gaps) == len(REQUIRED_HEADINGS)
                    else "missing " + ", ".join(h.removeprefix("## ") for h in gaps)
                )
                print(f"    {title[:44]:46}{detail}")

    print("-" * 49)
    todo = total_sections - total_aligned
    print(f"{'TOTAL':24}{total_sections:9}{total_aligned:9}{todo:7}")

    return 1 if (args.strict and todo) else 0


if __name__ == "__main__":
    raise SystemExit(main())
