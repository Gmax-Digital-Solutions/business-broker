import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { getPrismaClient } from "@/src/lib/prisma";
import type { FeaturedListing } from "./types";

export async function getFeaturedListings(): Promise<FeaturedListing[]> {
  "use cache";

  cacheLife("hours");
  cacheTag("featured-listings");

  return getPrismaClient().businessListing.findMany({
    where: { featured: true, status: "ACTIVE" },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    take: 3,
    select: {
      id: true,
      slug: true,
      title: true,
      category: true,
      location: true,
      credentials: true,
      cashFlow: true,
      revenue: true,
      askingPrice: true,
    },
  });
}
