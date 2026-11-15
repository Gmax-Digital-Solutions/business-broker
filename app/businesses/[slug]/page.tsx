import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Anchor,
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  Check,
  ChevronRight,
  LockKeyhole,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { ListingCard } from "@/app/businesses-for-sale/listing-card";
import { BuyerCriteriaForm } from "@/app/businesses-for-sale/lead-forms";
import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";
import type { ListingOption } from "@/src/features/listings/types";
import {
  getPublicBusinessListing,
  getRelatedPublicBusinessListings,
} from "./data";

export const metadata: Metadata = {
  title: "Confidential Business Listing | Business Broker World",
  description:
    "Review public information about this Southwest Florida business opportunity and request qualified access to confidential materials.",
};

const confidentialMaterials = [
  "Financial summaries and historical performance",
  "Business operations, assets, and equipment",
  "Lease, property, and transition information",
];

export default async function BusinessListingDetailPage(
  props: PageProps<"/businesses/[slug]">,
) {
  const { slug } = await props.params;
  const listing = await getPublicBusinessListing(slug);

  if (!listing) {
    notFound();
  }

  const [relatedListings] = await Promise.all([
    getRelatedPublicBusinessListings(listing.slug),
  ]);
  const target: ListingOption = {
    slug: listing.slug,
    title: listing.title,
  };

  return (
    <>
      <SiteHeader />
      <main className="bg-brand-offwhite flex-1 pb-16">
        <div className="mx-auto max-w-[1440px] px-5 pt-6 sm:px-8 sm:pt-8 lg:px-10">
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
                <Link
                  className="hover:text-brand-navy focus-visible:outline-brand-navy rounded-sm focus-visible:outline-2"
                  href="/businesses-for-sale"
                >
                  Businesses for sale
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-4" />
              </li>
              <li aria-current="page" className="text-brand-navy font-semibold">
                Listing details
              </li>
            </ol>
          </nav>

          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="bg-brand-navy text-primary-foreground inline-flex min-h-7 items-center gap-1.5 rounded-sm border-l-2 border-brand-gold px-2.5 text-[0.65rem] font-bold tracking-[0.12em] uppercase">
              <LockKeyhole aria-hidden="true" className="size-3.5" />
              Confidential opportunity
            </span>
            {listing.credentials ? (
              <span className="border-border bg-card text-brand-navy inline-flex min-h-7 items-center gap-1.5 rounded-sm border px-2.5 text-[0.65rem] font-bold tracking-[0.08em] uppercase">
                <BadgeCheck
                  aria-hidden="true"
                  className="text-brand-bronze size-3.5"
                />
                {listing.credentials}
              </span>
            ) : null}
          </div>

          <h1 className="font-heading text-brand-navy text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
            {listing.title}
          </h1>
          <p className="text-brand-slate mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm sm:text-base">
            <MapPin
              aria-hidden="true"
              className="text-brand-bronze size-4 shrink-0"
            />
            <span>{listing.location}</span>
            <span aria-hidden="true">·</span>
            <span>{listing.category}</span>
          </p>

          <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1.8fr)_minmax(19rem,0.8fr)]">
            <div className="min-w-0 space-y-6">
              <section
                aria-label="Confidential listing overview"
                className="grid gap-3 sm:grid-cols-[minmax(0,1.65fr)_minmax(10rem,0.55fr)]"
              >
                <div className="bg-brand-navy text-primary-foreground relative flex min-h-64 flex-col justify-between overflow-hidden rounded-lg p-6 sm:min-h-[25rem] sm:p-8">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_15%,rgba(217,119,6,0.3),transparent_35%),linear-gradient(135deg,transparent_45%,rgba(255,255,255,0.08))]"
                  />
                  <div className="relative flex items-center justify-between gap-4">
                    <span className="text-brand-gold text-xs font-bold tracking-[0.14em] uppercase">
                      {listing.category}
                    </span>
                    <span className="border-primary-foreground/30 bg-brand-navy/70 inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-[0.65rem] font-bold tracking-wider uppercase">
                      <LockKeyhole aria-hidden="true" className="size-3" />
                      NDA required
                    </span>
                  </div>
                  <div className="relative">
                    <Anchor
                      aria-hidden="true"
                      className="text-brand-gold mb-5 size-14"
                      strokeWidth={1.3}
                    />
                    <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
                      A closer look, shared with discretion.
                    </h2>
                    <p className="text-primary-foreground/75 mt-3 max-w-xl text-sm leading-6">
                      Facility photographs and identifying business details
                      are withheld from this public overview.
                    </p>
                  </div>
                  <p className="text-primary-foreground/70 relative mt-8 border-t border-primary-foreground/20 pt-4 text-xs leading-5">
                    Location and opportunity information may be generalized to
                    protect confidentiality.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-rows-2">
                  <div className="border-border bg-card flex min-h-28 flex-col justify-between rounded-lg border p-4 sm:min-h-0">
                    <ShieldCheck
                      aria-hidden="true"
                      className="text-brand-bronze size-6"
                    />
                    <p className="font-heading text-brand-navy mt-5 text-sm font-semibold">
                      Buyer qualification
                    </p>
                    <p className="text-brand-slate mt-1 text-xs leading-5">
                      Confidential materials require advisor review.
                    </p>
                  </div>
                  <div className="border-border bg-brand-offwhite flex min-h-28 flex-col justify-between rounded-lg border p-4 sm:min-h-0">
                    <LockKeyhole
                      aria-hidden="true"
                      className="text-brand-bronze size-6"
                    />
                    <p className="font-heading text-brand-navy mt-5 text-sm font-semibold">
                      NDA process
                    </p>
                    <p className="text-brand-slate mt-1 text-xs leading-5">
                      A request is not an executed agreement or approval.
                    </p>
                  </div>
                </div>
              </section>

              <section className="border-border bg-card rounded-lg border p-5 sm:p-7">
                <p className="text-brand-bronze text-[0.65rem] font-bold tracking-[0.14em] uppercase">
                  Public opportunity profile
                </p>
                <h2 className="font-heading text-brand-navy mt-2 text-xl font-semibold sm:text-2xl">
                  At a glance
                </h2>
                <dl className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="bg-brand-offwhite rounded-md p-4">
                    <dt className="text-brand-slate text-xs font-semibold tracking-wide uppercase">
                      Industry
                    </dt>
                    <dd className="text-brand-navy mt-2 text-sm font-semibold">
                      {listing.category}
                    </dd>
                  </div>
                  <div className="bg-brand-offwhite rounded-md p-4">
                    <dt className="text-brand-slate text-xs font-semibold tracking-wide uppercase">
                      Market
                    </dt>
                    <dd className="text-brand-navy mt-2 text-sm font-semibold">
                      {listing.location}
                    </dd>
                  </div>
                  <div className="bg-brand-offwhite rounded-md p-4">
                    <dt className="text-brand-slate text-xs font-semibold tracking-wide uppercase">
                      Access
                    </dt>
                    <dd className="text-brand-navy mt-2 text-sm font-semibold">
                      Qualification and NDA
                    </dd>
                  </div>
                </dl>
                <div className="border-border mt-5 border-t pt-5">
                  <h3 className="font-heading text-brand-navy text-lg font-semibold">
                    Confidential materials available for review
                  </h3>
                  <p className="text-brand-slate mt-2 text-sm leading-6">
                    Subject to buyer qualification, seller approval, and an
                    executed non-disclosure agreement, an advisor may provide
                    additional information about:
                  </p>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {confidentialMaterials.map((material) => (
                      <li
                        className="text-brand-navy flex items-start gap-2 text-sm leading-5"
                        key={material}
                      >
                        <Check
                          aria-hidden="true"
                          className="text-brand-bronze mt-0.5 size-4 shrink-0"
                        />
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="border-brand-bronze/30 bg-secondary rounded-lg border p-5 sm:p-7">
                <div className="flex items-start gap-3">
                  <LockKeyhole
                    aria-hidden="true"
                    className="text-brand-bronze mt-0.5 size-5 shrink-0"
                  />
                  <div>
                    <h2 className="font-heading text-brand-navy text-lg font-semibold">
                      Financial and identifying details are withheld
                    </h2>
                    <p className="text-brand-slate mt-2 text-sm leading-6">
                      This public page does not include asking price, revenue,
                      cash flow, exact facility address, or other confidential
                      operating information. Submitting a request does not
                      guarantee access or availability.
                    </p>
                    <Link
                      className="text-brand-bronze focus-visible:outline-brand-navy mt-4 inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
                      href="#buyer-criteria"
                    >
                      Request a confidential review
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                    </Link>
                  </div>
                </div>
              </section>
            </div>

            <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
              <BuyerCriteriaForm compact listings={[target]} target={target} />
            </aside>
          </div>

          <section aria-labelledby="related-listings-title" className="mt-14">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-brand-bronze text-xs font-bold tracking-[0.14em] uppercase">
                  Listing intermediary
                </p>
                <h2
                  className="font-heading text-brand-navy mt-2 text-2xl font-semibold sm:text-3xl"
                  id="related-listings-title"
                >
                  Similar businesses for sale
                </h2>
                <p className="text-brand-slate mt-2 max-w-2xl text-sm leading-6">
                  Explore other active opportunities. Their confidential
                  information is also withheld pending qualification and NDA.
                </p>
              </div>
              <Link
                className="text-brand-bronze focus-visible:outline-brand-navy inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
                href="/businesses-for-sale"
              >
                View all listings
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            {relatedListings.length > 0 ? (
              <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {relatedListings.map((relatedListing) => (
                  <li key={relatedListing.id}>
                    <ListingCard listing={relatedListing} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="border-border bg-card rounded-lg border p-6">
                <p className="text-brand-slate text-sm leading-6">
                  No other active opportunities are available to show right
                  now.
                </p>
              </div>
            )}
          </section>

          <p className="text-brand-slate mt-10 border-t border-border pt-5 text-xs leading-5">
            Opportunity information is subject to seller verification and
            independent buyer due diligence. Nothing on this page is an offer
            to sell or a guarantee of transaction terms.
          </p>
          <Link
            className="text-brand-slate hover:text-brand-navy focus-visible:outline-brand-navy mt-6 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
            href="/businesses-for-sale"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to all businesses
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
