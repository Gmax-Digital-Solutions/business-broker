import { ArrowUpRight, BriefcaseBusiness } from "lucide-react";

import type { investorVisaPathways } from "@/src/features/investor-visas/types";

type VisaPathway = (typeof investorVisaPathways)[number];

export function InvestorVisaPathwayCard({
  pathway,
}: {
  pathway: VisaPathway;
}) {
  return (
    <article className="border-border bg-card flex h-full flex-col rounded-lg border p-5 sm:p-6">
      <div className="bg-secondary text-brand-navy inline-flex size-10 items-center justify-center rounded-sm">
        <BriefcaseBusiness aria-hidden="true" className="size-5" />
      </div>
      <h3 className="font-heading text-brand-navy mt-4 text-xl font-semibold">
        {pathway.label}
      </h3>
      <p className="text-brand-slate mt-2 text-sm leading-6">
        {pathway.summary}
      </p>
      <p className="border-border text-brand-slate mt-4 border-t pt-4 text-xs leading-5">
        {pathway.detail}
      </p>
      <a
        className="text-brand-bronze focus-visible:outline-brand-navy mt-auto inline-flex min-h-11 items-center gap-2 pt-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
        href={pathway.url}
        rel="noreferrer"
        target="_blank"
      >
        Read the USCIS overview
        <span className="sr-only">(opens in a new tab)</span>
        <ArrowUpRight aria-hidden="true" className="size-4" />
      </a>
    </article>
  );
}
