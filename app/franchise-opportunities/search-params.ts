import { z } from "zod";

import {
  franchiseMarkets,
  franchisePathways,
  franchiseSectors,
  type FranchiseFilters,
} from "@/src/features/franchise/types";

type SearchParams = Record<string, string | string[] | undefined>;

const filtersSchema = z.object({
  query: z.string().trim().max(100).catch(""),
  pathway: z
    .enum(["", ...franchisePathways.map((option) => option.value)])
    .catch(""),
  sector: z
    .enum(["", ...franchiseSectors.map((option) => option.value)])
    .catch(""),
  market: z
    .enum(["", ...franchiseMarkets.map((option) => option.value)])
    .catch(""),
  page: z.coerce.number().int().min(1).max(1000).catch(1),
});

function getSingleValue(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export function parseFranchiseFilters(params: SearchParams): FranchiseFilters {
  return filtersSchema.parse({
    query: getSingleValue(params.q),
    pathway: getSingleValue(params.pathway),
    sector: getSingleValue(params.sector),
    market: getSingleValue(params.market),
    page: getSingleValue(params.page),
  });
}
