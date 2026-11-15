"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const menus = [
  {
    id: "buy",
    label: "Buy a Business",
    description: "Confidential guidance for business buyers.",
    links: [
      { label: "Businesses for sale", href: "/businesses-for-sale" },
      { label: "Buyer advisory", href: "/businesses-for-sale" },
      { label: "Acquisition process", href: "/businesses-for-sale" },
    ],
  },
  {
    id: "sell",
    label: "Sell a Business",
    description: "Principal-led support for a confidential business sale.",
    links: [
      { label: "Seller advisory", href: "/sell-a-business" },
      { label: "Request a valuation", href: "/sell-a-business" },
      { label: "Our process", href: "/sell-a-business" },
    ],
  },
  {
    id: "commercial",
    label: "Commercial Real Estate",
    description:
      "Local insight for property, franchise, and investor decisions.",
    links: [
      { label: "Commercial real estate", href: "/commercial-real-estate" },
      { label: "Investor visas", href: "/investor-visas" },
      { label: "Franchise opportunities", href: "/franchise-opportunities" },
    ],
  },
];

const simpleLinks = [{ label: "About Us", href: "/about" }];

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  function closeMenus() {
    setOpenMenu(null);
    setMobileOpen(false);
  }

  return (
    <>
      <header className="border-border bg-card/95 sticky top-0 z-40 border-b backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-8 lg:px-10">
          <Link
            aria-label="Business Broker World home"
            className="focus-visible:outline-brand-navy flex shrink-0 items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4"
            href="/"
            onClick={closeMenus}
          >
            <span
              aria-hidden="true"
              className="border-brand-bronze flex h-9 w-8 items-end justify-center gap-0.5 border-b-2 pb-1"
            >
              <span className="bg-brand-navy h-5 w-1.5" />
              <span className="bg-brand-gold h-7 w-1.5" />
              <span className="bg-brand-navy h-4 w-1.5" />
            </span>
            <span className="font-heading text-brand-navy text-[0.95rem] leading-tight font-bold tracking-tight sm:text-lg">
              Business Broker
              <span className="text-brand-bronze block text-[0.7rem] font-semibold tracking-[0.2em] uppercase sm:text-xs">
                World
              </span>
            </span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            <Link
              className="text-brand-navy hover:bg-secondary focus-visible:outline-brand-navy inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
              href="/"
              onClick={closeMenus}
            >
              Home
            </Link>
            {menus.map((menu) => (
              <div className="relative" key={menu.id}>
                <button
                  aria-controls={`${menu.id}-menu`}
                  aria-expanded={openMenu === menu.id}
                  className="text-brand-navy hover:bg-secondary focus-visible:outline-brand-navy inline-flex min-h-11 items-center gap-1 rounded-md px-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                  id={`${menu.id}-trigger`}
                  onClick={() =>
                    setOpenMenu(openMenu === menu.id ? null : menu.id)
                  }
                  type="button"
                >
                  {menu.label}
                  <ChevronDown
                    aria-hidden="true"
                    className={`size-4 transition-transform ${openMenu === menu.id ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  aria-labelledby={`${menu.id}-trigger`}
                  className="border-border bg-card absolute top-full left-0 z-50 mt-2 w-[min(34rem,calc(100vw-2rem))] rounded-lg border p-6 shadow-lg"
                  hidden={openMenu !== menu.id}
                  id={`${menu.id}-menu`}
                >
                  <p className="font-heading text-brand-navy text-lg font-semibold">
                    {menu.description}
                  </p>
                  <ul className="mt-4 grid grid-cols-2 gap-2">
                    {menu.links.map((link) => (
                      <li key={link.href + link.label}>
                        <Link
                          className="text-brand-slate hover:bg-secondary hover:text-brand-navy focus-visible:outline-brand-navy flex min-h-12 items-center justify-between gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2"
                          href={link.href}
                          onClick={closeMenus}
                          prefetch={false}
                        >
                          {link.label}
                          <ArrowUpRight
                            aria-hidden="true"
                            className="text-brand-bronze size-4 shrink-0"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            {simpleLinks.map((link) => (
              <Link
                className="text-brand-navy hover:bg-secondary focus-visible:outline-brand-navy inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                href={link.href}
                key={link.href}
                onClick={closeMenus}
                prefetch={false}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <Button
              nativeButton={false}
              render={<Link href="/sell-a-business" prefetch={false} />}
              size="lg"
            >
              Free Valuation
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Button>
          </div>

          <Button
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            className="min-h-11 min-w-11 lg:hidden"
            onClick={() => setMobileOpen(true)}
            size="icon"
            variant="outline"
          >
            <Menu aria-hidden="true" />
          </Button>
        </div>
      </header>

      <Sheet onOpenChange={setMobileOpen} open={mobileOpen}>
        <SheetContent
          aria-describedby={undefined}
          className="gap-0 overflow-y-auto p-0"
          side="left"
        >
          <SheetHeader className="border-border border-b px-5 py-5">
            <SheetTitle className="font-heading text-brand-navy">
              Business Broker World
            </SheetTitle>
          </SheetHeader>
          <nav aria-label="Mobile navigation" className="px-5 py-4">
            <Link
              className="text-brand-navy hover:bg-secondary focus-visible:outline-brand-navy flex min-h-11 items-center rounded-md px-2 font-medium focus-visible:outline-2"
              href="/"
              onClick={closeMenus}
            >
              Home
            </Link>
            {menus.map((menu) => (
              <section className="border-border border-b py-4" key={menu.id}>
                <h2 className="text-brand-bronze mb-2 text-xs font-bold tracking-[0.14em] uppercase">
                  {menu.label}
                </h2>
                <ul className="space-y-1">
                  {menu.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        className="text-brand-navy hover:bg-secondary focus-visible:outline-brand-navy flex min-h-11 items-center justify-between gap-3 rounded-md px-2 font-medium focus-visible:outline-2"
                        href={link.href}
                        onClick={closeMenus}
                        prefetch={false}
                      >
                        {link.label}
                        <ArrowUpRight
                          aria-hidden="true"
                          className="text-brand-bronze size-4"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            <ul className="border-border space-y-1 border-b py-4">
              {simpleLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className="text-brand-navy hover:bg-secondary focus-visible:outline-brand-navy flex min-h-11 items-center rounded-md px-2 font-medium focus-visible:outline-2"
                    href={link.href}
                    onClick={closeMenus}
                    prefetch={false}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  className="text-brand-navy hover:bg-secondary focus-visible:outline-brand-navy flex min-h-11 items-center rounded-md px-2 font-medium focus-visible:outline-2"
                  href="/contact"
                  onClick={closeMenus}
                  prefetch={false}
                >
                  Contact
                </Link>
              </li>
            </ul>
            <Link
              className="bg-brand-navy text-primary-foreground hover:bg-brand-navy/90 focus-visible:outline-brand-navy mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-md px-4 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
              href="/sell-a-business"
              onClick={closeMenus}
              prefetch={false}
            >
              Free Valuation
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      <nav
        aria-label="Quick actions"
        className="border-border bg-card/95 fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-20px_var(--brand-navy)] backdrop-blur lg:hidden"
      >
        <Link
          className="border-border bg-card text-brand-navy focus-visible:outline-brand-navy inline-flex min-h-11 items-center justify-center rounded-md border px-3 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
          href="/businesses-for-sale"
          prefetch={false}
        >
          Explore listings
        </Link>
        <Link
          className="bg-brand-bronze text-primary-foreground focus-visible:outline-brand-navy inline-flex min-h-11 items-center justify-center rounded-md px-3 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
          href="/sell-a-business"
          prefetch={false}
        >
          Request valuation
        </Link>
      </nav>
    </>
  );
}
