import "server-only";

import { Prisma } from "@/lib/generated/prisma/client";
import { getPrismaClient } from "@/src/lib/prisma";
import { demoFeaturedListings } from "@/src/features/home/data";
import {
  listingAreas,
  listingCredentials,
  type ListingFilters,
  type ListingCategoryCount,
  type ListingOption,
  type PublicListingSummary,
} from "@/src/features/listings/types";

const PAGE_SIZE = 9;
const designPreviewListings: PublicListingSummary[] = demoFeaturedListings.map(
  (listing, index) => ({
    id: `design-preview-${index + 1}`,
    slug: listing.slug,
    title: listing.title,
    category: listing.category,
    location: listing.location,
    credentials: listing.credentials,
  }),
);

function isDesignPreviewEnabled() {
  return process.env.BUSINESS_LISTINGS_DESIGN_PREVIEW === "true";
}

function getPreviewResult(filters: ListingFilters) {
  const listings = demoFeaturedListings
    .filter((listing) => {
      if (
        filters.query &&
        ![listing.title, listing.category, listing.location]
          .join(" ")
          .toLowerCase()
          .includes(filters.query.toLowerCase())
      ) {
        return false;
      }

      if (filters.industry && listing.category !== filters.industry) {
        return false;
      }

      if (filters.area) {
        const area = listingAreas.find((item) => item.value === filters.area);
        if (
          area &&
          !area.searchTerms.some((term) =>
            listing.location.toLowerCase().includes(term.toLowerCase()),
          )
        ) {
          return false;
        }
      }

      if (filters.credential) {
        const credential = listingCredentials.find(
          (item) => item.value === filters.credential,
        );
        if (
          credential &&
          !listing.credentials
            ?.toLowerCase()
            .includes(credential.searchTerm.toLowerCase())
        ) {
          return false;
        }
      }

      return (
        (filters.minPrice === undefined ||
          listing.askingPrice >= filters.minPrice) &&
        (filters.maxPrice === undefined ||
          listing.askingPrice <= filters.maxPrice) &&
        (filters.minCashFlow === undefined ||
          listing.cashFlow >= filters.minCashFlow)
      );
    })
    .sort((left, right) => {
      switch (filters.sort) {
        case "price-asc":
          return left.askingPrice - right.askingPrice;
        case "price-desc":
          return right.askingPrice - left.askingPrice;
        case "cash-flow-desc":
          return right.cashFlow - left.cashFlow;
        case "newest":
          return left.sortOrder - right.sortOrder;
        default:
          return left.sortOrder - right.sortOrder;
      }
    });

  const total = listings.length;
  const page = Math.min(filters.page, Math.max(1, Math.ceil(total / PAGE_SIZE)));
  const pageListings = listings.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const items = pageListings.flatMap((listing) => {
    const summary = designPreviewListings.find(
      (item) => item.slug === listing.slug,
    );
    return summary ? [summary] : [];
  });
  const categories = new Map<string, number>();

  for (const listing of designPreviewListings) {
    categories.set(
      listing.category,
      (categories.get(listing.category) ?? 0) + 1,
    );
  }

  return {
    items,
    total,
    page,
    categories: [...categories].map(([category, count]) => ({
      category,
      count,
    })),
  };
}

function getWhere(filters: ListingFilters): Prisma.BusinessListingWhereInput {
  const conditions: Prisma.BusinessListingWhereInput[] = [];

  if (filters.query) {
    conditions.push({
      OR: [
        { title: { contains: filters.query, mode: "insensitive" } },
        { category: { contains: filters.query, mode: "insensitive" } },
        { location: { contains: filters.query, mode: "insensitive" } },
      ],
    });
  }

  if (filters.industry) {
    conditions.push({ category: filters.industry });
  }

  if (filters.area) {
    const area = listingAreas.find((item) => item.value === filters.area);
    if (area) {
      conditions.push({
        OR: area.searchTerms.map((term) => ({
          location: { contains: term, mode: "insensitive" },
        })),
      });
    }
  }

  if (filters.credential) {
    const credential = listingCredentials.find(
      (item) => item.value === filters.credential,
    );
    if (credential) {
      conditions.push({
        credentials: { contains: credential.searchTerm, mode: "insensitive" },
      });
    }
  }

  if (
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined
  ) {
    conditions.push({
      askingPrice: {
        ...(filters.minPrice !== undefined ? { gte: filters.minPrice } : {}),
        ...(filters.maxPrice !== undefined ? { lte: filters.maxPrice } : {}),
      },
    });
  }

  if (filters.minCashFlow !== undefined) {
    conditions.push({ cashFlow: { gte: filters.minCashFlow } });
  }

  return {
    status: "ACTIVE",
    ...(conditions.length > 0 ? { AND: conditions } : {}),
  };
}

function getOrderBy(
  sort: ListingFilters["sort"],
): Prisma.BusinessListingOrderByWithRelationInput[] {
  switch (sort) {
    case "price-asc":
      return [{ askingPrice: "asc" }, { sortOrder: "asc" }];
    case "price-desc":
      return [{ askingPrice: "desc" }, { sortOrder: "asc" }];
    case "cash-flow-desc":
      return [{ cashFlow: "desc" }, { sortOrder: "asc" }];
    case "newest":
      return [{ createdAt: "desc" }];
    default:
      return [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }];
  }
}

export async function getBusinessListings(filters: ListingFilters): Promise<{
  items: PublicListingSummary[];
  total: number;
  categories: ListingCategoryCount[];
  page: number;
}> {
  if (isDesignPreviewEnabled()) {
    return getPreviewResult(filters);
  }

  const prisma = getPrismaClient();
  const where = getWhere(filters);
  const [total, categoryRows] = await Promise.all([
    prisma.businessListing.count({ where }),
    prisma.businessListing.groupBy({
      by: ["category"],
      where: { status: "ACTIVE" },
      _count: { _all: true },
      orderBy: { category: "asc" },
    }),
  ]);
  const page = Math.min(
    filters.page,
    Math.max(1, Math.ceil(total / PAGE_SIZE)),
  );
  const rows = await prisma.businessListing.findMany({
    where,
    orderBy: getOrderBy(filters.sort),
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    select: {
      id: true,
      slug: true,
      title: true,
      category: true,
      location: true,
      credentials: true,
    },
  });

  return {
    items: rows,
    total,
    page,
    categories: categoryRows.map(({ category, _count }) => ({
      category,
      count: _count._all,
    })),
  };
}

export async function getListingOptions(): Promise<ListingOption[]> {
  if (isDesignPreviewEnabled()) {
    return designPreviewListings.map(({ slug, title }) => ({ slug, title }));
  }

  const rows = await getPrismaClient().businessListing.findMany({
    where: { status: "ACTIVE" },
    orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
    select: { slug: true, title: true },
  });

  return rows;
}

export async function getListingOption(
  slug: string,
): Promise<ListingOption | null> {
  if (!slug) {
    return null;
  }

  if (isDesignPreviewEnabled()) {
    return (
      designPreviewListings.find((listing) => listing.slug === slug) ?? null
    );
  }

  return getPrismaClient().businessListing.findFirst({
    where: { slug, status: "ACTIVE" },
    select: { slug: true, title: true },
  });
}
