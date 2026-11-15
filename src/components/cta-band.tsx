import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type CtaBandProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  tone?: "navy" | "bronze";
};

export function CtaBand({
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  tone = "navy",
}: CtaBandProps) {
  const inverse = tone === "navy";
  const centered = tone === "bronze";

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        inverse ? "bg-brand-navy" : "bg-brand-bronze",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24",
          centered
            ? "items-center text-center"
            : "lg:flex-row lg:items-center lg:justify-between",
        )}
      >
        <div className={cn("max-w-3xl", centered && "mx-auto")}>
          {eyebrow ? (
            <p
              className={cn(
                "font-heading mb-4 text-xs font-bold tracking-[0.16em] uppercase",
                inverse ? "text-brand-gold" : "text-primary-foreground",
              )}
            >
              {eyebrow}
            </p>
          ) : null}
          <h2 className="font-heading text-primary-foreground text-3xl leading-tight font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p
            className={cn(
              "text-primary-foreground/85 mt-4 max-w-2xl text-base leading-7 sm:text-lg",
              centered && "mx-auto",
            )}
          >
            {description}
          </p>
        </div>
        <div
          className={cn(
            "flex shrink-0 flex-col gap-3 sm:flex-row",
            centered
              ? "items-center justify-center"
              : "lg:flex-col xl:flex-row",
          )}
        >
          <Link
            className={cn(
              "inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 text-center font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4",
              centered
                ? "bg-brand-navy text-primary-foreground hover:bg-brand-navy/90 focus-visible:outline-primary-foreground"
                : "bg-card text-brand-navy hover:bg-brand-offwhite focus-visible:outline-primary-foreground",
            )}
            href={primaryHref}
            prefetch={false}
          >
            {primaryLabel}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
          {secondaryLabel && secondaryHref ? (
            <Link
              className="border-primary-foreground/60 text-primary-foreground hover:bg-primary-foreground/10 focus-visible:outline-primary-foreground inline-flex min-h-12 items-center justify-center rounded-md border px-5 py-3 text-center font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
              href={secondaryHref}
              prefetch={false}
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
