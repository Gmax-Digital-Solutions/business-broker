"use server";

import { z } from "zod";

import { getPrismaClient } from "@/src/lib/prisma";
import type { LeadActionState } from "@/src/features/listings/types";

const alertSchema = z
  .object({
    email: z.email("Enter a valid email address.").trim().toLowerCase(),
    keyword: z.string().trim().max(100).optional(),
    industry: z.string().trim().max(80).optional(),
    geography: z.string().trim().max(40).optional(),
    minimumAskingPrice: z.preprocess(
      (value) => (value === "" || value == null ? undefined : value),
      z.coerce.number().int().min(0).max(100_000_000).optional(),
    ),
    maximumAskingPrice: z.preprocess(
      (value) => (value === "" || value == null ? undefined : value),
      z.coerce.number().int().min(0).max(100_000_000).optional(),
    ),
    minimumCashFlow: z.preprocess(
      (value) => (value === "" || value == null ? undefined : value),
      z.coerce.number().int().min(0).max(100_000_000).optional(),
    ),
    consent: z.literal("on", {
      error: "Please confirm you want to receive follow-up about this search.",
    }),
  })
  .refine(
    (values) =>
      values.minimumAskingPrice === undefined ||
      values.maximumAskingPrice === undefined ||
      values.minimumAskingPrice <= values.maximumAskingPrice,
    {
      path: ["maximumAskingPrice"],
      message: "Maximum asking price must be greater than the minimum.",
    },
  );

const criteriaSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name.").max(120),
  contact: z
    .string()
    .trim()
    .min(5, "Enter a valid email address or phone number.")
    .max(254)
    .refine(
      (value) =>
        value.length < 5 ||
        z.email().safeParse(value).success ||
        /^\+?[\d ()-]{7,20}$/.test(value),
      "Enter a valid email address or phone number.",
    ),
  targetIndustry: z
    .string()
    .trim()
    .min(1, "Choose a target industry.")
    .max(80),
  minimumSde: z
    .string()
    .trim()
    .min(1, "Select a cash flow target.")
    .max(80),
  liquidEquity: z
    .string()
    .trim()
    .min(1, "Select your available liquid equity.")
    .max(80),
  geographicFocus: z
    .string()
    .trim()
    .min(1, "Select a geographic focus.")
    .max(80),
  targetListingSlug: z.string().trim().max(100).optional(),
  consent: z.literal("on", {
    error: "Please confirm you want us to follow up about your criteria.",
  }),
});

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : undefined;
}

function getFieldErrors(error: z.ZodError): LeadActionState["fieldErrors"] {
  return error.flatten().fieldErrors;
}

export async function saveListingSearch(
  _previousState: LeadActionState,
  formData: FormData,
): Promise<LeadActionState> {
  const parsed = alertSchema.safeParse({
    email: getFormValue(formData, "email"),
    keyword: getFormValue(formData, "keyword"),
    industry: getFormValue(formData, "industry"),
    geography: getFormValue(formData, "geography"),
    minimumAskingPrice: getFormValue(formData, "minimumAskingPrice"),
    maximumAskingPrice: getFormValue(formData, "maximumAskingPrice"),
    minimumCashFlow: getFormValue(formData, "minimumCashFlow"),
    consent: getFormValue(formData, "consent"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Review the highlighted fields and try again.",
      fieldErrors: getFieldErrors(parsed.error),
    };
  }

  const {
    email,
    keyword,
    industry,
    geography,
    minimumAskingPrice,
    maximumAskingPrice,
    minimumCashFlow,
  } = parsed.data;

  try {
    await getPrismaClient().listingSearchAlert.create({
      data: {
        email,
        keyword: keyword || null,
        industry: industry || null,
        geography: geography || null,
        minimumAskingPrice,
        maximumAskingPrice,
        minimumCashFlow,
      },
    });
  } catch (error) {
    console.error("Could not save the listing search alert.", error);
    return {
      status: "error",
      message: "We couldn't save your search. Please try again.",
    };
  }

  return {
    status: "success",
    message: "Your search is saved. An advisor can follow up about matching opportunities.",
  };
}

export async function submitBuyerCriteria(
  _previousState: LeadActionState,
  formData: FormData,
): Promise<LeadActionState> {
  const parsed = criteriaSchema.safeParse({
    fullName: getFormValue(formData, "fullName") ?? "",
    contact: getFormValue(formData, "contact") ?? "",
    targetIndustry: getFormValue(formData, "targetIndustry") ?? "",
    minimumSde: getFormValue(formData, "minimumSde") ?? "",
    liquidEquity: getFormValue(formData, "liquidEquity") ?? "",
    geographicFocus: getFormValue(formData, "geographicFocus") ?? "",
    targetListingSlug: getFormValue(formData, "targetListingSlug"),
    consent: getFormValue(formData, "consent"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Review the highlighted fields and try again.",
      fieldErrors: getFieldErrors(parsed.error),
    };
  }

  const targetListingSlug = parsed.data.targetListingSlug || null;

  try {
    const prisma = getPrismaClient();

    if (targetListingSlug) {
      const activeListing = await prisma.businessListing.findFirst({
        where: { slug: targetListingSlug, status: "ACTIVE" },
        select: { id: true },
      });

      if (!activeListing) {
        return {
          status: "error",
          message: "That opportunity is no longer available. Please choose another.",
          fieldErrors: {
            targetListingSlug: ["Choose an active opportunity."],
          },
        };
      }
    }

    await prisma.buyerCriteriaRequest.create({
      data: {
        fullName: parsed.data.fullName,
        contact: parsed.data.contact,
        targetIndustry: parsed.data.targetIndustry,
        minimumSde: parsed.data.minimumSde,
        liquidEquity: parsed.data.liquidEquity,
        geographicFocus: parsed.data.geographicFocus,
        targetListingSlug,
      },
    });
  } catch (error) {
    console.error("Could not save the buyer criteria request.", error);
    return {
      status: "error",
      message: "We couldn't submit your request. Please try again.",
    };
  }

  return {
    status: "success",
    message: "Your request has been submitted. An advisor will follow up.",
  };
}
