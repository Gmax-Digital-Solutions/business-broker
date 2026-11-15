import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ChevronRight,
  CircleAlert,
  FileCheck2,
  Handshake,
  Search,
  ShieldCheck,
} from "lucide-react";

import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";
import { InvestorVisaConsultationForm } from "./consultation-form";
import { InvestorVisaPathwayCard } from "./pathway-card";
import { investorVisaPathways } from "@/src/features/investor-visas/types";

export const metadata: Metadata = {
  title: "Investor Visa & Business Acquisition | Business Broker World",
  description:
    "Explore Florida business acquisition opportunities alongside independent U.S. immigration counsel. Not a law firm; no immigration legal advice.",
};

const acquisitionSteps = [
  {
    icon: Search,
    title: "Discuss business goals",
    description:
      "Share the type of business, region, and transaction you want to explore.",
  },
  {
    icon: FileCheck2,
    title: "Review available information",
    description:
      "Evaluate public business summaries and verify materials through the normal diligence process.",
  },
  {
    icon: Handshake,
    title: "Coordinate with your counsel",
    description:
      "Your independently retained immigration attorney evaluates legal questions and any transaction implications.",
  },
  {
    icon: ShieldCheck,
    title: "Make an informed decision",
    description:
      "Proceed with a transaction only after appropriate business, financial, tax, and legal review.",
  },
] as const;

export default function InvestorVisasPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-brand-offwhite flex-1 pb-16">
        <section className="bg-card border-b border-border">
          <div className="mx-auto max-w-[1440px] px-5 pt-7 pb-10 sm:px-8 sm:pt-10 sm:pb-12 lg:px-10 lg:pb-16">
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
                  Investor visas
                </li>
              </ol>
            </nav>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(21rem,0.95fr)] lg:items-center lg:gap-12">
              <div>
                <p className="bg-secondary text-brand-bronze inline-flex items-center gap-2 rounded-sm px-3 py-2 text-[0.65rem] font-bold tracking-[0.14em] uppercase">
                  <span
                    aria-hidden="true"
                    className="bg-brand-gold size-2 rounded-full"
                  />
                  Cross-border business acquisition
                </p>
                <h1 className="font-heading text-brand-navy mt-4 max-w-3xl text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
                  Explore a Florida Business Search with Your Immigration Counsel
                </h1>
                <p className="text-brand-slate mt-4 max-w-2xl text-sm leading-6 sm:text-base sm:leading-7">
                  Learn about business acquisition pathways and explore
                  opportunities with an independent U.S. immigration attorney
                  handling all visa advice and legal filings.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    className="bg-brand-bronze text-primary-foreground hover:bg-brand-bronze/90 focus-visible:outline-brand-navy inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                    href="#investor-consultation"
                  >
                    Ask about a business search
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                  <Link
                    className="border-border bg-card text-brand-navy hover:border-brand-navy focus-visible:outline-brand-navy inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-5 py-2 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                    href="#investor-pathways"
                  >
                    Explore general pathways
                    <ArrowDown aria-hidden="true" className="size-4" />
                  </Link>
                </div>
                <p className="text-brand-slate mt-5 flex items-start gap-2 text-xs leading-5">
                  <CircleAlert
                    aria-hidden="true"
                    className="text-brand-bronze mt-0.5 size-4 shrink-0"
                  />
                  We are not a law firm and this page is not immigration legal
                  advice. A business purchase does not guarantee a visa or
                  immigration benefit.
                </p>
              </div>

              <figure className="border-border bg-secondary relative aspect-[4/3] overflow-hidden rounded-lg border">
                <Image
                  alt="Waterfront buildings and marina in Sarasota, Florida"
                  className="object-cover"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  src="/southwest-florida-waterfront.jpg"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/10 to-transparent"
                />
                <figcaption className="text-primary-foreground absolute right-4 bottom-4 left-4 rounded-md border border-primary-foreground/20 bg-brand-navy/75 px-4 py-3 text-sm font-semibold backdrop-blur-sm">
                  Florida business acquisition · independent legal guidance
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section
          aria-label="Important considerations"
          className="border-border bg-background border-b"
        >
          <ul className="mx-auto grid max-w-[1440px] grid-cols-2 divide-x divide-y divide-border px-5 sm:px-8 md:grid-cols-4 md:divide-y-0 lg:px-10">
            {[
              "Business brokerage information",
              "Independent immigration counsel",
              "No eligibility determinations",
              "No guaranteed outcomes",
            ].map((item) => (
              <li
                className="text-brand-navy flex min-h-20 items-center gap-3 px-3 py-4 text-xs font-semibold leading-5 sm:px-5 sm:text-sm"
                key={item}
              >
                <ShieldCheck
                  aria-hidden="true"
                  className="text-brand-bronze size-4 shrink-0"
                />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="investor-pathways-heading"
          className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16"
          id="investor-pathways"
        >
          <div className="flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-brand-bronze font-heading text-xs font-bold tracking-[0.16em] uppercase">
                General program information
              </p>
              <h2
                className="font-heading text-brand-navy mt-2 text-3xl leading-tight font-semibold sm:text-4xl"
                id="investor-pathways-heading"
              >
                Investor and business visa categories
              </h2>
            </div>
            <p className="text-brand-slate max-w-lg text-sm leading-6">
              These brief descriptions are for orientation only. They are not a
              legal analysis or a determination that any category applies to
              you.
            </p>
          </div>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {investorVisaPathways.map((pathway) => (
              <li key={pathway.value}>
                <InvestorVisaPathwayCard pathway={pathway} />
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-card border-y border-border py-12 sm:py-14 lg:py-16">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
            <div className="max-w-3xl">
              <p className="text-brand-bronze font-heading text-xs font-bold tracking-[0.16em] uppercase">
                Brokerage role
              </p>
              <h2 className="font-heading text-brand-navy mt-2 text-3xl leading-tight font-semibold sm:text-4xl">
                Business transaction support—not immigration representation
              </h2>
              <p className="text-brand-slate mt-3 text-sm leading-6">
                A brokerage inquiry can start a conversation about business
                search and transaction information. It does not create an
                attorney-client relationship, assess immigration eligibility,
                prepare a petition, or represent anyone before a government
                agency.
              </p>
            </div>
            <ol className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {acquisitionSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <li
                    className="border-border bg-brand-offwhite flex h-full flex-col rounded-lg border p-5"
                    key={step.title}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="bg-brand-navy text-primary-foreground inline-flex size-9 items-center justify-center rounded-sm text-sm font-bold">
                        {index + 1}
                      </span>
                      <Icon
                        aria-hidden="true"
                        className="text-brand-bronze size-5"
                      />
                    </div>
                    <h3 className="font-heading text-brand-navy mt-4 text-lg font-semibold">
                      {step.title}
                    </h3>
                    <p className="text-brand-slate mt-2 text-sm leading-6">
                      {step.description}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <div className="border-brand-bronze bg-secondary rounded-lg border p-5 sm:p-7">
            <div className="flex items-start gap-3">
              <CircleAlert
                aria-hidden="true"
                className="text-brand-bronze mt-0.5 size-5 shrink-0"
              />
              <div>
                <h2 className="font-heading text-brand-navy text-xl font-semibold">
                  Important legal and financing notice
                </h2>
                <p className="text-brand-slate mt-2 text-sm leading-6">
                  We are not a law firm and do not provide immigration legal
                  advice, visa eligibility opinions, or immigration filings.
                  Consult an independent, qualified U.S. immigration attorney
                  for advice about your circumstances. Business and financing
                  information is subject to verification; financing is subject
                  to lender approval. No business or immigration outcome is
                  guaranteed.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card border-y border-border py-12 sm:py-14 lg:py-16">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
            <InvestorVisaConsultationForm />
          </div>
        </section>

        <section
          aria-labelledby="official-resources-heading"
          className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-10"
        >
          <p className="text-brand-bronze font-heading text-xs font-bold tracking-[0.16em] uppercase">
            Official information
          </p>
          <h2
            className="font-heading text-brand-navy mt-2 text-2xl font-semibold"
            id="official-resources-heading"
          >
            Check current program information with USCIS
          </h2>
          <p className="text-brand-slate mt-2 max-w-3xl text-sm leading-6">
            Immigration rules and procedures can change. USCIS and your
            independent attorney—not a business broker—are the appropriate
            sources for current legal requirements.
          </p>
          <Link
            className="text-brand-bronze focus-visible:outline-brand-navy mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
            href="https://www.uscis.gov/"
            rel="noreferrer"
            target="_blank"
          >
            Visit USCIS
            <span className="sr-only">(opens in a new tab)</span>
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
