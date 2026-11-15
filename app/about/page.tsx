import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ChevronRight,
  FileCheck2,
  Handshake,
  MapPin,
  Scale,
  ShieldCheck,
} from "lucide-react";

import { CtaBand } from "@/src/components/cta-band";
import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";

export const metadata: Metadata = {
  title: "About | Business Broker World",
  description:
    "Learn about Business Broker World's practical approach to business sales, acquisitions, and commercial real estate in Southwest Florida.",
};

const focusAreas = [
  {
    icon: FileCheck2,
    title: "Business sales",
    description:
      "Understand preparation, valuation assumptions, buyer outreach, and transaction steps.",
    href: "/sell-a-business",
    linkLabel: "Plan a possible sale",
  },
  {
    icon: Building2,
    title: "Business acquisitions",
    description:
      "Explore opportunities and consider the questions involved in evaluating a business.",
    href: "/businesses-for-sale",
    linkLabel: "Explore businesses",
  },
  {
    icon: MapPin,
    title: "Commercial real estate",
    description:
      "Review commercial property categories and outline your search criteria.",
    href: "/commercial-real-estate",
    linkLabel: "Explore property",
  },
  {
    icon: Handshake,
    title: "Franchise opportunities",
    description:
      "Compare franchise paths and learn what to review before making a decision.",
    href: "/franchise-opportunities",
    linkLabel: "Explore franchise paths",
  },
] as const;

const principles = [
  {
    icon: FileCheck2,
    title: "Start with preparation",
    description:
      "Clarify goals, timing, and the information that may be useful before making a plan.",
  },
  {
    icon: ShieldCheck,
    title: "Share information thoughtfully",
    description:
      "Agree what can be shared and when. No process can guarantee complete confidentiality.",
  },
  {
    icon: Scale,
    title: "Keep decisions in context",
    description:
      "Price, timing, financing, and transaction outcomes depend on the facts of each situation.",
  },
  {
    icon: Handshake,
    title: "Work with qualified advisors",
    description:
      "Legal, tax, accounting, and investment questions should be reviewed with your own qualified professionals.",
  },
] as const;

const serviceAreas = [
  {
    title: "Sarasota",
    description: "Business and commercial property interests in Sarasota County.",
  },
  {
    title: "Bradenton",
    description: "Owner and buyer resources across Bradenton and Manatee County.",
  },
  {
    title: "Southwest Florida",
    description:
      "A broader regional focus for people exploring a business or property decision.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-brand-offwhite">
        <section className="border-border bg-card border-b">
          <div className="mx-auto max-w-[1440px] px-5 pt-7 pb-10 sm:px-8 sm:pt-10 sm:pb-12 lg:px-10 lg:pb-14">
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
                  About
                </li>
              </ol>
            </nav>

            <div className="border-border border-b pb-8 sm:pb-10">
              <p className="bg-secondary text-brand-bronze inline-flex items-center gap-2 rounded-sm px-3 py-2 text-[0.65rem] font-bold tracking-[0.14em] uppercase">
                Business and commercial advisory · Southwest Florida
              </p>
              <h1 className="font-heading text-brand-navy mt-5 max-w-5xl text-4xl leading-tight font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                A thoughtful approach to important business decisions.
              </h1>
              <p className="text-brand-slate mt-5 max-w-3xl text-base leading-7 sm:text-lg sm:leading-8">
                Business Broker World brings information about selling,
                acquiring, and commercial property into one place for owners and
                buyers focused on Sarasota, Bradenton, Manatee County, and the
                wider Southwest Florida region.
              </p>
            </div>

            <ul
              aria-label="Areas of focus"
              className="grid gap-3 pt-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {focusAreas.map((area) => {
                const Icon = area.icon;

                return (
                  <li key={area.title}>
                    <Link
                      className="border-border bg-background hover:border-brand-navy focus-visible:outline-brand-navy group flex h-full flex-col rounded-lg border p-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:p-5"
                      href={area.href}
                    >
                      <Icon
                        aria-hidden="true"
                        className="text-brand-bronze size-5"
                      />
                      <span className="font-heading text-brand-navy mt-3 font-semibold">
                        {area.title}
                      </span>
                      <span className="text-brand-slate mt-2 text-sm leading-6">
                        {area.description}
                      </span>
                      <span className="text-brand-bronze group-hover:text-brand-navy mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold">
                        {area.linkLabel}
                        <ArrowRight aria-hidden="true" className="size-4" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="about-approach-heading"
          className="mx-auto grid max-w-[1440px] gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:px-10 lg:py-20"
        >
          <div>
            <p className="font-heading text-brand-bronze text-xs font-bold tracking-[0.16em] uppercase">
              Our approach
            </p>
            <h2
              className="font-heading text-brand-navy mt-3 text-3xl leading-tight font-semibold tracking-tight sm:text-4xl"
              id="about-approach-heading"
            >
              Local context. Clear next steps.
            </h2>
            <p className="text-brand-slate mt-5 leading-7">
              A business transition or acquisition can involve financial,
              operational, and personal considerations. This site is designed
              to help owners and buyers understand common steps, compare
              available paths, and identify what they may want to review next.
            </p>
            <p className="text-brand-slate mt-4 leading-7">
              Every business and property is different. Information should be
              verified for the specific opportunity, and decisions should be
              made with appropriate legal, tax, accounting, and financial
              advice.
            </p>
            <div className="border-border bg-card mt-6 rounded-lg border p-5">
              <p className="text-brand-navy text-sm leading-6">
                We focus on useful information and a considered process rather
                than promising a price, timeline, financing, or transaction
                outcome.
              </p>
            </div>
          </div>

          <figure className="border-border bg-secondary relative aspect-[4/3] overflow-hidden rounded-lg border">
            <Image
              alt="Waterfront buildings and marina in Sarasota, Florida"
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 46vw"
              src="/southwest-florida-waterfront.jpg"
            />
            <figcaption className="text-primary-foreground absolute right-4 bottom-4 left-4 rounded-md border border-primary-foreground/20 bg-brand-navy/80 px-4 py-3 text-sm font-semibold">
              A regional perspective for Southwest Florida
            </figcaption>
          </figure>
        </section>

        <section
          aria-labelledby="about-principles-heading"
          className="border-border bg-card border-y py-12 sm:py-16 lg:py-20"
        >
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
            <div className="max-w-3xl">
              <p className="font-heading text-brand-bronze text-xs font-bold tracking-[0.16em] uppercase">
                What guides the process
              </p>
              <h2
                className="font-heading text-brand-navy mt-3 text-3xl leading-tight font-semibold tracking-tight sm:text-4xl"
                id="about-principles-heading"
              >
                Practical principles for every conversation
              </h2>
              <p className="text-brand-slate mt-4 leading-7">
                A clear scope and careful review help people ask better
                questions before taking the next step.
              </p>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {principles.map((principle) => {
                const Icon = principle.icon;

                return (
                  <li
                    className="border-border bg-brand-offwhite rounded-lg border p-5 sm:p-6"
                    key={principle.title}
                  >
                    <span className="bg-card inline-flex size-10 items-center justify-center rounded-md">
                      <Icon
                        aria-hidden="true"
                        className="text-brand-bronze size-5"
                      />
                    </span>
                    <h3 className="font-heading text-brand-navy mt-4 text-lg font-semibold">
                      {principle.title}
                    </h3>
                    <p className="text-brand-slate mt-2 text-sm leading-6">
                      {principle.description}
                    </p>
                  </li>
                );
              })}
            </ul>

            <p className="border-border text-brand-slate mt-6 border-l-2 pl-4 text-sm leading-6">
              This concept site does not publish named advisor biographies,
              credentials, transaction history, or performance metrics because
              verified supporting information has not been provided.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="about-region-heading"
          className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20"
        >
          <div className="flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-heading text-brand-bronze text-xs font-bold tracking-[0.16em] uppercase">
                Regional focus
              </p>
              <h2
                className="font-heading text-brand-navy mt-3 text-3xl leading-tight font-semibold tracking-tight sm:text-4xl"
                id="about-region-heading"
              >
                Sarasota, Bradenton, and Southwest Florida
              </h2>
            </div>
            <p className="text-brand-slate max-w-lg text-sm leading-6">
              The site focuses on business and commercial property decisions
              across Sarasota and Manatee counties and nearby Southwest Florida
              communities.
            </p>
          </div>

          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {serviceAreas.map((area) => (
              <li
                className="border-border bg-card rounded-lg border p-5 sm:p-6"
                key={area.title}
              >
                <div className="flex items-center gap-3">
                  <MapPin
                    aria-hidden="true"
                    className="text-brand-bronze size-5"
                  />
                  <h3 className="font-heading text-brand-navy text-lg font-semibold">
                    {area.title}
                  </h3>
                </div>
                <p className="text-brand-slate mt-3 text-sm leading-6">
                  {area.description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <CtaBand
          description="Explore the next steps for a potential sale or acquisition and decide what information you need."
          eyebrow="Business Broker World"
          primaryHref="/sell-a-business"
          primaryLabel="Consider a business sale"
          secondaryHref="/businesses-for-sale"
          secondaryLabel="Explore businesses for sale"
          title="Start with the decision in front of you."
        />
      </main>
      <SiteFooter />
    </>
  );
}
