import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChartNoAxesCombined,
  FileCheck2,
  Handshake,
  LockKeyhole,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

import { CtaBand } from "@/src/components/cta-band";
import { FaqAccordion } from "@/src/components/faq-accordion";
import { SectionHeading } from "@/src/components/section-heading";
import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";
import type { FaqItem } from "@/src/features/home/types";
import { FullValuationForm, QuickValuationForm } from "./valuation-forms";

export const metadata: Metadata = {
  title: "Sell a Business | Business Broker World",
  description:
    "Explore a confidential, informed approach to selling a business in Sarasota, Bradenton, and Southwest Florida.",
};

const processSteps = [
  {
    number: "01",
    title: "Goals & Preparation",
    description:
      "Discuss potential objectives, timing, and what information may be suitable for an initial review.",
  },
  {
    number: "02",
    title: "Financial Review",
    description:
      "Review available financial records and discuss owner benefit, adjustments, and assumptions.",
  },
  {
    number: "03",
    title: "Marketing & Buyer Review",
    description:
      "Plan whether a non-identifying overview is appropriate and agree on buyer screening and disclosure steps.",
  },
  {
    number: "04",
    title: "Offer & Due Diligence",
    description:
      "Coordinate offer discussions and organize buyer due diligence with the parties' qualified legal, tax, and financial professionals.",
  },
  {
    number: "05",
    title: "Closing & Transition",
    description:
      "Coordinate remaining transaction steps and transition planning with the parties and their advisors. Timing and outcome depend on the transaction.",
  },
];

const confidentialityPractices = [
  {
    icon: LockKeyhole,
    title: "Blind business profile",
    description:
      "Discuss whether a non-identifying overview is appropriate before any marketing begins.",
  },
  {
    icon: FileCheck2,
    title: "Buyer qualification",
    description:
      "Agree on what financial capacity and buyer information should be reviewed before sharing details.",
  },
  {
    icon: ShieldCheck,
    title: "Staged disclosure",
    description:
      "Plan which information may be shared at each stage, and with whom, before providing sensitive records.",
  },
];

const valuationApproaches = [
  {
    title: "Seller’s discretionary earnings",
    description:
      "SDE can help describe the economic benefit available to one owner-operator, with adjustments documented and reviewed.",
  },
  {
    title: "EBITDA",
    description:
      "EBITDA can help compare operating performance across businesses, subject to consistent accounting and adjustment assumptions.",
  },
  {
    title: "Market context",
    description:
      "Relevant transaction and industry context can inform a discussion, but comparables vary and do not determine an individual outcome.",
  },
];

const sellerFaqs: FaqItem[] = [
  {
    question: "What information is needed for an initial discussion?",
    answer:
      "A general industry, location, revenue range, and your goals are a useful starting point. Do not send sensitive records or account details through this form.",
  },
  {
    question: "Can you guarantee a sale price or timeline?",
    answer:
      "No. Any preliminary valuation is an estimate based on available information and assumptions. Buyer interest, diligence, financing, negotiation, and market conditions affect price and timing.",
  },
  {
    question: "How is confidentiality handled?",
    answer:
      "We can discuss staged disclosures, a non-identifying overview, and buyer screening. No marketing or disclosure process can guarantee complete anonymity; the proposed steps should be agreed before outreach.",
  },
  {
    question: "Should I share financial statements now?",
    answer:
      "Not through this public form. If a later review is appropriate, an advisor can discuss a secure, suitable process and the specific records needed.",
  },
  {
    question: "Is this a formal appraisal or legal, tax, or investment advice?",
    answer:
      "No. A preliminary broker discussion is not a formal appraisal, offer, or guarantee, and it does not replace advice from qualified valuation, legal, tax, or financial professionals.",
  },
];

const comparisonRows = [
  {
    label: "Valuation work",
    owner: "Owner develops an estimate and supporting materials.",
    advisor:
      "An advisor can review financial records, adjustments, and assumptions with you.",
  },
  {
    label: "Buyer outreach",
    owner: "Owner identifies prospects and manages initial conversations.",
    advisor:
      "An advisor can help plan outreach and buyer qualification before disclosures.",
  },
  {
    label: "Confidentiality",
    owner: "Owner chooses how to identify the business and share information.",
    advisor:
      "A staged process may include a blind overview and NDA before further disclosure.",
  },
  {
    label: "Transaction coordination",
    owner: "Owner coordinates offers, diligence, and professional advisors.",
    advisor:
      "An advisor can help coordinate the process with the parties' own legal and financial professionals.",
  },
];

export default function SellABusinessPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-brand-offwhite">
        <section className="relative isolate overflow-hidden bg-brand-navy">
          <Image
            alt=""
            className="object-cover object-center"
            fill
            priority
            sizes="100vw"
            src="/southwest-florida-waterfront.jpg"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/65"
          />
          <div className="relative mx-auto grid max-w-[1440px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(26rem,0.9fr)] lg:items-center lg:px-10 lg:py-24">
            <div className="max-w-2xl">
              <p className="font-heading text-brand-gold text-xs font-bold tracking-[0.16em] uppercase">
                Seller advisory · Southwest Florida
              </p>
              <h1 className="font-heading text-primary-foreground mt-5 text-4xl leading-tight font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Plan your business sale with clarity.
              </h1>
              <p className="text-primary-foreground/85 mt-6 max-w-xl text-lg leading-8">
                Start with a confidential conversation about your goals,
                business profile, and the factors that may shape a sale.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 focus-visible:outline-primary-foreground inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 text-center font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
                  href="#valuation-request"
                >
                  Discuss a possible sale
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
                <Link
                  className="border-primary-foreground/60 text-primary-foreground hover:bg-primary-foreground/10 focus-visible:outline-primary-foreground inline-flex min-h-12 items-center justify-center rounded-md border px-5 py-3 text-center font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
                  href="/businesses-for-sale"
                >
                  Explore businesses for sale
                </Link>
              </div>
              <p className="text-primary-foreground/70 mt-5 text-sm leading-6">
                Any preliminary valuation is an estimate, not a formal
                appraisal, offer, or guarantee of sale price.
              </p>
            </div>

            <div className="rounded-lg bg-card p-5 shadow-xl sm:p-7">
              <div className="mb-5">
                <p className="font-heading text-brand-bronze text-xs font-bold tracking-[0.14em] uppercase">
                  Start with a few details
                </p>
                <h2 className="font-heading text-brand-navy mt-2 text-2xl font-semibold">
                  Request a valuation discussion
                </h2>
                <p className="text-brand-slate mt-2 text-sm leading-6">
                  Share broad ranges only. We will not ask for financial
                  documents in this form.
                </p>
              </div>
              <QuickValuationForm />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <SectionHeading
            align="center"
            description="A business sale involves decisions at each stage. The process and professional roles should be clear before confidential information is shared."
            eyebrow="A considered process"
            title="From early planning to closing"
          />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {processSteps.map((step) => (
              <li
                className="border-border bg-card rounded-lg border p-5 sm:p-6"
                key={step.number}
              >
                <span className="font-heading text-brand-bronze text-sm font-bold tracking-widest">
                  {step.number}
                </span>
                <h3 className="font-heading text-brand-navy mt-4 text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="text-brand-slate mt-3 text-sm leading-6">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-card border-border border-y">
          <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
            <SectionHeading
              align="center"
              description="Selling independently and working with an advisor involve different responsibilities. Choose an approach that fits your experience, time, and needs."
              eyebrow="Choose your approach"
              title="Selling on your own or with an advisor"
            />
            <div className="mt-10 overflow-hidden rounded-lg border border-border">
              <div className="grid bg-brand-navy text-primary-foreground sm:grid-cols-3">
                <div className="hidden p-4 sm:block" />
                <h3 className="font-heading p-4 text-lg font-semibold">
                  Owner-led
                </h3>
                <h3 className="font-heading border-primary-foreground/15 border-t p-4 text-lg font-semibold sm:border-t-0 sm:border-l">
                  Advisor-supported
                </h3>
              </div>
              {comparisonRows.map((row) => (
                <div
                  className="border-border grid border-t sm:grid-cols-3"
                  key={row.label}
                >
                  <h4 className="font-heading text-brand-navy bg-brand-offwhite p-4 text-sm font-semibold sm:text-base">
                    {row.label}
                  </h4>
                  <p className="text-brand-slate p-4 text-sm leading-6">
                    {row.owner}
                  </p>
                  <p className="text-brand-slate border-border border-t p-4 text-sm leading-6 sm:border-t-0 sm:border-l">
                    {row.advisor}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-brand-slate mt-4 text-xs leading-5">
              The scope of any advisory engagement is defined in a separate
              written agreement. This comparison is general information, not a
              promise of results.
            </p>
          </div>
        </section>

        <section className="bg-brand-navy">
          <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
            <SectionHeading
              align="center"
              description="Before a sale process begins, discuss how a buyer may be screened and what information would be shared at each stage."
              eyebrow="Thoughtful disclosure"
              inverse
              title="Confidentiality is a process, not a promise"
            />
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {confidentialityPractices.map((practice) => {
                const Icon = practice.icon;
                return (
                  <li
                    className="border-primary-foreground/20 rounded-lg border bg-primary-foreground/5 p-6"
                    key={practice.title}
                  >
                    <Icon
                      aria-hidden="true"
                      className="text-brand-gold size-7"
                    />
                    <h3 className="font-heading text-primary-foreground mt-4 text-xl font-semibold">
                      {practice.title}
                    </h3>
                    <p className="text-primary-foreground/75 mt-3 text-sm leading-6">
                      {practice.description}
                    </p>
                  </li>
                );
              })}
            </ul>
            <p className="text-primary-foreground/70 mt-6 text-sm leading-6">
              No process can guarantee complete anonymity. Agree on disclosure
              steps before outreach or sharing sensitive information.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-10">
          <div>
            <SectionHeading
              description="An informed discussion starts with consistent financial information, documented adjustments, and context for the business and its market."
              eyebrow="Valuation framework"
              title="Understand the factors behind an estimate"
            />
            <p className="text-brand-slate mt-5 leading-7">
              Revenue alone does not determine value. Owner involvement,
              customer concentration, recurring income, assets, lease terms,
              growth, and transferability may all affect how a buyer evaluates
              an opportunity.
            </p>
            <p className="text-brand-slate mt-4 text-sm leading-6">
              A broker discussion is preliminary and depends on the accuracy and
              completeness of information provided. It is not a formal
              appraisal, fairness opinion, tax opinion, or guarantee of an offer
              or sale price.
            </p>
            <Link
              className="bg-brand-navy text-primary-foreground hover:bg-brand-navy/90 focus-visible:outline-brand-bronze mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 text-center font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
              href="#valuation-request"
            >
              Share a business overview
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <div className="grid gap-4">
            {valuationApproaches.map((approach, index) => {
              const Icon = [ChartNoAxesCombined, UsersRound, Handshake][index];
              return (
                <article
                  className="border-border bg-card flex gap-4 rounded-lg border p-5 sm:p-6"
                  key={approach.title}
                >
                  <span className="bg-brand-offwhite flex size-12 shrink-0 items-center justify-center rounded-md">
                    <Icon
                      aria-hidden="true"
                      className="text-brand-bronze size-6"
                    />
                  </span>
                  <div>
                    <h3 className="font-heading text-brand-navy text-lg font-semibold">
                      {approach.title}
                    </h3>
                    <p className="text-brand-slate mt-2 text-sm leading-6">
                      {approach.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="bg-brand-offwhite border-border border-y">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:px-10">
            <div className="lg:sticky lg:top-8">
              <SectionHeading
                description="A few details help us understand what you are considering. Please share ranges, not confidential records."
                eyebrow="Start the conversation"
                title="Tell us about your business"
              />
              <ul className="text-brand-slate mt-6 space-y-3 text-sm leading-6">
                <li className="flex gap-3">
                  <ShieldCheck
                    aria-hidden="true"
                    className="text-brand-bronze mt-0.5 size-5 shrink-0"
                  />
                  Your information is used to respond to this inquiry.
                </li>
                <li className="flex gap-3">
                  <FileCheck2
                    aria-hidden="true"
                    className="text-brand-bronze mt-0.5 size-5 shrink-0"
                  />
                  Do not attach financial statements or other sensitive files.
                </li>
              </ul>
            </div>
            <div
              className="border-border bg-card rounded-lg border p-5 shadow-sm sm:p-8"
              id="valuation-request"
            >
              <FullValuationForm />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <SectionHeading
            align="center"
            description="A few common questions about preparing to sell a business."
            eyebrow="Seller questions"
            title="Before you get started"
          />
          <div className="mx-auto mt-10 max-w-4xl">
            <FaqAccordion items={sellerFaqs} />
          </div>
        </section>

        <CtaBand
          description="Discuss your goals and the information that may be useful for an initial review. No sale price or outcome is guaranteed."
          eyebrow="Considering a transition?"
          primaryHref="#valuation-request"
          primaryLabel="Request a discussion"
          secondaryHref="/businesses-for-sale"
          secondaryLabel="Explore opportunities"
          title="Start with a straightforward conversation."
        />
      </main>
      <SiteFooter />
    </>
  );
}
