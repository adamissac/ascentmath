#!/usr/bin/env python3
"""Regenerate favicon assets from public/newLogo.png."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "newLogo.png"
BRAND_CREAM = (251, 250, 247, 255)


def is_fringe(r: int, g: int, b: int, a: int) -> bool:
    """Semi-transparent gray export artifacts along image edges."""
    if a < 90:
        return True
    return abs(r - g) < 8 and abs(g - b) < 8 and r > 200 and a < 200


def is_content(r: int, g: int, b: int, a: int) -> bool:
    if a < 128 or is_fringe(r, g, b, a):
        return False
    return True


def clean_logo(src: Image.Image) -> Image.Image:
    pixels = src.load()
    w, h = src.size
    minx, miny, maxx, maxy = w, h, -1, -1

    for y in range(h):
        for x in range(w):
            if is_content(*pixels[x, y]):
                minx = min(minx, x)
                miny = min(miny, y)
                maxx = max(maxx, x)
                maxy = max(maxy, y)

    if maxx < minx or maxy < miny:
        raise RuntimeError("Could not detect logo bounds in newLogo.png")

    cropped = src.crop((minx, miny, maxx + 1, maxy + 1))

    # Square crop around the logo so favicons stay centered.
    cw, ch = cropped.size
    side = max(cw, ch)
    square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    offset = ((side - cw) // 2, (side - ch) // 2)
    square.paste(cropped, offset, cropped)
    return square


def compose(size: int, logo: Image.Image, padding: float = 0.08) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), BRAND_CREAM)
    inner = int(size * (1 - padding * 2))
    scaled = logo.resize((inner, inner), Image.Resampling.LANCZOS)
    offset = ((size - inner) // 2, (size - inner) // 2)
    canvas.paste(scaled, offset, scaled)
    return canvas


def write_icons(logo: Image.Image) -> None:
    targets = {
        ROOT / "src" / "app" / "icon.png": 512,
        ROOT / "src" / "app" / "apple-icon.png": 180,
        ROOT / "public" / "favicon-32.png": 32,
        ROOT / "public" / "android-chrome-192.png": 192,
        ROOT / "public" / "android-chrome-512.png": 512,
    }

    for path, size in targets.items():
        compose(size, logo).save(path, format="PNG", optimize=True)

    ico_targets = [ROOT / "src" / "app" / "favicon.ico", ROOT / "public" / "favicon.ico"]
    icon_512 = compose(512, logo)
    for path in ico_targets:
        icon_512.save(
            path,
            format="ICO",
            sizes=[(16, 16), (32, 32), (48, 48), (64, 64)],
        )


def main() -> None:
    logo = clean_logo(Image.open(SRC).convert("RGBA"))
    write_icons(logo)
    print("Favicon assets regenerated.")


if __name__ == "__main__":
    main()
