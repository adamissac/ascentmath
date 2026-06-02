import type { HTMLAttributes } from "react";

type Size = "sm" | "md" | "lg" | "xl";

const MAX: Record<Size, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
};

export default function Container({
  size = "xl",
  className = "",
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { size?: Size }) {
  return (
    <div
      className={[
        `mx-auto w-full ${MAX[size]} px-4 sm:px-6 safe-x`,
        "lg:pr-8 lg:pl-[calc(var(--unit-study-inset,0px)+2rem)]",
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}
