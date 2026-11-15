import type { Metadata } from "next";
import Link from "next/link";
import { BriefcaseBusiness, ChevronRight } from "lucide-react";

import { SectionHeading } from "@/src/components/section-heading";
import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";
import type { ListingFilters } from "@/src/features/listings/types";
import {
  getBusinessListings,
  getListingOption,
  getListingOptions,
} from "./data";
import { ListingCard } from "./listing-card";
import { BuyerCriteriaForm, ListingSearchAlertForm } from "./lead-forms";
import {
  ListingFilterSidebar,
  ListingPagination,
  ListingToolbar,
} from "./listing-controls";
import { parseListingFilters, parseRequestedListing } from "./search-params";

export const metadata: Metadata = {
  title: "Businesses for Sale | Business Broker World",
  description:
    "Explore confidential business opportunities across Sarasota, Bradenton, and Southwest Florida.",
};

function getTotalPages(total: number) {
  return Math.max(1, Math.ceil(total / 9));
}

export default async function BusinessesForSalePage(
  props: PageProps<"/businesses-for-sale">,
) {
  const searchParams = await props.searchParams;
  const filters: ListingFilters = parseListingFilters(searchParams);
  const requestedListing = parseRequestedListing(searchParams);
  const [result, listingOptions, targetListing] = await Promise.all([
    getBusinessListings(filters),
    getListingOptions(),
    getListingOption(requestedListing),
  ]);
  const totalPages = getTotalPages(result.total);
  const cardsClassName =
    filters.view === "list"
      ? "grid gap-4"
      : "grid gap-5 sm:grid-cols-2 xl:grid-cols-3";

  return (
    <>
      <SiteHeader />
      <main className="bg-brand-offwhite flex-1 pb-16">
        <section className="mx-auto max-w-[1440px] px-5 pt-8 sm:px-8 sm:pt-10 lg:px-10">
          <nav aria-label="Breadcrumb" className="text-brand-slate mb-6 text-sm">
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
              <li>
                <span className="text-brand-navy font-semibold">Buy a Business</span>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-4" />
              </li>
              <li aria-current="page">Southwest Florida Listings</li>
            </ol>
          </nav>
          <SectionHeading
            description="Explore confidential acquisitions, profitable commercial enterprises, and established businesses across Sarasota, Bradenton, Lakewood Ranch, and Tampa Bay."
            eyebrow="Southwest Florida opportunities"
            headingLevel="h1"
            title="Businesses for Sale in Southwest Florida"
          />
        </section>

        <section
          aria-label="Available business opportunities"
          className="mt-8"
        >
          <ListingToolbar
            categories={result.categories}
            total={result.total}
          />
          <div className="mx-auto grid max-w-[1440px] gap-6 px-5 sm:px-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:px-10">
            <ListingFilterSidebar categories={result.categories} />
            <div className="min-w-0">
              {result.items.length > 0 ? (
                <ul className={cardsClassName}>
                  {result.items.map((listing) => (
                    <li key={listing.id}>
                      <ListingCard listing={listing} />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="border-border bg-card rounded-lg border p-8 text-center">
                  <BriefcaseBusiness
                    aria-hidden="true"
                    className="text-brand-bronze mx-auto size-9"
                  />
                  <h2 className="font-heading text-brand-navy mt-4 text-xl font-semibold">
                    No opportunities match those filters
                  </h2>
                  <p className="text-brand-slate mt-2 text-sm leading-6">
                    Adjust your search or clear the filters to see available
                    opportunities.
                  </p>
                </div>
              )}
              {result.items.length > 0 ? (
                <ListingPagination
                  page={result.page}
                  totalPages={totalPages}
                />
              ) : null}
            </div>
          </div>
        </section>

        <div className="mx-auto mt-10 max-w-[1440px] space-y-10 px-5 sm:px-8 lg:px-10">
          <ListingSearchAlertForm filters={filters} />
          <BuyerCriteriaForm
            listings={listingOptions}
            target={targetListing}
          />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
