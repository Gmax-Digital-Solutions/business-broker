"use server";

import { z } from "zod";

import { getPrismaClient } from "@/src/lib/prisma";
import type { LeadActionState } from "@/src/features/listings/types";
import { listingAreas } from "@/src/features/listings/types";
import {
  annualCashFlowRanges,
  annualRevenueRanges,
  preferredContactMethods,
  saleTimelines,
  valuationIndustries,
} from "@/src/features/seller/valuation-options";

const selection = (options: readonly { value: string }[], message: string) =>
  z
    .string()
    .refine(
      (value) => options.some((option) => option.value === value),
      message,
    );

const consentSchema = z.literal("on", {
  error: "Please confirm you agree to be contacted about this request.",
});
const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email("Enter a valid email address."));

const quickValuationSchema = z.object({
  email: emailSchema,
  industry: selection(valuationIndustries, "Choose an industry."),
  location: selection(listingAreas, "Choose a location."),
  annualRevenueRange: selection(
    annualRevenueRanges,
    "Select an annual revenue range.",
  ),
  consent: consentSchema,
});

const fullValuationSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name.").max(120),
  email: emailSchema,
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d ()-]{7,20}$/, "Enter a valid phone number."),
  industry: selection(valuationIndustries, "Choose an industry."),
  location: selection(listingAreas, "Choose a location."),
  annualRevenueRange: selection(
    annualRevenueRanges,
    "Select an annual revenue range.",
  ),
  annualCashFlowRange: selection(
    annualCashFlowRanges,
    "Select an annual cash flow range.",
  ),
  saleTimeline: selection(saleTimelines, "Choose a sale timeline."),
  preferredContact: selection(
    preferredContactMethods,
    "Choose a preferred contact method.",
  ),
  consent: consentSchema,
});

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function getFieldErrors(error: z.ZodError): LeadActionState["fieldErrors"] {
  return error.flatten().fieldErrors;
}

type ValuationRequestData = {
  fullName: string | null;
  email: string;
  phone: string | null;
  industry: string;
  location: string;
  annualRevenueRange: string;
  annualCashFlowRange: string | null;
  saleTimeline: string | null;
  preferredContact: string | null;
  contactConsent: boolean;
};

async function saveValuationRequest(
  data: ValuationRequestData,
): Promise<LeadActionState> {
  try {
    await getPrismaClient().sellerValuationRequest.create({ data });
  } catch (error) {
    console.error("Could not save the seller valuation request.", error);
    return {
      status: "error",
      message: "We couldn't submit your request. Please try again.",
    };
  }

  return {
    status: "success",
    message:
      "Your request has been received. An advisor can follow up to discuss next steps.",
  };
}

export async function submitQuickValuation(
  _previousState: LeadActionState,
  formData: FormData,
): Promise<LeadActionState> {
  const parsed = quickValuationSchema.safeParse({
    email: getFormValue(formData, "email"),
    industry: getFormValue(formData, "industry"),
    location: getFormValue(formData, "location"),
    annualRevenueRange: getFormValue(formData, "annualRevenueRange"),
    consent: getFormValue(formData, "consent"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Review the highlighted fields and try again.",
      fieldErrors: getFieldErrors(parsed.error),
    };
  }

  return saveValuationRequest({
    fullName: null,
    email: parsed.data.email,
    phone: null,
    industry: parsed.data.industry,
    location: parsed.data.location,
    annualRevenueRange: parsed.data.annualRevenueRange,
    annualCashFlowRange: null,
    saleTimeline: null,
    preferredContact: null,
    contactConsent: true,
  });
}

export async function submitFullValuation(
  _previousState: LeadActionState,
  formData: FormData,
): Promise<LeadActionState> {
  const parsed = fullValuationSchema.safeParse({
    fullName: getFormValue(formData, "fullName"),
    email: getFormValue(formData, "email"),
    phone: getFormValue(formData, "phone"),
    industry: getFormValue(formData, "industry"),
    location: getFormValue(formData, "location"),
    annualRevenueRange: getFormValue(formData, "annualRevenueRange"),
    annualCashFlowRange: getFormValue(formData, "annualCashFlowRange"),
    saleTimeline: getFormValue(formData, "saleTimeline"),
    preferredContact: getFormValue(formData, "preferredContact"),
    consent: getFormValue(formData, "consent"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Review the highlighted fields and try again.",
      fieldErrors: getFieldErrors(parsed.error),
    };
  }

  return saveValuationRequest({
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    industry: parsed.data.industry,
    location: parsed.data.location,
    annualRevenueRange: parsed.data.annualRevenueRange,
    annualCashFlowRange: parsed.data.annualCashFlowRange,
    saleTimeline: parsed.data.saleTimeline,
    preferredContact: parsed.data.preferredContact,
    contactConsent: true,
  });
}
