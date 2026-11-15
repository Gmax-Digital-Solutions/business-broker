import "server-only";

import { Prisma } from "@/lib/generated/prisma/client";
import {
  franchiseMarkets,
  type FranchiseFilters,
  type PublicFranchiseOpportunity,
} from "@/src/features/franchise/types";
import { getPrismaClient } from "@/src/lib/prisma";

const PAGE_SIZE = 6;

const publicOpportunitySelect = {
  id: true,
  slug: true,
  title: true,
  pathway: true,
  sector: true,
  market: true,
  summary: true,
} satisfies Prisma.FranchiseOpportunitySelect;

const designPreviewOpportunities: PublicFranchiseOpportunity[] = [
  {
    id: "franchise-preview-resale",
    slug: "illustrative-franchise-resale",
    title: "Illustrative multi-unit franchise resale",
    pathway: "RESALE",
    sector: "FOOD_BEVERAGE",
    market: "SARASOTA",
    summary:
      "Illustrative preview content only. Brand, financial, and availability details are not verified and this is not a current offering.",
    illustrative: true,
  },
  {
    id: "franchise-preview-services",
    slug: "illustrative-business-services",
    title: "Illustrative business services territory",
    pathway: "SINGLE_UNIT",
    sector: "BUSINESS_SERVICES",
    market: "MANATEE",
    summary:
      "Illustrative preview content only. Brand, financial, and availability details are not verified and this is not a current offering.",
    illustrative: true,
  },
  {
    id: "franchise-preview-wellness",
    slug: "illustrative-wellness-resale",
    title: "Illustrative wellness franchise resale",
    pathway: "RESALE",
    sector: "HEALTH_WELLNESS",
    market: "SOUTHWEST_FLORIDA",
    summary:
      "Illustrative preview content only. Brand, financial, and availability details are not verified and this is not a current offering.",
    illustrative: true,
  },
];

function isDesignPreviewEnabled() {
  return process.env.FRANCHISE_DESIGN_PREVIEW === "true";
}

function getWhere(
  filters: FranchiseFilters,
): Prisma.FranchiseOpportunityWhereInput {
  const conditions: Prisma.FranchiseOpportunityWhereInput[] = [];

  if (filters.query) {
    conditions.push({
      OR: [
        { title: { contains: filters.query, mode: "insensitive" } },
        { summary: { contains: filters.query, mode: "insensitive" } },
        { sector: { contains: filters.query, mode: "insensitive" } },
      ],
    });
  }

  if (filters.pathway) {
    conditions.push({ pathway: filters.pathway });
  }

  if (filters.sector) {
    conditions.push({ sector: filters.sector });
  }

  if (filters.market === "SOUTHWEST_FLORIDA") {
    conditions.push({
      market: { in: ["SARASOTA", "MANATEE", "SOUTHWEST_FLORIDA"] },
    });
  } else if (filters.market) {
    const market = franchiseMarkets.find(
      (option) => option.value === filters.market,
    );
    if (market) conditions.push({ market: filters.market });
  }

  return {
    status: "ACTIVE",
    ...(conditions.length > 0 ? { AND: conditions } : {}),
  };
}

function filterPreviewOpportunities(filters: FranchiseFilters) {
  return designPreviewOpportunities.filter((opportunity) => {
    if (
      filters.query &&
      ![opportunity.title, opportunity.summary, opportunity.sector]
        .join(" ")
        .toLowerCase()
        .includes(filters.query.toLowerCase())
    ) {
      return false;
    }

    if (filters.pathway && opportunity.pathway !== filters.pathway) {
      return false;
    }

    if (filters.sector && opportunity.sector !== filters.sector) {
      return false;
    }

    if (
      filters.market &&
      filters.market !== "SOUTHWEST_FLORIDA" &&
      opportunity.market !== filters.market &&
      opportunity.market !== "SOUTHWEST_FLORIDA"
    ) {
      return false;
    }

    return true;
  });
}

export async function getFranchisePageData(filters: FranchiseFilters) {
  if (isDesignPreviewEnabled()) {
    const filtered = filterPreviewOpportunities(filters);
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const page = Math.min(filters.page, totalPages);
    const items = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return {
      featured: filtered.slice(0, 3),
      items,
      total,
      page,
      totalPages,
      isPreview: true,
    };
  }

  const prisma = getPrismaClient();
  const where = getWhere(filters);
  const [total, featuredRows] = await Promise.all([
    prisma.franchiseOpportunity.count({ where }),
    prisma.franchiseOpportunity.findMany({
      where: { AND: [where, { featured: true }] },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      take: 3,
      select: publicOpportunitySelect,
    }),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(filters.page, totalPages);
  const rows = await prisma.franchiseOpportunity.findMany({
    where,
    orderBy: [
      { featured: "desc" },
      { sortOrder: "asc" },
      { createdAt: "desc" },
    ],
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    select: publicOpportunitySelect,
  });

  return {
    featured: featuredRows.map((opportunity) => ({
      ...opportunity,
      illustrative: false,
    })),
    items: rows.map((opportunity) => ({
      ...opportunity,
      illustrative: false,
    })),
    total,
    page,
    totalPages,
    isPreview: false,
  };
}
