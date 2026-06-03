"use client";

import type { ComponentProps } from "react";
import HashLink from "./HashLink";
import { STUDY_PATHS_HREF } from "../lib/site-paths";

type Props = Omit<ComponentProps<typeof HashLink>, "href"> & { href?: string };

/** Link to the homepage #study-paths section (works from any route). */
export default function StudyPathsLink({ href = STUDY_PATHS_HREF, ...rest }: Props) {
  return <HashLink href={href} {...rest} />;
}
