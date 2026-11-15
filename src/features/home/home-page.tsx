import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Globe2,
  Landmark,
  Search,
  Scale,
  Store,
  UserRound,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CtaBand } from "@/src/components/cta-band";
import { FaqAccordion } from "@/src/components/faq-accordion";
import { ListingCard } from "@/src/components/listing-card";
import { PersonaCards } from "@/src/components/persona-cards";
import { SectionHeading } from "@/src/components/section-heading";
import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";
import { StatBar } from "@/src/components/stat-bar";
import { TestimonialCard } from "@/src/components/testimonial-card";
import {
  advisoryServices,
  buyerSteps,
  demoFeaturedListings,
  fiduciaryPrinciples,
  homepageFaqs,
  homepagePersonas,
  homepageStats,
  recentClosings,
  sellerSteps,
  testimonials,
} from "./data";
import { getFeaturedListings } from "./get-featured-listings";

const serviceIcons = {
  "real-estate": Building2,
  capital: Landmark,
  franchise: Store,
  visas: Globe2,
};

function Hero() {
  return (
    <section className="bg-brand-navy relative isolate flex min-h-[42rem] items-center overflow-hidden lg:min-h-[57.75rem]">
      <Image
        alt=""
        aria-hidden="true"
        className="object-cover object-center"
        fill
        priority
        sizes="100vw"
        src="/southwest-florida-waterfront.jpg"
      />
      <div
        aria-hidden="true"
        className="from-brand-navy via-brand-navy/90 to-brand-navy/60 absolute inset-0 bg-gradient-to-r"
      />
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
        <div className="max-w-5xl">
          <p className="text-brand-gold mb-6 inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase sm:text-sm">
            <span className="bg-brand-gold size-2 rounded-full" />
            Bradenton · Sarasota · Manatee County
          </p>
          <h1 className="font-heading text-primary-foreground max-w-5xl text-4xl leading-[1.15] font-semibold tracking-tight sm:text-5xl lg:text-[3.5rem]">
            <span className="lg:block">Southwest Florida’s Premier</span>{" "}
            <span className="lg:block">Business Brokerage & Commercial</span>{" "}
            <span className="lg:block">Real Estate Firm</span>
          </h1>
          <p className="text-primary-foreground/85 mt-6 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8">
            Business owners across Manatee and Sarasota counties can pursue a
            thoughtful valuation with strict confidentiality.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              className="bg-brand-bronze text-primary-foreground hover:bg-brand-bronze/90 focus-visible:outline-primary-foreground inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
              href="/sell-a-business"
              prefetch={false}
            >
              Sell Your Business
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              className="border-primary-foreground/70 bg-brand-navy/20 text-primary-foreground hover:bg-primary-foreground/10 focus-visible:outline-primary-foreground inline-flex min-h-12 items-center justify-center gap-2 rounded-md border px-5 py-3 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
              href="/businesses-for-sale"
              prefetch={false}
            >
              <Search aria-hidden="true" className="size-4" />
              Browse Listings
            </Link>
          </div>
          <p className="text-primary-foreground/85 mt-6 inline-flex items-center gap-2 text-sm">
            <BadgeCheck aria-hidden="true" className="text-brand-gold size-4" />
            Confidential. No obligation. Reply within one business day.
          </p>
        </div>
      </div>
    </section>
  );
}

function ListingFallback() {
  return (
    <div
      aria-label="Loading featured listings"
      className="grid gap-5 md:grid-cols-3"
      role="status"
    >
      {Array.from({ length: 3 }, (_, index) => (
        <div
          aria-hidden="true"
          className="border-border bg-card h-[24rem] animate-pulse rounded-lg border"
          key={index}
        />
      ))}
      <span className="sr-only">Loading featured listings.</span>
    </div>
  );
}

async function FeaturedListingResults() {
  await connection();
  const designPreview = process.env.HOMEPAGE_DESIGN_PREVIEW === "true";
  const listings = designPreview
    ? demoFeaturedListings.map((listing, index) => ({
        ...listing,
        id: `design-preview-${index + 1}`,
      }))
    : await getFeaturedListings();

  if (listings.length === 0) {
    return (
      <p className="border-border bg-card text-brand-slate rounded-lg border p-6">
        There are no featured opportunities available at this time. Please
        contact our team to discuss your acquisition criteria.
      </p>
    );
  }

  return (
    <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {listings.map((listing) => (
        <li key={listing.id}>
          <ListingCard listing={listing} />
        </li>
      ))}
    </ul>
  );
}

function ProcessSteps({ steps }: { steps: typeof sellerSteps }) {
  return (
    <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {steps.map((step) => (
        <li
          className="border-border bg-card flex gap-4 rounded-lg border p-6 sm:p-7"
          key={step.number}
        >
          <span className="bg-brand-offwhite font-heading text-brand-bronze flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-bold">
            {step.number}
          </span>
          <div>
            <h3 className="font-heading text-brand-navy font-semibold">
              {step.title}
            </h3>
            <p className="text-brand-slate mt-2 text-sm leading-6">
              {step.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function ProcessSection() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          align="center"
          description="Whether planning a sale or evaluating an acquisition, a clear process helps protect value and confidentiality."
          eyebrow="Methodical advisory"
          title="Disciplined M&A Process"
        />
        <Tabs className="mt-10" defaultValue="selling">
          <TabsList
            aria-label="Choose a transaction process"
            className="border-border bg-card mx-auto h-12 w-full max-w-[30rem] rounded-lg border p-1"
          >
            <TabsTrigger
              className="h-full flex-1 px-4 font-semibold"
              value="selling"
            >
              Selling a Business
            </TabsTrigger>
            <TabsTrigger
              className="h-full flex-1 px-4 font-semibold"
              value="buying"
            >
              Buying a Business
            </TabsTrigger>
          </TabsList>
          <TabsContent className="mt-6" value="selling">
            <ProcessSteps steps={sellerSteps} />
          </TabsContent>
          <TabsContent className="mt-6" value="buying">
            <ProcessSteps steps={buyerSteps} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function AdvisoryServices() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          align="center"
          description="Comprehensive deal solutions tailored for mid-market operators, private syndicates, and corporate buyers."
          eyebrow="Institutional capabilities"
          title="Specialized Advisory Services"
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {advisoryServices.map((service) => {
            const Icon = serviceIcons[service.icon];

            return (
              <li
                className="border-border bg-card rounded-lg border p-6 sm:p-8"
                key={service.title}
              >
                <span className="bg-brand-offwhite inline-flex size-14 items-center justify-center rounded-md">
                  <Icon
                    aria-hidden="true"
                    className="text-brand-bronze size-6"
                    strokeWidth={1.8}
                  />
                </span>
                <h3 className="font-heading text-brand-navy mt-5 text-xl font-semibold">
                  {service.title}
                </h3>
                <p className="text-brand-slate mt-3 max-w-2xl text-sm leading-6">
                  {service.description}
                </p>
                <Link
                  className="text-brand-bronze hover:text-brand-navy focus-visible:outline-brand-navy mt-5 inline-flex min-h-11 items-center gap-2 font-semibold focus-visible:outline-2 focus-visible:outline-offset-4"
                  href={service.href}
                  prefetch={false}
                >
                  {service.linkLabel}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function InvestorBand() {
  return (
    <section className="bg-brand-navy py-16 sm:py-20">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <p className="font-heading text-brand-gold mb-4 text-xs font-bold tracking-[0.16em] uppercase">
          Global inward investment
        </p>
        <h2 className="font-heading text-primary-foreground max-w-4xl text-3xl leading-tight font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Investing from abroad? Buy a Florida business and pursue an E-2 or L-1
          visa.
        </h2>
        <p className="text-primary-foreground/80 mt-5 max-w-4xl text-base leading-7 sm:text-lg">
          We help international buyers explore operating businesses and
          coordinate with qualified U.S. immigration counsel. Visa eligibility
          and strategy should be reviewed with licensed professionals.
        </p>
        <ul className="mt-7 flex flex-wrap gap-3">
          {[
            "E-2 Treaty Investor",
            "EB-5 Direct Investment",
            "L-1 Intracompany Transfer",
          ].map((pathway) => (
            <li
              className="border-primary-foreground/35 text-primary-foreground bg-primary-foreground/10 inline-flex min-h-10 items-center rounded-md border px-4 text-sm font-medium"
              key={pathway}
            >
              {pathway}
            </li>
          ))}
        </ul>
        <p className="text-primary-foreground/80 mt-5 text-sm leading-6">
          Fluent English, Spanish, Portuguese & German advisory available.
        </p>
        <Link
          className="bg-brand-bronze text-primary-foreground hover:bg-brand-bronze/90 focus-visible:outline-primary-foreground mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
          href="/contact?topic=investor"
          prefetch={false}
        >
          Talk to an International Investor Specialist
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
        <p className="text-primary-foreground/60 mt-5 max-w-3xl text-xs leading-5">
          Business Broker World provides intermediary brokerage services and
          coordinates with qualified immigration counsel. This is not
          immigration or legal advice.
        </p>
      </div>
    </section>
  );
}

function FiduciarySection() {
  const principleIcons = [UserRound, Globe2, Scale];

  return (
    <section className="bg-card py-20 sm:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          align="center"
          description="Our approach combines owner perspective, thoughtful outreach, and disciplined transaction coordination."
          eyebrow="Unrivaled regional leadership"
          title="Uncompromising Fiduciary Execution in Southwest Florida"
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {fiduciaryPrinciples.map((principle, index) => {
            const Icon = principleIcons[index];

            return (
              <li
                className="border-border bg-background rounded-lg border p-6 sm:p-7"
                key={principle.title}
              >
                <Icon
                  aria-hidden="true"
                  className="text-brand-bronze size-7"
                  strokeWidth={1.8}
                />
                <h3 className="font-heading text-brand-navy mt-5 text-xl font-semibold">
                  {principle.title}
                </h3>
                <p className="text-brand-slate mt-3 leading-7">
                  {principle.description}
                </p>
              </li>
            );
          })}
        </ul>
        <blockquote className="border-brand-bronze bg-card text-brand-navy mt-8 rounded-lg border border-l-4 px-6 py-8 sm:px-10 sm:py-10">
          <p className="font-heading mx-auto max-w-4xl text-xl leading-snug font-medium italic sm:text-2xl">
            “Our incentives are aligned with helping you pursue the strongest
            outcome for your business.”
          </p>
          <footer className="text-brand-slate mt-5 text-sm">
            Managing broker · Illustrative concept-demo quote
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

function ClosingsSection() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          description="Illustrative examples; deal details, enterprise names, and client identities are kept confidential."
          eyebrow="Track record of success"
          title="Recent Verified Closings"
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {recentClosings.map((closing) => (
            <li
              className="border-border bg-card rounded-lg border p-6"
              key={closing.industry}
            >
              <span className="bg-secondary text-secondary-foreground inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase">
                Sold
              </span>
              <h3 className="font-heading text-brand-navy mt-5 text-xl font-semibold">
                {closing.industry}
              </h3>
              <p className="text-brand-slate mt-2 text-sm font-medium">
                {closing.location}
              </p>
              <p className="border-border text-brand-navy mt-4 border-t pt-4 text-sm leading-6 font-semibold">
                Sold in {closing.daysToClose} days
              </p>
              <p className="text-brand-bronze text-sm font-semibold">
                {closing.result}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="bg-card py-20 sm:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          align="center"
          description="Illustrative sample feedback for this concept demo; client names and outcomes are not verified."
          eyebrow="Client endorsements"
          title="Institutional Feedback"
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <li key={testimonial.name + testimonial.title}>
              <TestimonialCard testimonial={testimonial} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <div className="relative z-10">
          <StatBar items={homepageStats} />
          <div className="mx-auto -mt-7 max-w-[1440px] px-4 pb-14 sm:px-8 lg:px-10">
            <PersonaCards items={homepagePersonas} />
          </div>
        </div>

        <section className="bg-background py-20 sm:py-24">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                description="Further details are shared confidentially with qualified buyers."
                eyebrow="Confidential opportunities"
                title="Businesses for Sale in Southwest Florida"
              />
              <Link
                className="text-brand-navy decoration-brand-gold hover:text-brand-bronze focus-visible:outline-brand-navy inline-flex min-h-11 shrink-0 items-center gap-2 font-semibold underline decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
                href="/businesses-for-sale"
                prefetch={false}
              >
                View all businesses
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <div className="mt-10">
              <Suspense fallback={<ListingFallback />}>
                <FeaturedListingResults />
              </Suspense>
            </div>
            <p className="text-brand-slate mt-5 text-xs leading-5">
              Listing information is illustrative for this concept demo. Actual
              opportunity terms require independent verification and a signed
              confidentiality agreement.
            </p>
          </div>
        </section>

        <ProcessSection />

        <AdvisoryServices />
        <InvestorBand />
        <FiduciarySection />
        <ClosingsSection />
        <TestimonialsSection />

        <section className="bg-background py-20 sm:py-24">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <SectionHeading
              align="center"
              description="Answers to common questions about selling and buying a business in Southwest Florida."
              eyebrow="Clear answers"
              title="Frequently Asked Questions"
            />
            <div className="mt-10">
              <FaqAccordion items={homepageFaqs} />
            </div>
          </div>
        </section>

        <CtaBand
          description="Discover what qualified buyers may be paying for businesses like yours in Manatee and Sarasota counties."
          eyebrow=""
          primaryHref="/sell-a-business"
          primaryLabel="Request Your Valuation Now"
          secondaryHref="/contact"
          secondaryLabel="Contact our team"
          title="Thinking about selling? Start with a free, confidential valuation."
          tone="bronze"
        />
      </main>
      <SiteFooter />
    </>
  );
}
