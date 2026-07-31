#!/usr/bin/env python3
"""Dependency-free source checks for the Joe Town static site."""

from __future__ import annotations

import re
import subprocess
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
HTML_FILES = (ROOT / "index.html", ROOT / "privacy.html")
CSS_FILES = (ROOT / "css" / "style.css",)
JS_FILES = (ROOT / "js" / "main.js",)
GA_ID = "G-3XJQL5PVS1"


class SiteHTMLParser(HTMLParser):
    def __init__(self, path: Path) -> None:
        super().__init__(convert_charrefs=True)
        self.path = path
        self.ids: list[tuple[str, int]] = []
        self.references: list[tuple[str, str, int]] = []
        self.missing_alt: list[int] = []
        self.images: list[tuple[str, str | None, str | None, int]] = []

    def handle_starttag(
        self, tag: str, attrs: list[tuple[str, str | None]]
    ) -> None:
        values = dict(attrs)
        if "id" in values and values["id"]:
            self.ids.append((values["id"], self.getpos()[0]))
        if tag == "img" and "alt" not in values:
            self.missing_alt.append(self.getpos()[0])
        if tag == "img" and values.get("src"):
            self.images.append(
                (
                    values["src"],
                    values.get("width"),
                    values.get("height"),
                    self.getpos()[0],
                )
            )
        if tag == "source" and values.get("srcset"):
            self.images.append(
                (
                    values["srcset"].split(",")[0].strip().split()[0],
                    values.get("width"),
                    values.get("height"),
                    self.getpos()[0],
                )
            )
        for attribute in ("src", "href", "poster"):
            value = values.get(attribute)
            if value:
                self.references.append((attribute, value, self.getpos()[0]))
        if "srcset" in values and values["srcset"]:
            for candidate in values["srcset"].split(","):
                value = candidate.strip().split()[0]
                if value:
                    self.references.append(("srcset", value, self.getpos()[0]))
        if tag == "meta" and values.get("content"):
            key = values.get("property") or values.get("name")
            if key in {"og:image", "og:image:secure_url", "twitter:image"}:
                self.references.append(("content", values["content"], self.getpos()[0]))


def local_path(source: Path, reference: str) -> Path | None:
    value = reference.strip()
    parsed = urlsplit(value)
    if parsed.scheme and parsed.hostname in {"gojoetown.com", "www.gojoetown.com"}:
        clean = unquote(parsed.path)
        return None if clean in {"", "/"} else ROOT / clean.lstrip("/")
    if (
        not value
        or value.startswith(("#", "mailto:", "tel:", "data:", "javascript:"))
        or parsed.scheme
        or value.startswith("//")
    ):
        return None
    clean = unquote(parsed.path)
    if not clean or clean == "/":
        return None
    return ROOT / clean.lstrip("/") if clean.startswith("/") else source.parent / clean


def fail(errors: list[str], message: str) -> None:
    errors.append(message)


def raster_size(path: Path) -> tuple[int, int] | None:
    data = path.read_bytes()
    if data.startswith(b"\x89PNG\r\n\x1a\n") and len(data) >= 24:
        return (
            int.from_bytes(data[16:20], "big"),
            int.from_bytes(data[20:24], "big"),
        )
    if len(data) < 30 or data[:4] != b"RIFF" or data[8:12] != b"WEBP":
        return None
    chunk = data[12:16]
    if chunk == b"VP8X" and len(data) >= 30:
        return (
            int.from_bytes(data[24:27], "little") + 1,
            int.from_bytes(data[27:30], "little") + 1,
        )
    if chunk == b"VP8 " and len(data) >= 30 and data[23:26] == b"\x9d\x01\x2a":
        return (
            int.from_bytes(data[26:28], "little") & 0x3FFF,
            int.from_bytes(data[28:30], "little") & 0x3FFF,
        )
    if chunk == b"VP8L" and len(data) >= 25 and data[20] == 0x2F:
        bits = int.from_bytes(data[21:25], "little")
        return ((bits & 0x3FFF) + 1, ((bits >> 14) & 0x3FFF) + 1)
    return None


def main() -> int:
    errors: list[str] = []
    parsers: dict[Path, SiteHTMLParser] = {}

    for path in HTML_FILES:
        parser = SiteHTMLParser(path)
        parser.feed(path.read_text(encoding="utf-8"))
        parsers[path] = parser

        seen: dict[str, int] = {}
        for value, line in parser.ids:
            if value in seen:
                fail(
                    errors,
                    f"{path.relative_to(ROOT)}:{line}: duplicate id {value!r} "
                    f"(first seen on line {seen[value]})",
                )
            else:
                seen[value] = line
        for line in parser.missing_alt:
            fail(errors, f"{path.relative_to(ROOT)}:{line}: img is missing alt")
        for attribute, reference, line in parser.references:
            target = local_path(path, reference)
            if target is not None and not target.is_file():
                fail(
                    errors,
                    f"{path.relative_to(ROOT)}:{line}: {attribute} target "
                    f"{reference!r} does not exist",
                )
        for reference, width, height, line in parser.images:
            target = local_path(path, reference)
            if target is None or not target.is_file():
                continue
            actual = raster_size(target)
            if actual is None:
                continue
            try:
                declared = (int(width or ""), int(height or ""))
            except ValueError:
                fail(
                    errors,
                    f"{path.relative_to(ROOT)}:{line}: raster image "
                    f"{reference!r} needs integer width and height attributes",
                )
                continue
            if declared != actual:
                fail(
                    errors,
                    f"{path.relative_to(ROOT)}:{line}: {reference!r} declares "
                    f"{declared[0]}x{declared[1]} but file is "
                    f"{actual[0]}x{actual[1]}",
                )

    css_url = re.compile(r"url\(\s*(['\"]?)(.*?)\1\s*\)", re.IGNORECASE)
    for path in CSS_FILES:
        text = path.read_text(encoding="utf-8")
        for match in css_url.finditer(text):
            reference = match.group(2)
            target = local_path(path, reference)
            if target is not None and not target.is_file():
                line = text.count("\n", 0, match.start()) + 1
                fail(
                    errors,
                    f"{path.relative_to(ROOT)}:{line}: CSS target "
                    f"{reference!r} does not exist",
                )

    html_text = {
        path: path.read_text(encoding="utf-8")
        for path in HTML_FILES
    }
    index = html_text[ROOT / "index.html"]
    all_html = "\n".join(html_text.values())
    loader_count = len(
        re.findall(
            rf"https://www\.googletagmanager\.com/gtag/js\?id={re.escape(GA_ID)}",
            all_html,
        )
    )
    config_count = len(
        re.findall(
            rf"gtag\(\s*['\"]config['\"]\s*,\s*['\"]{re.escape(GA_ID)}['\"]\s*\)",
            all_html,
        )
    )
    if loader_count != 1:
        fail(errors, f"index.html: expected one GA loader for {GA_ID}; found {loader_count}")
    if config_count != 1:
        fail(errors, f"index.html: expected one GA config for {GA_ID}; found {config_count}")

    for path in HTML_FILES:
        text = html_text[path]
        for match in re.finditer(r"\bno[\s-]+tracking\b", text, re.IGNORECASE):
            line = text.count("\n", 0, match.start()) + 1
            fail(
                errors,
                f"{path.relative_to(ROOT)}:{line}: qualify tracking language "
                'as "no gameplay tracking" or explicitly name the Mac game',
            )

    for phrase in ("available now", "out now", "play the 1.4 update"):
        if re.search(rf"\b{re.escape(phrase)}\b", index, re.IGNORECASE):
            fail(
                errors,
                f"index.html: remove unverified public-release wording {phrase!r}; "
                "check App Store Connect live first",
            )

    for path in JS_FILES:
        result = subprocess.run(
            ["node", "--check", str(path)],
            cwd=ROOT,
            capture_output=True,
            text=True,
            check=False,
        )
        if result.returncode:
            detail = (result.stderr or result.stdout).strip()
            fail(errors, f"{path.relative_to(ROOT)}: JavaScript syntax failed: {detail}")

    if errors:
        print("Site validation failed:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    total_refs = sum(len(parser.references) for parser in parsers.values())
    total_ids = sum(len(parser.ids) for parser in parsers.values())
    print(
        "Site validation passed: "
        f"{total_refs} HTML references, {total_ids} IDs, image alts/dimensions, "
        "GA singleton, tracking language, CSS assets, and JavaScript syntax."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
