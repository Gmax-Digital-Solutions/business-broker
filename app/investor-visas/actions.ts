"use server";

import { z } from "zod";

import type { InvestorVisaActionState } from "@/src/features/investor-visas/types";
import { getPrismaClient } from "@/src/lib/prisma";

const inquirySchema = z.object({
  fullName: z.string().trim().min(2, "Enter your name.").max(120),
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
  pathway: z.enum(
    ["E2", "EB5_DIRECT", "EB5_REGIONAL_CENTER", "L1A", "UNDECIDED"],
    { error: "Choose an area of interest." },
  ),
  businessPlan: z.enum(
    ["ACQUIRE_BUSINESS", "START_BUSINESS", "RESEARCHING"],
    { error: "Choose a business plan." },
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
): InvestorVisaActionState["fieldErrors"] {
  return error.flatten().fieldErrors;
}

export async function submitInvestorVisaConsultation(
  _previousState: InvestorVisaActionState,
  formData: FormData,
): Promise<InvestorVisaActionState> {
  const parsed = inquirySchema.safeParse({
    fullName: getFormValue(formData, "fullName"),
    email: getFormValue(formData, "email"),
    phone: getFormValue(formData, "phone"),
    pathway: getFormValue(formData, "pathway"),
    businessPlan: getFormValue(formData, "businessPlan"),
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
    await getPrismaClient().investorVisaConsultationRequest.create({
      data: {
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone ?? null,
        pathway: parsed.data.pathway,
        businessPlan: parsed.data.businessPlan,
        contactConsent: true,
      },
    });
  } catch (error) {
    console.error("Could not save the investor visa business inquiry.", error);
    return {
      status: "error",
      message: "We couldn't submit your request. Please try again.",
    };
  }

  return {
    status: "success",
    message:
      "Your business inquiry has been received. We can follow up about brokerage next steps. This is not an immigration legal consultation.",
  };
}
