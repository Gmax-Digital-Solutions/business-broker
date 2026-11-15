import "server-only";

import { Prisma } from "@/lib/generated/prisma/client";
import { getPrismaClient } from "@/src/lib/prisma";
import { demoFeaturedListings } from "@/src/features/home/data";
import type { PublicListingSummary } from "@/src/features/listings/types";

const publicListingSelect = {
  id: true,
  slug: true,
  title: true,
  category: true,
  location: true,
  credentials: true,
} satisfies Prisma.BusinessListingSelect;

const previewListings: PublicListingSummary[] = demoFeaturedListings.map(
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

export async function getPublicBusinessListing(
  slug: string,
): Promise<PublicListingSummary | null> {
  if (isDesignPreviewEnabled()) {
    return previewListings.find((listing) => listing.slug === slug) ?? null;
  }

  return getPrismaClient().businessListing.findFirst({
    where: { slug, status: "ACTIVE" },
    select: publicListingSelect,
  });
}

export async function getRelatedPublicBusinessListings(
  slug: string,
): Promise<PublicListingSummary[]> {
  if (isDesignPreviewEnabled()) {
    return previewListings
      .filter((listing) => listing.slug !== slug)
      .slice(0, 3);
  }

  return getPrismaClient().businessListing.findMany({
    where: { status: "ACTIVE", slug: { not: slug } },
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { title: "asc" }],
    take: 3,
    select: publicListingSelect,
  });
}
