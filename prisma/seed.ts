import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";
import { demoFeaturedListings } from "../src/features/home/data";

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    "DIRECT_URL or DATABASE_URL is required to seed featured listings.",
  );
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  for (const listing of demoFeaturedListings) {
    const { slug, ...data } = listing;

    await prisma.businessListing.upsert({
      where: { slug },
      update: data,
      create: { slug, ...data },
    });
  }
}

main()
  .catch((error: unknown) => {
    console.error("Failed to seed featured listings.", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
