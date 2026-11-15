"use server";

import { z } from "zod";

import type { FranchiseActionState } from "@/src/features/franchise/types";
import { getPrismaClient } from "@/src/lib/prisma";

const inquirySchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name.").max(120),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Enter a valid email address.")),
  phone: z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === "" ? undefined : value,
    z
      .string()
      .trim()
      .max(40)
      .refine(
        (value) => /^\+?[\d ()-]{7,20}$/.test(value),
        "Enter a valid phone number.",
      )
      .optional(),
  ),
  preferredPathway: z.enum(
    [
      "CONSULTING",
      "SINGLE_UNIT",
      "MASTER_FRANCHISE",
      "AREA_DEVELOPMENT",
      "RESALE",
      "CONVERSION",
    ],
    { error: "Choose a franchise pathway." },
  ),
  market: z.enum(
    ["SARASOTA", "MANATEE", "SOUTHWEST_FLORIDA", "OTHER"],
    { error: "Choose a geographic focus." },
  ),
  sector: z.enum(
    [
      "FOOD_BEVERAGE",
      "BUSINESS_SERVICES",
      "HOME_SERVICES",
      "HEALTH_WELLNESS",
      "AUTOMOTIVE",
      "OTHER",
    ],
    { error: "Choose an industry sector." },
  ),
  capitalBand: z.enum(
    [
      "UNDECIDED",
      "UNDER_150K",
      "FROM_150K_TO_350K",
      "FROM_350K_TO_750K",
      "OVER_750K",
    ],
    { error: "Choose a preferred investment range." },
  ),
  timeframe: z.enum(
    ["IMMEDIATE", "WITHIN_SIX_MONTHS", "WITHIN_TWELVE_MONTHS", "RESEARCHING"],
    { error: "Choose a timeframe." },
  ),
  consent: z.literal("on", {
    error: "Please confirm you agree to be contacted about this request.",
  }),
});

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function getFieldErrors(
  error: z.ZodError,
): FranchiseActionState["fieldErrors"] {
  return error.flatten().fieldErrors;
}

export async function submitFranchiseStrategy(
  _previousState: FranchiseActionState,
  formData: FormData,
): Promise<FranchiseActionState> {
  const parsed = inquirySchema.safeParse({
    fullName: getFormValue(formData, "fullName"),
    email: getFormValue(formData, "email"),
    phone: getFormValue(formData, "phone"),
    preferredPathway: getFormValue(formData, "preferredPathway"),
    market: getFormValue(formData, "market"),
    sector: getFormValue(formData, "sector"),
    capitalBand: getFormValue(formData, "capitalBand"),
    timeframe: getFormValue(formData, "timeframe"),
    consent: getFormValue(formData, "consent"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Review the highlighted fields and try again.",
      fieldErrors: getFieldErrors(parsed.error),
    };
  }

  try {
    await getPrismaClient().franchiseStrategyRequest.create({
      data: {
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone ?? null,
        preferredPathway: parsed.data.preferredPathway,
        market: parsed.data.market,
        sector: parsed.data.sector,
        capitalBand: parsed.data.capitalBand,
        timeframe: parsed.data.timeframe,
        contactConsent: true,
      },
    });
  } catch (error) {
    console.error("Could not save the franchise strategy request.", error);
    return {
      status: "error",
      message: "We couldn't submit your request. Please try again.",
    };
  }

  return {
    status: "success",
    message:
      "Your strategy request has been received. An advisor can follow up about next steps.",
  };
}
