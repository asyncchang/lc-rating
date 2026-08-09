#!/usr/bin/env python3
"""Sync authored lecture markdown into the study-plan JSON the app serves.

Lectures are authored as markdown under
`apps/web/scripts/lecture_content/<topic>/<n>-<slug>.md`, where `<n>` is the
leading number of the section title it belongs to ("8" for
"8. 單源最短路：Dijkstra 演算法", "17.1" for "17.1 網路流"). This script copies
each file into the matching section's `summary` field in
`apps/web/public/studyplan/<topic>.json`.

The JSON files are minified UTF-8, so they are rewritten with the same
separators to keep diffs limited to the fields that actually changed.

Usage:
    python3 apps/web/scripts/apply_lectures.py graph
    python3 apps/web/scripts/apply_lectures.py --check graph   # no writes
"""

from __future__ import annotations

import argparse
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
STUDYPLAN_DIR = ROOT / "public" / "studyplan"
CONTENT_DIR = pathlib.Path(__file__).resolve().parent / "lecture_content"


def iter_sections(node):
    """Yield leaf nodes depth-first (`isLeaf` is unreliable; structure is not)."""
    if not node.get("children"):
        yield node
        return
    for child in node["children"]:
        yield from iter_sections(child)


def section_number(title: str) -> str | None:
    """Extract the leading section number: '17.1 網路流' -> '17.1'."""
    match = re.match(r"\s*(\d+(?:\.\d+)*)[.、]?\s", title)
    return match.group(1) if match else None


def file_number(path: pathlib.Path) -> str | None:
    """Extract the section number a content file targets: '17.1-flow.md'."""
    match = re.match(r"(\d+(?:\.\d+)*)-", path.name)
    return match.group(1) if match else None


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("topics", nargs="+", help="topic names, e.g. graph")
    parser.add_argument(
        "--check",
        action="store_true",
        help="report what would change without writing",
    )
    args = parser.parse_args()

    exit_code = 0
    for topic in args.topics:
        json_path = STUDYPLAN_DIR / f"{topic}.json"
        content_dir = CONTENT_DIR / topic
        if not json_path.exists():
            print(f"no such topic: {topic}", file=sys.stderr)
            exit_code = 2
            continue
        if not content_dir.is_dir():
            print(f"no lecture_content/{topic}/ directory", file=sys.stderr)
            exit_code = 2
            continue

        data = json.loads(json_path.read_text(encoding="utf-8"))
        by_number = {}
        for section in iter_sections(data):
            number = section_number(section.get("title", ""))
            if number:
                by_number[number] = section

        changed = unmatched = 0
        for md_path in sorted(content_dir.glob("*.md")):
            number = file_number(md_path)
            target = by_number.get(number) if number else None
            if target is None:
                print(f"  {topic}: no section matches {md_path.name}", file=sys.stderr)
                unmatched += 1
                exit_code = 1
                continue
            body = md_path.read_text(encoding="utf-8").strip()
            if target.get("summary") != body:
                target["summary"] = body
                changed += 1

        if changed and not args.check:
            json_path.write_text(
                json.dumps(data, ensure_ascii=False, separators=(",", ":")),
                encoding="utf-8",
            )

        verb = "would update" if args.check else "updated"
        note = f", {unmatched} unmatched" if unmatched else ""
        print(f"{topic}: {verb} {changed} section(s){note}")

    return exit_code


if __name__ == "__main__":
    raise SystemExit(main())
