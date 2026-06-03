"use client";

import type { HTMLAttributes, ElementType } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
  flat?: boolean;
  as?: ElementType;
};

export default function Card({
  interactive = false,
  flat = false,
  as: As = "div",
  className = "",
  children,
  ...rest
}: Props) {
  return (
    <As
      className={[
        "card",
        flat ? "card-flat" : "",
        interactive ? "card-interactive" : "",
        className,
      ].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </As>
  );
}
