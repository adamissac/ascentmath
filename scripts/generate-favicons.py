#!/usr/bin/env python3
"""Regenerate logo, og-image, and favicon assets from public/logo-source2.png."""

from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "logo-source2.png"
OUT_LOGO = ROOT / "public" / "ascent-logo.png"
OG_IMAGE = ROOT / "public" / "og-image.png"
SITE_BG = (251, 250, 247, 255)
TRANSPARENT = (0, 0, 0, 0)


def color_distance(a: tuple[int, int, int, int], b: tuple[int, int, int, int]) -> float:
    return sum((a[i] - b[i]) ** 2 for i in range(3)) ** 0.5


def is_background_pixel(r: int, g: int, b: int, a: int) -> bool:
    if a < 90:
        return True
    # Near-white / paper texture
    if r > 210 and g > 210 and b > 210:
        return True
    # Solid black matte
    if r < 35 and g < 35 and b < 45 and a > 160:
        return True
    # Light gray fringe from exports
    if abs(r - g) < 12 and abs(g - b) < 12 and r > 185 and a < 210:
        return True
    return False


def flood_remove_background(img: Image.Image) -> Image.Image:
    """Remove white/black backgrounds starting from image edges."""
    rgba = img.convert("RGBA")
    pixels = rgba.load()
    w, h = rgba.size
    visited = [[False] * w for _ in range(h)]
    queue: deque[tuple[int, int]] = deque()

    def seed(x: int, y: int) -> None:
        if 0 <= x < w and 0 <= y < h and not visited[y][x]:
            visited[y][x] = True
            if is_background_pixel(*pixels[x, y]):
                pixels[x, y] = TRANSPARENT
                queue.append((x, y))

    for x in range(w):
        seed(x, 0)
        seed(x, h - 1)
    for y in range(h):
        seed(0, y)
        seed(w - 1, y)

    while queue:
        x, y = queue.popleft()
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx]:
                visited[ny][nx] = True
                px = pixels[nx, ny]
                if is_background_pixel(*px):
                    pixels[nx, ny] = TRANSPARENT
                    queue.append((nx, ny))

    return rgba


def is_content(r: int, g: int, b: int, a: int) -> bool:
    return a > 128 and not is_background_pixel(r, g, b, a)


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
        raise RuntimeError("Could not detect logo bounds in logo-source2.png")

    cropped = src.crop((minx, miny, maxx + 1, maxy + 1))
    cw, ch = cropped.size
    side = max(cw, ch)
    square = Image.new("RGBA", (side, side), TRANSPARENT)
    square.paste(cropped, ((side - cw) // 2, (side - ch) // 2), cropped)
    return square


def compose(size: int, logo: Image.Image, padding: float = 0.06) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), TRANSPARENT)
    inner = int(size * (1 - padding * 2))
    scaled = logo.resize((inner, inner), Image.Resampling.LANCZOS)
    offset = ((size - inner) // 2, (size - inner) // 2)
    canvas.paste(scaled, offset, scaled)
    return canvas


def compose_og_image(logo: Image.Image) -> Image.Image:
    """1200×630 social preview with logo on site background."""
    canvas = Image.new("RGBA", (1200, 630), SITE_BG)
    max_h = 420
    scale = max_h / logo.height
    target_w = int(logo.width * scale)
    target_h = int(logo.height * scale)
    scaled = logo.resize((target_w, target_h), Image.Resampling.LANCZOS)
    x = (1200 - target_w) // 2
    y = (630 - target_h) // 2
    canvas.paste(scaled, (x, y), scaled)
    return canvas


def write_icons(logo: Image.Image) -> None:
    """Write site favicons from a square RGBA mark (no bg removal needed)."""
    targets = {
        ROOT / "public" / "ascent-fav-32.png": 32,
        ROOT / "public" / "favicon-32.png": 32,
        ROOT / "public" / "ascent-apple-180.png": 180,
        ROOT / "public" / "android-chrome-192.png": 192,
        ROOT / "public" / "ascent-icon-512.png": 512,
        ROOT / "public" / "android-chrome-512.png": 512,
    }

    for path, size in targets.items():
        logo.resize((size, size), Image.Resampling.LANCZOS).save(path, format="PNG", optimize=True)

    ico = logo.resize((64, 64), Image.Resampling.LANCZOS)
    for dest in (
        ROOT / "public" / "favicon.ico",
        ROOT / "public" / "ascent-fav.ico",
    ):
        ico.save(dest, format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Missing source image: {SRC}")

    logo = clean_logo(flood_remove_background(Image.open(SRC)))
    # Navbar / auth — crisp transparent master
    master = compose(512, logo, padding=0.04)
    master.save(OUT_LOGO, format="PNG", optimize=True)

    compose_og_image(logo).save(OG_IMAGE, format="PNG", optimize=True)

    # Tab / PWA icons use the dedicated app-icon upload (blue rounded A), not the
    # transparent navbar mark — otherwise logo:generate would wipe the favicon.
    favicon_src = ROOT / "public" / "favicon-source.png"
    if favicon_src.exists():
        write_icons(Image.open(favicon_src).convert("RGBA"))
        print("Logo, og-image, and favicon assets regenerated (favicons from favicon-source.png).")
    else:
        print("Logo and og-image regenerated. Skipped favicons (missing public/favicon-source.png).")


if __name__ == "__main__":
    main()
