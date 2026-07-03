#!/usr/bin/env python3
"""Build Ascent Math master logo: navy A with gold ascent arrow (no book)."""

from __future__ import annotations

import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

SIZE = 1024
NAVY = (18, 47, 111, 255)
GOLD = (198, 158, 36, 255)
WHITE = (255, 255, 255, 255)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "scripts" / "assets" / "logo-source.png"
FONT = "/usr/share/fonts/truetype/macos/Inter-Bold.ttf"


def cubic_bezier(
    p0: tuple[float, float],
    p1: tuple[float, float],
    p2: tuple[float, float],
    p3: tuple[float, float],
    steps: int = 100,
) -> list[tuple[float, float]]:
    ts = np.linspace(0.0, 1.0, steps)
    points: list[tuple[float, float]] = []
    for t in ts:
        u = 1.0 - t
        x = u**3 * p0[0] + 3 * u**2 * t * p1[0] + 3 * u * t**2 * p2[0] + t**3 * p3[0]
        y = u**3 * p0[1] + 3 * u**2 * t * p1[1] + 3 * u * t**2 * p2[1] + t**3 * p3[1]
        points.append((float(x), float(y)))
    return points


def variable_width_ribbon(
    points: list[tuple[float, float]],
    width_start: float,
    width_end: float,
) -> list[tuple[float, float]]:
    left: list[tuple[float, float]] = []
    right: list[tuple[float, float]] = []
    count = len(points)

    for i, (x, y) in enumerate(points):
        t = i / max(count - 1, 1)
        half = (width_start + (width_end - width_start) * t) / 2

        if i < count - 1:
            dx = points[i + 1][0] - x
            dy = points[i + 1][1] - y
        else:
            dx = x - points[i - 1][0]
            dy = y - points[i - 1][1]

        length = math.hypot(dx, dy) or 1.0
        nx, ny = -dy / length, dx / length
        left.append((x + nx * half, y + ny * half))
        right.append((x - nx * half, y - ny * half))

    return left + right[::-1]


def main() -> None:
    img = Image.new("RGBA", (SIZE, SIZE), WHITE)
    draw = ImageDraw.Draw(img)

    font = ImageFont.truetype(FONT, 700)
    text = "A"
    bbox = draw.textbbox((0, 0), text, font=font)
    tx = (SIZE - (bbox[2] - bbox[0])) // 2 - bbox[0]
    ty = (SIZE - (bbox[3] - bbox[1])) // 2 - bbox[1] - 24
    draw.text((tx, ty), text, font=font, fill=NAVY)

    curve = cubic_bezier((108, 842), (250, 790), (610, 430), (872, 118))
    ribbon = variable_width_ribbon(curve, width_start=22, width_end=108)
    draw.polygon(ribbon, fill=GOLD)

    tip = curve[-1]
    prev = curve[-4]
    dx = tip[0] - prev[0]
    dy = tip[1] - prev[1]
    length = math.hypot(dx, dy) or 1.0
    ux, uy = dx / length, dy / length
    px, py = -uy, ux
    head_len = 118
    head_w = 72
    base = (tip[0] - ux * head_len, tip[1] - uy * head_len)
    draw.polygon(
        [
            tip,
            (base[0] + px * head_w, base[1] + py * head_w),
            (base[0] - px * head_w, base[1] - py * head_w),
        ],
        fill=GOLD,
    )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT, format="PNG", optimize=True)
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
