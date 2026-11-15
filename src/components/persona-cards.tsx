import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Search } from "lucide-react";

import type { PersonaItem } from "@/src/features/home/types";

type PersonaCardsProps = {
  items: PersonaItem[];
};

export function PersonaCards({ items }: PersonaCardsProps) {
  return (
    <section aria-label="Business owner and buyer advisory">
      <ul className="grid gap-5 md:grid-cols-2 md:gap-6">
        {items.map((item) => {
          const Icon = item.icon === "sell" ? BriefcaseBusiness : Search;

          return (
            <li
              className="border-border bg-card rounded-lg border p-6 shadow-sm sm:p-8"
              key={item.title}
            >
              <div className="bg-brand-offwhite text-brand-bronze mb-6 flex size-12 items-center justify-center rounded-full">
                <Icon aria-hidden="true" className="size-6" />
              </div>
              <p className="text-brand-bronze mb-2 text-xs font-bold tracking-[0.14em] uppercase">
                {item.eyebrow}
              </p>
              <h2 className="font-heading text-brand-navy text-2xl font-semibold tracking-tight sm:text-3xl">
                {item.title}
              </h2>
              <p className="text-brand-slate mt-3 max-w-xl leading-7">
                {item.description}
              </p>
              <Link
                className="text-brand-navy decoration-brand-gold hover:text-brand-bronze focus-visible:outline-brand-navy mt-6 inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-2 underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
                href={item.href}
                prefetch={false}
              >
                {item.linkLabel}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
