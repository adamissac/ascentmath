"use client";

import type { ComponentProps } from "react";
import HashLink from "./HashLink";
import { BOOK_SESSION_HREF } from "../lib/site-paths";

type Props = Omit<ComponentProps<typeof HashLink>, "href"> & { href?: string };

/** Smooth-scroll link to the homepage booking form. */
export default function BookSessionLink({ href = BOOK_SESSION_HREF, ...rest }: Props) {
  return <HashLink href={href} {...rest} />;
}
