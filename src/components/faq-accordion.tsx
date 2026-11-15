import { ChevronDown } from "lucide-react";

import type { FaqItem } from "@/src/features/home/types";

type FaqAccordionProps = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <details
          className="group border-border bg-card rounded-md border px-5 sm:px-7"
          key={item.question}
        >
          <summary className="font-heading text-brand-navy focus-visible:outline-brand-navy flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-base font-semibold marker:content-none focus-visible:outline-2 focus-visible:outline-offset-4 sm:text-lg">
            {item.question}
            <ChevronDown
              aria-hidden="true"
              className="text-brand-bronze size-5 shrink-0 transition-transform group-open:rotate-180"
            />
          </summary>
          <p className="text-brand-slate max-w-3xl pr-8 pb-5 leading-7">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
