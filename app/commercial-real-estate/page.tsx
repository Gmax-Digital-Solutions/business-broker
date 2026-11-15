import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Building2,
  ChevronRight,
  Factory,
  Landmark,
  MapPin,
  ShieldCheck,
  Store,
  Warehouse,
} from "lucide-react";

import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";
import {
  commercialPropertyTypes,
  type CommercialFilters,
} from "@/src/features/commercial/types";
import { getCommercialPageData } from "./data";
import {
  CommercialPropertyFilterSidebar,
  CommercialPropertyPagination,
  CommercialPropertyToolbar,
} from "./filters-controls";
import { CommercialInquiryForm } from "./lead-form";
import { CommercialMarketInsight, CommercialTrustStrip } from "./market-insight";
import { CommercialPropertyCard } from "./property-card";
import { parseCommercialFilters } from "./search-params";

export const metadata: Metadata = {
  title: "Commercial Real Estate | Business Broker World",
  description:
    "Explore commercial property opportunities and request information across Sarasota, Manatee, and Southwest Florida.",
};

const propertyIcons = {
  MULTIFAMILY: Building2,
  OFFICE: Landmark,
  INDUSTRIAL: Warehouse,
  RETAIL: Store,
  LAND: MapPin,
  OTHER: Factory,
} as const;

const availableCategories = [
  "MULTIFAMILY",
  "OFFICE",
  "INDUSTRIAL",
  "RETAIL",
  "LAND",
] as const;

function isCommercialPropertyType(
  value: string,
): value is (typeof commercialPropertyTypes)[number]["value"] {
  return commercialPropertyTypes.some((option) => option.value === value);
}

function getCategoryHref(
  filters: CommercialFilters,
  propertyType: (typeof commercialPropertyTypes)[number]["value"],
) {
  const search = new URLSearchParams();
  if (filters.query) search.set("q", filters.query);
  if (filters.area) search.set("area", filters.area);
  if (filters.transaction) search.set("transaction", filters.transaction);
  if (filters.minArea !== undefined) {
    search.set("minArea", String(filters.minArea));
  }
  if (filters.maxArea !== undefined) {
    search.set("maxArea", String(filters.maxArea));
  }
  if (filters.sort !== "featured") search.set("sort", filters.sort);
  search.set(
    "propertyType",
    filters.propertyType === propertyType ? "" : propertyType,
  );

  const query = search.toString();
  return `/commercial-real-estate${query ? `?${query}` : ""}`;
}

export default async function CommercialRealEstatePage(
  props: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
  },
) {
  const searchParams = await props.searchParams;
  const filters = parseCommercialFilters(searchParams);
  const result = await getCommercialPageData(filters);
  const selectedCategory = isCommercialPropertyType(filters.propertyType)
    ? filters.propertyType
    : undefined;

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
                  Commercial Real Estate
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
                  Commercial property &amp; asset advisory
                </p>
                <h1 className="font-heading text-brand-navy mt-4 max-w-3xl text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
                  Commercial Real Estate in Southwest Florida
                </h1>
                <p className="text-brand-slate mt-4 max-w-3xl text-sm leading-6 sm:text-base sm:leading-7">
                  Explore commercial property opportunities across Sarasota and
                  Manatee counties. Search public property summaries or share
                  your requirements for an advisor to follow up.
                </p>
                <p className="text-brand-slate mt-3 text-xs leading-5">
                  Property availability, transaction terms, and financing are
                  subject to verification and lender approval.
                </p>
              </div>
              <form
                action="/commercial-real-estate"
                className="border-border bg-card grid gap-3 rounded-lg border p-4 sm:grid-cols-2 lg:grid-cols-2"
                method="get"
              >
                {filters.query ? (
                  <input name="q" type="hidden" value={filters.query} />
                ) : null}
                <label className="text-brand-slate text-xs font-semibold">
                  Property classification
                  <select
                    className="border-input bg-card text-brand-navy mt-1 min-h-11 w-full rounded-md border px-3 text-sm"
                    defaultValue={filters.propertyType}
                    name="propertyType"
                  >
                    <option value="">All property types</option>
                    {commercialPropertyTypes.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-brand-slate text-xs font-semibold">
                  County / submarket
                  <select
                    className="border-input bg-card text-brand-navy mt-1 min-h-11 w-full rounded-md border px-3 text-sm"
                    defaultValue={filters.area}
                    name="area"
                  >
                    <option value="">All Southwest Florida</option>
                    <option value="sarasota">Sarasota County</option>
                    <option value="manatee">Manatee County</option>
                    <option value="southwest-florida">Southwest Florida</option>
                  </select>
                </label>
                <label className="text-brand-slate text-xs font-semibold">
                  Transaction type
                  <select
                    className="border-input bg-card text-brand-navy mt-1 min-h-11 w-full rounded-md border px-3 text-sm"
                    defaultValue={filters.transaction}
                    name="transaction"
                  >
                    <option value="">Sale or lease</option>
                    <option value="SALE">For sale</option>
                    <option value="LEASE">For lease</option>
                  </select>
                </label>
                <button
                  className="bg-brand-navy text-primary-foreground hover:bg-brand-navy/90 focus-visible:outline-brand-bronze mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                  type="submit"
                >
                  Find properties
                  <ArrowRight aria-hidden="true" className="size-4" />
                </button>
              </form>
            </div>
          </div>
        </section>

        <CommercialTrustStrip />

        <section
          aria-labelledby="commercial-categories-heading"
          className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16"
        >
          <div className="flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-brand-bronze font-heading text-xs font-bold tracking-[0.16em] uppercase">
                Asset spectrum
              </p>
              <h2
                className="font-heading text-brand-navy mt-2 text-3xl leading-tight font-semibold sm:text-4xl"
                id="commercial-categories-heading"
              >
                Core Southwest Florida Commercial Categories
              </h2>
            </div>
            <p className="text-brand-slate max-w-lg text-sm leading-6">
              Select an asset class to explore matching public summaries.
              Listings are subject to availability and verification.
            </p>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {commercialPropertyTypes
              .filter((category) =>
                availableCategories.some((value) => value === category.value),
              )
              .map((category, index) => {
                const Icon = propertyIcons[category.value];
                const active = selectedCategory === category.value;

                return (
                  <li key={category.value}>
                    <Link
                      aria-current={active ? "page" : undefined}
                      className={`group flex h-full min-h-52 flex-col rounded-lg border p-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy ${active ? "border-brand-gold bg-brand-offwhite" : "border-border bg-card hover:border-brand-bronze"}`}
                      href={getCategoryHref(filters, category.value)}
                      prefetch={false}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="bg-secondary text-brand-navy inline-flex size-10 items-center justify-center rounded-sm">
                          <Icon aria-hidden="true" className="size-5" />
                        </span>
                        <span className="text-brand-bronze text-xs font-bold">
                          {index + 1 < 10 ? `0${index + 1}` : index + 1}
                        </span>
                      </div>
                      <h3 className="font-heading text-brand-navy mt-5 text-lg font-semibold">
                        {category.label}
                      </h3>
                      <p className="text-brand-slate mt-2 text-sm leading-5">
                        {category.description}
                      </p>
                      <span className="text-brand-bronze mt-auto inline-flex min-h-11 items-center gap-2 pt-3 text-sm font-semibold">
                        {active ? "Showing this category" : "Explore category"}
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

        <section
          aria-labelledby="featured-commercial-heading"
          className="bg-card border-y border-border py-12 sm:py-14 lg:py-16"
        >
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-brand-bronze font-heading text-xs font-bold tracking-[0.16em] uppercase">
                  Confidential opportunities
                </p>
                <h2
                  className="font-heading text-brand-navy mt-2 text-3xl leading-tight font-semibold sm:text-4xl"
                  id="featured-commercial-heading"
                >
                  Commercial opportunities
                </h2>
              </div>
              <a
                className="text-brand-bronze focus-visible:outline-brand-navy inline-flex min-h-11 items-center gap-2 text-sm font-semibold focus-visible:outline-2"
                href="#commercial-inventory"
              >
                View all opportunities
                <ArrowDown aria-hidden="true" className="size-4" />
              </a>
            </div>
            {result.featured.length > 0 ? (
              <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {result.featured.map((property) => (
                  <li key={property.id}>
                    <CommercialPropertyCard featured property={property} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="border-border bg-brand-offwhite text-brand-slate rounded-lg border p-6 text-sm leading-6">
                No verified featured commercial properties are currently
                available. Send an inquiry to discuss your search.
              </p>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <CommercialInquiryForm />
        </section>

        <section
          aria-labelledby="commercial-inventory-heading"
          className="border-y border-border bg-card py-12 sm:py-14 lg:py-16"
          id="commercial-inventory"
        >
          <div className="mx-auto max-w-[1440px]">
            <div className="px-5 sm:px-8 lg:px-10">
              <nav
                aria-label="Breadcrumb"
                className="text-brand-slate mb-5 text-xs"
              >
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link className="hover:text-brand-navy" href="/commercial-real-estate">
                      Commercial Real Estate
                    </Link>
                  </li>
                  <li aria-hidden="true">
                    <ChevronRight className="size-3.5" />
                  </li>
                  <li className="text-brand-bronze font-semibold">
                    Property opportunities
                  </li>
                </ol>
              </nav>
              <p className="text-brand-bronze font-heading text-xs font-bold tracking-[0.16em] uppercase">
                Property opportunities
              </p>
              <h2
                className="font-heading text-brand-navy mt-2 text-3xl leading-tight font-semibold sm:text-4xl"
                id="commercial-inventory-heading"
              >
                Commercial properties for sale &amp; lease
              </h2>
              <p className="text-brand-slate mt-3 max-w-3xl text-sm leading-6">
                Review public property summaries. Addresses, pricing, and
                financial or operating details are withheld from public
                listings and are not passed to client components.
              </p>
              {result.isPreview ? (
                <p className="border-brand-gold bg-secondary text-brand-navy mt-4 rounded-sm border-l-2 px-3 py-2 text-xs font-semibold">
                  Design preview only — these illustrative cards are not
                  verified properties or current offerings.
                </p>
              ) : null}
            </div>

            <div className="mt-7">
              <CommercialPropertyToolbar
                filters={filters}
                total={result.total}
              />
              <div className="grid gap-6 px-5 sm:px-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:px-10">
                <CommercialPropertyFilterSidebar />
                <div className="min-w-0">
                  {result.items.length > 0 ? (
                    <ul className="grid gap-5 md:grid-cols-2">
                      {result.items.map((property) => (
                        <li key={property.id}>
                          <CommercialPropertyCard property={property} />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="border-border bg-brand-offwhite rounded-lg border p-8 text-center">
                      <Factory
                        aria-hidden="true"
                        className="text-brand-bronze mx-auto size-9"
                      />
                      <h3 className="font-heading text-brand-navy mt-4 text-xl font-semibold">
                        No properties match those filters
                      </h3>
                      <p className="text-brand-slate mt-2 text-sm leading-6">
                        Adjust your search or send an inquiry to discuss
                        properties that may meet your requirements.
                      </p>
                    </div>
                  )}
                  {result.items.length > 0 ? (
                    <CommercialPropertyPagination
                      page={result.page}
                      totalPages={result.totalPages}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        <CommercialMarketInsight />

        <section className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-8 lg:px-10">
          <div className="border-border bg-secondary flex flex-col gap-4 rounded-lg border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <p className="text-brand-slate flex items-start gap-2 text-xs leading-5">
              <ShieldCheck
                aria-hidden="true"
                className="text-brand-bronze mt-0.5 size-4 shrink-0"
              />
              Property descriptions are informational, not appraisals or
              guarantees. Confirm property, zoning, financial, and legal
              information with qualified professionals.
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
