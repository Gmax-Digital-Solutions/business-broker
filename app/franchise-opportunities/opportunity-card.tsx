import Link from "next/link";
import { ArrowUpRight, LockKeyhole, MapPin, Store } from "lucide-react";

import type { PublicFranchiseOpportunity } from "@/src/features/franchise/types";
import {
  franchiseMarkets,
  franchisePathways,
  franchiseSectors,
} from "@/src/features/franchise/types";

export function FranchiseOpportunityCard({
  opportunity,
}: {
  opportunity: PublicFranchiseOpportunity;
}) {
  const pathway = franchisePathways.find(
    (option) => option.value === opportunity.pathway,
  );
  const sector = franchiseSectors.find(
    (option) => option.value === opportunity.sector,
  );
  const market = franchiseMarkets.find(
    (option) => option.value === opportunity.market,
  );

  return (
    <article className="border-border bg-card flex h-full flex-col overflow-hidden rounded-lg border">
      <div className="bg-gradient-to-br from-brand-navy via-brand-navy to-brand-slate text-primary-foreground relative flex min-h-36 items-start justify-between gap-4 p-5">
        <Store
          aria-hidden="true"
          className="text-brand-gold size-10 shrink-0"
          strokeWidth={1.4}
        />
        {opportunity.illustrative ? (
          <span className="bg-brand-offwhite text-brand-bronze rounded-sm px-2 py-1 text-[0.65rem] font-bold tracking-wider uppercase">
            Illustrative preview
          </span>
        ) : null}
        <p className="text-brand-gold absolute right-4 bottom-3 left-4 truncate text-[0.65rem] font-bold tracking-[0.12em] uppercase">
          {sector?.label ?? "Franchise opportunity"}
        </p>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2">
          <span className="bg-secondary text-brand-bronze rounded-sm px-2 py-1 text-xs font-semibold">
            {pathway?.label ?? "Franchise"}
          </span>
          <span className="text-brand-slate inline-flex items-center gap-1 text-xs">
            <MapPin aria-hidden="true" className="size-3.5" />
            {market?.label ?? "Southwest Florida"}
          </span>
        </div>
        <h3 className="font-heading text-brand-navy mt-3 text-lg leading-snug font-semibold">
          {opportunity.title}
        </h3>
        <p className="text-brand-slate mt-2 text-sm leading-6">
          {opportunity.summary}
        </p>
        <p className="text-brand-slate mt-4 flex items-start gap-2 text-xs leading-5">
          <LockKeyhole
            aria-hidden="true"
            className="text-brand-bronze mt-0.5 size-3.5 shrink-0"
          />
          Brand identity and financial details are not shown. Requests do not
          guarantee access or availability.
        </p>
        <Link
          className="bg-brand-bronze text-primary-foreground hover:bg-brand-bronze/90 focus-visible:outline-brand-navy mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          href="#franchise-strategy"
        >
          Discuss this pathway
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </article>
  );
}
