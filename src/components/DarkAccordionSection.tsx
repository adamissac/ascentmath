"use client";

import type { ReactNode } from "react";
import type { AccordionItem } from "../data/dark-sections";
import ColorBand from "./ColorBand";
import FaqAccordion from "./FaqAccordion";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export type { AccordionItem };

/**
 * Dark FAQ band — only rendered when `lightSectionBelow` is provided so the page
 * does not stack two dark sections in a row (e.g. study tips + book CTA).
 */
export default function DarkAccordionSection({
  eyebrow,
  title,
  description,
  items,
  containerSize = "md",
  size = "md",
  lightSectionBelow,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  items: AccordionItem[];
  containerSize?: "sm" | "md" | "lg" | "xl";
  size?: "sm" | "md" | "lg" | "xl";
  /** Light/muted section that must follow the dark band (omit to hide the dark band). */
  lightSectionBelow: ReactNode;
}) {
  if (!lightSectionBelow) return null;

  return (
    <>
      {items.length > 0 && (
        <ColorBand variant="dark" size={size} containerSize={containerSize} reveal={false}>
          <Reveal>
            <SectionHeader
              eyebrow={eyebrow}
              title={title}
              description={description}
              align="center"
              dark
            />
          </Reveal>
          <Reveal stagger className="mt-10 grid gap-5 sm:grid-cols-2">
            {items.map((item) => (
              <FaqAccordion key={item.q} question={item.q} answer={item.a} />
            ))}
          </Reveal>
        </ColorBand>
      )}
      {lightSectionBelow}
    </>
  );
}
