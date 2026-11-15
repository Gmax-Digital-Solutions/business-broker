import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const footerNavigation = [
  {
    title: "Business advisory",
    links: [
      { label: "Businesses for sale", href: "/businesses-for-sale" },
      { label: "Sell a business", href: "/sell-a-business" },
      { label: "Buyer advisory", href: "/businesses-for-sale" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Commercial real estate", href: "/commercial-real-estate" },
      { label: "Investor visas", href: "/investor-visas" },
      { label: "Franchise opportunities", href: "/franchise-opportunities" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-brand-navy text-primary-foreground">
      <div className="border-primary-foreground/15 bg-brand-navy/80 border-b">
        <div className="mx-auto max-w-[1440px] px-5 py-5 sm:px-8 lg:px-10">
          <p className="text-primary-foreground/80 text-sm leading-6">
            <span className="text-primary-foreground font-semibold">
              Concept demo:
            </span>{" "}
            Featured listings, transaction examples, performance metrics, and
            testimonials are illustrative and do not represent verified client
            engagements or current opportunities.
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 pb-28 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_2fr] lg:px-10 lg:py-16 lg:pb-16">
        <div>
          <Link
            aria-label="Business Broker World home"
            className="focus-visible:outline-primary-foreground inline-flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4"
            href="/"
          >
            <span
              aria-hidden="true"
              className="border-brand-gold flex h-9 w-8 items-end justify-center gap-0.5 border-b-2 pb-1"
            >
              <span className="bg-primary-foreground h-5 w-1.5" />
              <span className="bg-brand-gold h-7 w-1.5" />
              <span className="bg-primary-foreground h-4 w-1.5" />
            </span>
            <span className="font-heading text-lg leading-tight font-bold">
              Business Broker
              <span className="text-brand-gold block text-xs font-semibold tracking-[0.2em] uppercase">
                World
              </span>
            </span>
          </Link>
          <p className="text-primary-foreground/75 mt-5 max-w-sm leading-7">
            Independent business and commercial advisory for owners, buyers, and
            investors across Southwest Florida.
          </p>
          <p className="text-primary-foreground/65 mt-4 text-sm">
            Sarasota · Bradenton · Southwest Florida
          </p>
        </div>
        <nav
          aria-label="Footer navigation"
          className="grid grid-cols-2 gap-8 sm:grid-cols-3"
        >
          {footerNavigation.map((group) => (
            <div key={group.title}>
              <h2 className="font-heading text-primary-foreground text-sm font-semibold">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      className="text-primary-foreground/75 hover:text-primary-foreground focus-visible:outline-primary-foreground inline-flex items-center gap-1 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                      href={link.href}
                      prefetch={false}
                    >
                      {link.label}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="text-brand-gold size-3.5"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="border-primary-foreground/15 border-t">
        <div className="text-primary-foreground/65 mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-5 text-xs sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <p>© Business Broker World. All rights reserved.</p>
          <p>
            Confidentiality is respected. Past results do not guarantee future
            outcomes.
          </p>
        </div>
      </div>
    </footer>
  );
}
