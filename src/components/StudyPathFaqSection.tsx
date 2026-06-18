import type { ReactNode } from "react";
import type { AccordionItem } from "../data/dark-sections";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import FaqAccordion from "./FaqAccordion";
import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  items: AccordionItem[];
  containerSize?: "sm" | "md" | "lg" | "xl";
  children?: ReactNode;
};

/** Light FAQ band for study-path pages (replaces dark accordion sections). */
export default function StudyPathFaqSection({
  eyebrow,
  title,
  description,
  items,
  containerSize = "xl",
  children,
}: Props) {
  return (
    <>
      {items.length > 0 && (
        <Section
          tone="default"
          size="sm"
          containerSize={containerSize}
          reveal={false}
        >
          <Reveal>
            <SectionHeader
              eyebrow={eyebrow}
              title={title}
              description={description}
              align="center"
            />
          </Reveal>
          <Reveal stagger className="mt-8 grid gap-3 sm:grid-cols-2">
            {items.map((item) => (
              <FaqAccordion key={item.q} variant="light" question={item.q} answer={item.a} />
            ))}
          </Reveal>
        </Section>
      )}
      {children}
    </>
  );
}
