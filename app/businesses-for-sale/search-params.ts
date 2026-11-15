import { z } from "zod";

import {
  listingAreas,
  listingCredentials,
  listingSorts,
  type ListingFilters,
} from "@/src/features/listings/types";

type SearchParams = Record<string, string | string[] | undefined>;

const filterSchema = z.object({
  query: z.string().trim().max(100).catch(""),
  industry: z.string().trim().max(80).catch(""),
  area: z
    .enum(["", ...listingAreas.map((area) => area.value)])
    .catch(""),
  credential: z
    .enum(["", ...listingCredentials.map((credential) => credential.value)])
    .catch(""),
  sort: z
    .enum(listingSorts.map((sort) => sort.value))
    .catch("featured"),
  page: z.coerce.number().int().min(1).max(1000).catch(1),
  minPrice: z.coerce.number().int().min(0).max(100_000_000).optional().catch(undefined),
  maxPrice: z.coerce.number().int().min(0).max(100_000_000).optional().catch(undefined),
  minCashFlow: z.coerce.number().int().min(0).max(100_000_000).optional().catch(undefined),
  view: z.enum(["grid", "list"]).catch("grid"),
});

function getSingleValue(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export function parseListingFilters(params: SearchParams): ListingFilters {
  const parsed = filterSchema.parse({
    query: getSingleValue(params.q),
    industry: getSingleValue(params.industry),
    area: getSingleValue(params.area),
    credential: getSingleValue(params.credential),
    sort: getSingleValue(params.sort),
    page: getSingleValue(params.page),
    minPrice: getSingleValue(params.minPrice),
    maxPrice: getSingleValue(params.maxPrice),
    minCashFlow: getSingleValue(params.minCashFlow),
    view: getSingleValue(params.view),
  });

  const maxPrice =
    parsed.minPrice !== undefined &&
    parsed.maxPrice !== undefined &&
    parsed.maxPrice < parsed.minPrice
      ? undefined
      : parsed.maxPrice;

  return { ...parsed, maxPrice };
}

export function parseRequestedListing(params: SearchParams) {
  const value = getSingleValue(params.interest);
  return z.string().trim().max(100).catch("").parse(value);
}
