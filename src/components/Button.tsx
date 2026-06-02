import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "accent";
type Size = "sm" | "md" | "lg";

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
};

const VARIANT: Record<Variant, string> = {
  primary: "btn-primary",
  outline: "btn-outline",
  ghost: "btn-ghost",
  accent: "btn-accent",
};

const SIZE: Record<Size, string> = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

function classes(variant: Variant, size: Size, extra?: string) {
  return ["btn", VARIANT[variant], SIZE[size], extra].filter(Boolean).join(" ");
}

type ButtonProps = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type LinkProps = Common & AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  external?: boolean;
};

export default function Button(props: ButtonProps | LinkProps) {
  if ("href" in props && props.href) {
    const {
      variant = "primary",
      size = "md",
      className,
      leftIcon,
      rightIcon,
      children,
      href,
      external,
      ...anchor
    } = props;

    const content = (
      <>
        {leftIcon}
        <span>{children}</span>
        {rightIcon}
      </>
    );

    const isExternal = external ?? /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes(variant, size, className)}
          target="_blank"
          rel="noopener noreferrer"
          {...anchor}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes(variant, size, className)} {...anchor}>
        {content}
      </Link>
    );
  }

  const {
    variant = "primary",
    size = "md",
    className,
    leftIcon,
    rightIcon,
    children,
    ...rest
  } = props as ButtonProps;

  return (
    <button className={classes(variant, size, className)} {...rest}>
      {leftIcon}
      <span>{children}</span>
      {rightIcon}
    </button>
  );
}
