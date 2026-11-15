import { z } from "zod";

import {
  commercialAreas,
  commercialPropertyTypes,
  commercialTransactions,
  type CommercialFilters,
} from "@/src/features/commercial/types";

type SearchParams = Record<string, string | string[] | undefined>;

const optionalArea = z
  .preprocess(
    (value) => (value === "" || value == null ? undefined : value),
    z.coerce.number().int().min(0).max(100_000_000).optional(),
  )
  .catch(undefined);

const filterSchema = z.object({
  query: z.string().trim().max(100).catch(""),
  propertyType: z
    .enum(["", ...commercialPropertyTypes.map((option) => option.value)])
    .catch(""),
  area: z
    .enum(["", ...commercialAreas.map((option) => option.value)])
    .catch(""),
  transaction: z
    .enum(["", ...commercialTransactions.map((option) => option.value)])
    .catch(""),
  minArea: optionalArea,
  maxArea: optionalArea,
  sort: z.enum(["featured", "newest", "size-desc"]).catch("featured"),
  page: z.coerce.number().int().min(1).max(1000).catch(1),
});

function getSingleValue(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export function parseCommercialFilters(
  params: SearchParams,
): CommercialFilters {
  const parsed = filterSchema.parse({
    query: getSingleValue(params.q),
    propertyType: getSingleValue(params.propertyType),
    area: getSingleValue(params.area),
    transaction: getSingleValue(params.transaction),
    minArea: getSingleValue(params.minArea),
    maxArea: getSingleValue(params.maxArea),
    sort: getSingleValue(params.sort),
    page: getSingleValue(params.page),
  });

  const maxArea =
    parsed.minArea !== undefined &&
    parsed.maxArea !== undefined &&
    parsed.maxArea < parsed.minArea
      ? undefined
      : parsed.maxArea;

  return { ...parsed, maxArea };
}
