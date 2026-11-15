"use client";

import Link from "next/link";
import { parseAsString, useQueryStates } from "nuqs";
import { ArrowRight, Compass } from "lucide-react";

import { franchisePathways } from "@/src/features/franchise/types";

const diagnosticParsers = {
  goal: parseAsString.withDefault("existing"),
  operatingStyle: parseAsString.withDefault("hands-on"),
  growth: parseAsString.withDefault("single"),
};

const selectClassName =
  "border-input bg-card text-brand-navy focus-visible:border-brand-navy focus-visible:ring-brand-navy/20 mt-1 min-h-11 w-full rounded-md border px-3 text-sm focus-visible:ring-2 focus-visible:outline-none";

export function recommendFranchisePathway(
  goal: string,
  operatingStyle: string,
  growth: string,
) {
  if (goal === "convert") return "CONVERSION";
  if (goal === "advice") return "CONSULTING";
  if (goal === "develop") {
    return growth === "regional" ? "MASTER_FRANCHISE" : "AREA_DEVELOPMENT";
  }
  if (goal === "existing") return "RESALE";
  if (operatingStyle === "multi-unit" && growth === "regional") {
    return "AREA_DEVELOPMENT";
  }
  return "SINGLE_UNIT";
}

export function FranchiseDiagnostic() {
  const [answers, setAnswers] = useQueryStates(diagnosticParsers, {
    history: "replace",
    shallow: true,
    scroll: false,
  });
  const recommended = recommendFranchisePathway(
    answers.goal,
    answers.operatingStyle,
    answers.growth,
  );
  const recommendation = franchisePathways.find(
    (option) => option.value === recommended,
  );
  const recommendationHref = `/franchise-opportunities?pathway=${recommended}#franchise-opportunities`;

  return (
    <section
      aria-labelledby="franchise-diagnostic-heading"
      className="bg-brand-navy text-primary-foreground grid gap-8 rounded-xl p-5 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"
      id="franchise-diagnostic"
    >
      <div>
        <p className="text-brand-gold inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase">
          <Compass aria-hidden="true" className="size-4" />
          Find your starting point
        </p>
        <h2
          className="font-heading mt-3 text-3xl leading-tight font-semibold sm:text-4xl"
          id="franchise-diagnostic-heading"
        >
          A pathway that starts with your goals
        </h2>
        <p className="text-primary-foreground/80 mt-4 text-sm leading-6">
          Answer a few questions for a discussion prompt—not a recommendation
          about a specific brand, investment, or expected result.
        </p>
      </div>

      <div className="border-primary-foreground/20 bg-card grid gap-4 rounded-lg border p-5 text-brand-navy sm:grid-cols-2 sm:p-6">
        <label
          className="text-brand-navy block text-sm font-semibold"
          htmlFor="franchise-diagnostic-goal"
        >
          What are you exploring?
          <select
            className={selectClassName}
            id="franchise-diagnostic-goal"
            onChange={(event) => void setAnswers({ goal: event.target.value })}
            value={answers.goal}
          >
            <option value="existing">An existing franchise business</option>
            <option value="new">A new franchise location</option>
            <option value="develop">Developing a territory</option>
            <option value="convert">Converting an existing business</option>
            <option value="advice">Help comparing franchise models</option>
          </select>
        </label>

        <label
          className="text-brand-navy block text-sm font-semibold"
          htmlFor="franchise-diagnostic-style"
        >
          How would you like to be involved?
          <select
            className={selectClassName}
            id="franchise-diagnostic-style"
            onChange={(event) =>
              void setAnswers({ operatingStyle: event.target.value })
            }
            value={answers.operatingStyle}
          >
            <option value="hands-on">Hands-on owner / operator</option>
            <option value="manager">Owner with a management team</option>
            <option value="multi-unit">Multi-unit development</option>
            <option value="undecided">Still deciding</option>
          </select>
        </label>

        <label
          className="text-brand-navy block text-sm font-semibold sm:col-span-2"
          htmlFor="franchise-diagnostic-growth"
        >
          What scale are you considering?
          <select
            className={selectClassName}
            id="franchise-diagnostic-growth"
            onChange={(event) => void setAnswers({ growth: event.target.value })}
            value={answers.growth}
          >
            <option value="single">One location or territory</option>
            <option value="multi">Several locations over time</option>
            <option value="regional">A broader regional territory</option>
          </select>
        </label>

        {recommendation ? (
          <div
            aria-live="polite"
            className="border-border bg-secondary mt-1 rounded-md border p-4 sm:col-span-2"
          >
            <p className="text-brand-bronze text-xs font-bold tracking-[0.12em] uppercase">
              A starting point to discuss
            </p>
            <h3 className="font-heading text-brand-navy mt-2 text-lg font-semibold">
              {recommendation.label}
            </h3>
            <p className="text-brand-slate mt-1 text-sm leading-5">
              {recommendation.description}
            </p>
            <Link
              className="bg-brand-navy text-primary-foreground hover:bg-brand-navy/90 focus-visible:outline-brand-bronze mt-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
              href={recommendationHref}
            >
              Explore matching opportunities
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
