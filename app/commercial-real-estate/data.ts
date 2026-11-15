import "server-only";

import { Prisma } from "@/lib/generated/prisma/client";
import {
  commercialAreas,
  type CommercialFilters,
  type PublicCommercialProperty,
} from "@/src/features/commercial/types";
import { getPrismaClient } from "@/src/lib/prisma";

const PAGE_SIZE = 6;

const publicPropertySelect = {
  id: true,
  title: true,
  propertyType: true,
  county: true,
  summary: true,
  transactionType: true,
  buildingAreaSqFt: true,
} satisfies Prisma.CommercialPropertySelect;

const designPreviewProperties: (PublicCommercialProperty & {
  featured: boolean;
  sortOrder: number;
})[] = [
  {
    id: "commercial-preview-industrial",
    title: "Illustrative industrial opportunity",
    propertyType: "INDUSTRIAL",
    county: "Manatee",
    summary:
      "Illustrative preview content only. Property details have not been verified and are not an offering.",
    transactionType: "SALE",
    buildingAreaSqFt: null,
    illustrative: true,
    featured: true,
    sortOrder: 1,
  },
  {
    id: "commercial-preview-office",
    title: "Illustrative office property",
    propertyType: "OFFICE",
    county: "Sarasota",
    summary:
      "Illustrative preview content only. Property details have not been verified and are not an offering.",
    transactionType: "LEASE",
    buildingAreaSqFt: null,
    illustrative: true,
    featured: true,
    sortOrder: 2,
  },
  {
    id: "commercial-preview-retail",
    title: "Illustrative mixed-use property",
    propertyType: "RETAIL",
    county: "Sarasota",
    summary:
      "Illustrative preview content only. Property details have not been verified and are not an offering.",
    transactionType: "SALE",
    buildingAreaSqFt: null,
    illustrative: true,
    featured: true,
    sortOrder: 3,
  },
  {
    id: "commercial-preview-multifamily",
    title: "Illustrative multifamily property",
    propertyType: "MULTIFAMILY",
    county: "Manatee",
    summary:
      "Illustrative preview content only. Property details have not been verified and are not an offering.",
    transactionType: "SALE",
    buildingAreaSqFt: null,
    illustrative: true,
    featured: false,
    sortOrder: 4,
  },
  {
    id: "commercial-preview-land",
    title: "Illustrative land opportunity",
    propertyType: "LAND",
    county: "Manatee",
    summary:
      "Illustrative preview content only. Property details have not been verified and are not an offering.",
    transactionType: "SALE",
    buildingAreaSqFt: null,
    illustrative: true,
    featured: false,
    sortOrder: 5,
  },
];

function isDesignPreviewEnabled() {
  return process.env.COMMERCIAL_PROPERTY_DESIGN_PREVIEW === "true";
}

function getWhere(
  filters: CommercialFilters,
): Prisma.CommercialPropertyWhereInput {
  const conditions: Prisma.CommercialPropertyWhereInput[] = [];

  if (filters.query) {
    conditions.push({
      OR: [
        { title: { contains: filters.query, mode: "insensitive" } },
        { summary: { contains: filters.query, mode: "insensitive" } },
        { county: { contains: filters.query, mode: "insensitive" } },
      ],
    });
  }

  if (filters.propertyType) {
    conditions.push({ propertyType: filters.propertyType });
  }

  if (filters.transaction) {
    conditions.push({ transactionType: filters.transaction });
  }

  if (filters.area) {
    const area = commercialAreas.find(
      (option) => option.value === filters.area,
    );
    if (area && area.searchTerms.length > 0) {
      conditions.push({
        OR: area.searchTerms.map((term) => ({
          county: { contains: term, mode: "insensitive" },
        })),
      });
    }
  }

  if (filters.minArea !== undefined || filters.maxArea !== undefined) {
    conditions.push({
      buildingAreaSqFt: {
        ...(filters.minArea !== undefined ? { gte: filters.minArea } : {}),
        ...(filters.maxArea !== undefined ? { lte: filters.maxArea } : {}),
      },
    });
  }

  return {
    status: "ACTIVE",
    ...(conditions.length > 0 ? { AND: conditions } : {}),
  };
}

function getOrderBy(
  sort: CommercialFilters["sort"],
): Prisma.CommercialPropertyOrderByWithRelationInput[] {
  switch (sort) {
    case "newest":
      return [{ createdAt: "desc" }];
    case "size-desc":
      return [
        { buildingAreaSqFt: "desc" },
        { sortOrder: "asc" },
        { createdAt: "desc" },
      ];
    default:
      return [
        { featured: "desc" },
        { sortOrder: "asc" },
        { createdAt: "desc" },
      ];
  }
}

function getPreviewProperties(filters: CommercialFilters) {
  return designPreviewProperties
    .filter((property) => {
      if (
        filters.query &&
        ![property.title, property.summary, property.county]
          .join(" ")
          .toLowerCase()
          .includes(filters.query.toLowerCase())
      ) {
        return false;
      }

      if (
        filters.propertyType &&
        property.propertyType !== filters.propertyType
      ) {
        return false;
      }

      if (
        filters.transaction &&
        property.transactionType !== filters.transaction
      ) {
        return false;
      }

      if (filters.area) {
        const area = commercialAreas.find(
          (option) => option.value === filters.area,
        );
        if (
          area &&
          area.searchTerms.length > 0 &&
          !area.searchTerms.some((term) =>
            property.county.toLowerCase().includes(term.toLowerCase()),
          )
        ) {
          return false;
        }
      }

      if (
        filters.minArea !== undefined &&
        (property.buildingAreaSqFt === null ||
          property.buildingAreaSqFt < filters.minArea)
      ) {
        return false;
      }

      if (
        filters.maxArea !== undefined &&
        (property.buildingAreaSqFt === null ||
          property.buildingAreaSqFt > filters.maxArea)
      ) {
        return false;
      }

      return true;
    })
    .sort((left, right) => {
      switch (filters.sort) {
        case "newest":
          return left.sortOrder - right.sortOrder;
        case "size-desc":
          return (
            (right.buildingAreaSqFt ?? 0) - (left.buildingAreaSqFt ?? 0)
          );
        default:
          return (
            Number(right.featured) - Number(left.featured) ||
            left.sortOrder - right.sortOrder
          );
      }
    });
}

export async function getCommercialPageData(filters: CommercialFilters) {
  if (isDesignPreviewEnabled()) {
    const filtered = getPreviewProperties(filters);
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const page = Math.min(filters.page, totalPages);

    return {
      featured: designPreviewProperties
        .filter((property) => property.featured)
        .slice(0, 3),
      items: filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
      total,
      page,
      totalPages,
      isPreview: true,
    };
  }

  const prisma = getPrismaClient();
  const where = getWhere(filters);
  const [featuredRows, total] = await Promise.all([
    prisma.commercialProperty.findMany({
      where: { status: "ACTIVE", featured: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      take: 3,
      select: publicPropertySelect,
    }),
    prisma.commercialProperty.count({ where }),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(filters.page, totalPages);
  const rows = await prisma.commercialProperty.findMany({
    where,
    orderBy: getOrderBy(filters.sort),
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    select: publicPropertySelect,
  });

  return {
    featured: featuredRows.map((property) => ({
      ...property,
      illustrative: false,
    })),
    items: rows.map((property) => ({
      ...property,
      illustrative: false,
    })),
    total,
    page,
    totalPages,
    isPreview: false,
  };
}
