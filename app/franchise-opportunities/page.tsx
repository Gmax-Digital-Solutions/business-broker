import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ChevronRight,
  Coffee,
  Globe2,
  MapPin,
  MessagesSquare,
  RefreshCw,
  ShieldCheck,
  Store,
  Users,
} from "lucide-react";

import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";
import {
  franchisePathways,
  type FranchiseFilters,
} from "@/src/features/franchise/types";
import { FranchiseDiagnostic } from "./diagnostic";
import { getFranchisePageData } from "./data";
import {
  FranchiseOpportunityFilterSidebar,
  FranchiseOpportunityPagination,
  FranchiseOpportunityToolbar,
} from "./filters-controls";
import { FranchiseStrategyForm } from "./lead-form";
import { FranchiseOpportunityCard } from "./opportunity-card";
import { parseFranchiseFilters } from "./search-params";

export const metadata: Metadata = {
  title: "Franchise Opportunities | Business Broker World",
  description:
    "Explore franchise resales, new locations, conversions, and development pathways across Southwest Florida.",
};

const pathwayIcons = {
  CONSULTING: MessagesSquare,
  SINGLE_UNIT: Store,
  MASTER_FRANCHISE: Globe2,
  AREA_DEVELOPMENT: Users,
  RESALE: Coffee,
  CONVERSION: RefreshCw,
} as const;

function getPathwayHref(filters: FranchiseFilters, pathway: string) {
  const search = new URLSearchParams();
  if (filters.query) search.set("q", filters.query);
  if (filters.sector) search.set("sector", filters.sector);
  if (filters.market) search.set("market", filters.market);
  search.set("pathway", filters.pathway === pathway ? "" : pathway);

  const query = search.toString();
  return `/franchise-opportunities${query ? `?${query}` : ""}#franchise-opportunities`;
}

export default async function FranchiseOpportunitiesPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = await props.searchParams;
  const filters = parseFranchiseFilters(searchParams);
  const result = await getFranchisePageData(filters);
  const selectedPathway = filters.pathway || undefined;

  return (
    <>
      <SiteHeader />
      <main className="bg-brand-offwhite flex-1 pb-16">
        <section className="bg-secondary">
          <div className="mx-auto max-w-[1440px] px-5 pt-7 pb-8 sm:px-8 sm:pt-10 sm:pb-10 lg:px-10">
            <nav aria-label="Breadcrumb" className="text-brand-slate mb-7 text-sm">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link
                    className="hover:text-brand-navy focus-visible:outline-brand-navy rounded-sm focus-visible:outline-2"
                    href="/"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="size-4" />
                </li>
                <li aria-current="page" className="text-brand-navy font-semibold">
                  Franchise opportunities
                </li>
              </ol>
            </nav>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] lg:items-end">
              <div>
                <p className="bg-card text-brand-bronze inline-flex items-center gap-2 rounded-sm px-3 py-2 text-[0.65rem] font-bold tracking-[0.14em] uppercase">
                  <span
                    aria-hidden="true"
                    className="bg-brand-gold size-2 rounded-full"
                  />
                  Franchise pathways &amp; advisory
                </p>
                <h1 className="font-heading text-brand-navy mt-4 max-w-3xl text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
                  Explore Franchise Opportunities in Southwest Florida
                </h1>
                <p className="text-brand-slate mt-4 max-w-3xl text-sm leading-6 sm:text-base sm:leading-7">
                  Compare ways to enter franchising—from an existing resale to
                  a new location or territory. Start with your goals, then
                  explore public summaries and ask about appropriate next steps.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    className="bg-brand-navy text-primary-foreground hover:bg-brand-navy/90 focus-visible:outline-brand-bronze inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                    href="#franchise-diagnostic"
                  >
                    Find your starting point
                    <ArrowDown aria-hidden="true" className="size-4" />
                  </Link>
                  <Link
                    className="border-border bg-card text-brand-navy hover:border-brand-navy focus-visible:outline-brand-navy inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-5 py-2 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                    href="#franchise-opportunities"
                  >
                    Explore opportunities
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              </div>

              <div className="border-border bg-card rounded-lg border p-5 sm:p-6">
                <p className="text-brand-bronze font-heading text-xs font-bold tracking-[0.14em] uppercase">
                  Start with a clear picture
                </p>
                <h2 className="font-heading text-brand-navy mt-2 text-xl font-semibold">
                  Match a pathway to your plans
                </h2>
                <ul className="mt-4 space-y-3">
                  {[
                    "Compare ownership and development structures",
                    "Consider location, operating role, and timing",
                    "Review public summaries without financial promises",
                  ].map((item) => (
                    <li
                      className="text-brand-slate flex items-start gap-2 text-sm leading-5"
                      key={item}
                    >
                      <ShieldCheck
                        aria-hidden="true"
                        className="text-brand-bronze mt-0.5 size-4 shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-label="Franchise advisory focus"
          className="border-border bg-card border-b"
        >
          <ul className="mx-auto grid max-w-[1440px] grid-cols-2 divide-x divide-y divide-border px-5 sm:px-8 md:grid-cols-4 md:divide-y-0 lg:px-10">
            {[
              "Resale & new development",
              "Single & multi-unit paths",
              "Southwest Florida focus",
              "Diligence-led discussions",
            ].map((item) => (
              <li
                className="text-brand-navy flex min-h-20 items-center gap-3 px-3 py-4 text-xs font-semibold leading-5 sm:px-5 sm:text-sm"
                key={item}
              >
                <MapPin
                  aria-hidden="true"
                  className="text-brand-bronze size-4 shrink-0"
                />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="franchise-pathways-heading"
          className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16"
        >
          <div className="flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-brand-bronze font-heading text-xs font-bold tracking-[0.16em] uppercase">
                Explore your options
              </p>
              <h2
                className="font-heading text-brand-navy mt-2 text-3xl leading-tight font-semibold sm:text-4xl"
                id="franchise-pathways-heading"
              >
                Six pathways into franchising
              </h2>
            </div>
            <p className="text-brand-slate max-w-lg text-sm leading-6">
              Each path comes with different obligations and diligence
              questions. Select one to view matching public summaries.
            </p>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {franchisePathways.map((pathway, index) => {
              const Icon = pathwayIcons[pathway.value];
              const active = selectedPathway === pathway.value;

              return (
                <li key={pathway.value}>
                  <Link
                    aria-current={active ? "page" : undefined}
                    className={`group flex h-full min-h-52 flex-col rounded-lg border p-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy ${active ? "border-brand-gold bg-card" : "border-border bg-card hover:border-brand-bronze"}`}
                    href={getPathwayHref(filters, pathway.value)}
                    prefetch={false}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="bg-secondary text-brand-navy inline-flex size-10 items-center justify-center rounded-sm">
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <span className="text-brand-bronze text-xs font-bold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-heading text-brand-navy mt-5 text-lg font-semibold">
                      {pathway.label}
                    </h3>
                    <p className="text-brand-slate mt-2 text-sm leading-5">
                      {pathway.description}
                    </p>
                    <span className="text-brand-bronze mt-auto inline-flex min-h-11 items-center gap-2 pt-3 text-sm font-semibold">
                      {active ? "Showing this pathway" : "Explore pathway"}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-8 lg:px-10">
          <FranchiseDiagnostic />
        </section>

        <section
          aria-labelledby="featured-franchise-heading"
          className="bg-card border-y border-border py-12 sm:py-14 lg:py-16"
        >
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-brand-bronze font-heading text-xs font-bold tracking-[0.16em] uppercase">
                  Public opportunity summaries
                </p>
                <h2
                  className="font-heading text-brand-navy mt-2 text-3xl leading-tight font-semibold sm:text-4xl"
                  id="featured-franchise-heading"
                >
                  Explore franchise opportunities
                </h2>
              </div>
              <a
                className="text-brand-bronze focus-visible:outline-brand-navy inline-flex min-h-11 items-center gap-2 text-sm font-semibold focus-visible:outline-2"
                href="#franchise-opportunities"
              >
                View all opportunities
                <ArrowDown aria-hidden="true" className="size-4" />
              </a>
            </div>
            <p className="text-brand-slate mb-5 max-w-3xl text-sm leading-6">
              Review public summaries only. Brand identity, financial
              performance, fees, and other confidential details are not shown
              or sent to the browser.
            </p>
            {result.featured.length > 0 ? (
              <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {result.featured.map((opportunity) => (
                  <li key={opportunity.id}>
                    <FranchiseOpportunityCard opportunity={opportunity} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="border-border bg-brand-offwhite text-brand-slate rounded-lg border p-6 text-sm leading-6">
                No verified featured franchise opportunities are currently
                available. Share your goals to discuss possible next steps.
              </p>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <FranchiseStrategyForm />
        </section>

        <section
          aria-labelledby="franchise-opportunities-heading"
          className="border-y border-border bg-card py-12 sm:py-14 lg:py-16"
          id="franchise-opportunities"
        >
          <div className="mx-auto max-w-[1440px]">
            <div className="px-5 sm:px-8 lg:px-10">
              <p className="text-brand-bronze font-heading text-xs font-bold tracking-[0.16em] uppercase">
                Current opportunities
              </p>
              <h2
                className="font-heading text-brand-navy mt-2 text-3xl leading-tight font-semibold sm:text-4xl"
                id="franchise-opportunities-heading"
              >
                Franchise opportunities to explore
              </h2>
              <p className="text-brand-slate mt-3 max-w-3xl text-sm leading-6">
                Listings are subject to availability, verification, diligence,
                and any applicable franchisor approval.
              </p>
              {result.isPreview ? (
                <p className="border-brand-gold bg-secondary text-brand-navy mt-4 rounded-sm border-l-2 px-3 py-2 text-xs font-semibold">
                  Design preview only — these illustrative cards are not
                  verified franchise opportunities or current offerings.
                </p>
              ) : null}
            </div>

            <div className="mt-7">
              <FranchiseOpportunityToolbar
                filters={filters}
                total={result.total}
              />
              <div className="grid gap-6 px-5 sm:px-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:px-10">
                <FranchiseOpportunityFilterSidebar />
                <div className="min-w-0">
                  {result.items.length > 0 ? (
                    <ul className="grid gap-5 md:grid-cols-2">
                      {result.items.map((opportunity) => (
                        <li key={opportunity.id}>
                          <FranchiseOpportunityCard opportunity={opportunity} />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="border-border bg-brand-offwhite rounded-lg border p-8 text-center">
                      <Store
                        aria-hidden="true"
                        className="text-brand-bronze mx-auto size-9"
                      />
                      <h3 className="font-heading text-brand-navy mt-4 text-xl font-semibold">
                        No opportunities match those filters
                      </h3>
                      <p className="text-brand-slate mt-2 text-sm leading-6">
                        Adjust your search or request a strategy conversation to
                        discuss your goals.
                      </p>
                    </div>
                  )}
                  {result.items.length > 0 ? (
                    <FranchiseOpportunityPagination
                      page={result.page}
                      totalPages={result.totalPages}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 pt-8 sm:px-8 lg:px-10">
          <div className="border-border bg-secondary flex flex-col gap-4 rounded-lg border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <p className="text-brand-slate flex items-start gap-2 text-xs leading-5">
              <ShieldCheck
                aria-hidden="true"
                className="text-brand-bronze mt-0.5 size-4 shrink-0"
              />
              Franchise information is for discussion only, not an offer or
              guarantee. Review the Franchise Disclosure Document and consult
              qualified legal, tax, and financial professionals.
            </p>
            <Link
              className="border-border bg-card text-brand-navy hover:border-brand-navy focus-visible:outline-brand-navy inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md border px-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
              href="/contact"
              prefetch={false}
            >
              Contact an advisor
              <ChevronRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
