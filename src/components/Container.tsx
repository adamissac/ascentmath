"use client";

import type { HTMLAttributes } from "react";

type Size = "sm" | "md" | "lg" | "xl" | "2xl";

const MAX: Record<Size, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  "2xl": "max-w-[90rem]",
};

export default function Container({
  size = "xl",
  className = "",
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { size?: Size }) {
  return (
    <div
      className={`site-container mx-auto w-full min-w-0 ${MAX[size]} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
