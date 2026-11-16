import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  CircleAlert,
  FileCheck2,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";
import { ContactInquiryForm } from "./inquiry-form";

export const metadata: Metadata = {
  title: "Contact | Business Broker World",
  description:
    "Send a business or commercial property inquiry to Business Broker World. Share only basic contact details and non-confidential information.",
};

const inquiryGuidance = [
  {
    icon: FileCheck2,
    title: "Tell us the topic",
    description:
      "Choose a business sale, acquisition, commercial property, franchise, or general question.",
  },
  {
    icon: ShieldCheck,
    title: "Keep it general",
    description:
      "Do not submit confidential business records, financial account details, or identity documents.",
  },
] as const;

export default function ContactPage() {
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
                  Contact
                </li>
              </ol>
            </nav>

            <div className="grid gap-6 border-b border-border pb-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.65fr)] lg:items-end lg:gap-10">
              <div>
                <p className="bg-secondary text-brand-bronze inline-flex items-center gap-2 rounded-sm px-3 py-2 text-[0.65rem] font-bold tracking-[0.14em] uppercase">
                  <span
                    aria-hidden="true"
                    className="bg-brand-gold size-2 rounded-full"
                  />
                  Business and commercial inquiries
                </p>
                <h1 className="font-heading text-brand-navy mt-4 max-w-4xl text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
                  Start a conversation.
                </h1>
                <p className="text-brand-slate mt-4 max-w-3xl text-base leading-7 sm:text-lg">
                  Tell us what you are exploring in business sales,
                  acquisitions, or commercial real estate across Southwest
                  Florida. A brief, non-confidential message is a good place to
                  begin.
                </p>
              </div>

              <p className="border-border bg-background text-brand-slate flex items-start gap-3 rounded-lg border p-4 text-sm leading-6">
                <CircleAlert
                  aria-hidden="true"
                  className="text-brand-bronze mt-0.5 size-5 shrink-0"
                />
                This public form is not a secure document channel. Submitting it
                does not guarantee confidentiality or create an advisory or
                attorney-client relationship.
              </p>
            </div>
          </div>
        </section>

        <section
          aria-label="Contact form and inquiry information"
          className="mx-auto grid max-w-[1440px] gap-6 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] lg:gap-8 lg:px-10 lg:py-16"
        >
          <ContactInquiryForm />

          <aside className="space-y-5">
            <section
              aria-labelledby="contact-guidance-heading"
              className="border-border bg-card rounded-lg border p-5 sm:p-6"
            >
              <p className="font-heading text-brand-bronze text-xs font-bold tracking-[0.16em] uppercase">
                Before you send
              </p>
              <h2
                className="font-heading text-brand-navy mt-3 text-2xl font-semibold"
                id="contact-guidance-heading"
              >
                A useful first step
              </h2>
              <ul className="mt-5 space-y-5">
                {inquiryGuidance.map((item) => {
                  const Icon = item.icon;

                  return (
                    <li className="flex items-start gap-3" key={item.title}>
                      <Icon
                        aria-hidden="true"
                        className="text-brand-bronze mt-0.5 size-5 shrink-0"
                      />
                      <div>
                        <h3 className="font-semibold text-brand-navy">
                          {item.title}
                        </h3>
                        <p className="text-brand-slate mt-1 text-sm leading-6">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>

            <figure className="border-border bg-brand-navy relative aspect-[4/3] overflow-hidden rounded-lg border">
              <Image
                alt="Waterfront buildings and marina in Sarasota, Florida"
                className="object-cover"
                fill
                sizes="(max-width: 1024px) 100vw, 36vw"
                src="/southwest-florida-waterfront.jpg"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-brand-navy/10 to-transparent"
              />
              <figcaption className="text-primary-foreground absolute right-4 bottom-4 left-4 rounded-md border border-primary-foreground/20 bg-brand-navy/75 px-4 py-3">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <MapPin aria-hidden="true" className="text-brand-gold size-4" />
                  Southwest Florida focus
                </span>
                <span className="mt-1 block text-xs leading-5 text-primary-foreground/80">
                  Sarasota, Bradenton, and the surrounding region
                </span>
              </figcaption>
            </figure>

            <section
              aria-labelledby="contact-resources-heading"
              className="border-border bg-background rounded-lg border p-5 sm:p-6"
            >
              <h2
                className="font-heading text-brand-navy text-lg font-semibold"
                id="contact-resources-heading"
              >
                Looking for a specific next step?
              </h2>
              <ul className="mt-3 space-y-1">
                {[
                  {
                    label: "Plan a possible business sale",
                    href: "/sell-a-business",
                  },
                  {
                    label: "Explore businesses for sale",
                    href: "/businesses-for-sale",
                  },
                  {
                    label: "Browse commercial real estate",
                    href: "/commercial-real-estate",
                  },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      className="text-brand-bronze hover:text-brand-navy focus-visible:outline-brand-navy inline-flex min-h-11 items-center gap-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
                      href={item.href}
                    >
                      {item.label}
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
