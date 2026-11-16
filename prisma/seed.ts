import { faker } from "@faker-js/faker";
import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../lib/generated/prisma/client";
import {
  buildBusinessListingSeedRows,
  buildCommercialPropertySeedRows,
  buildFranchiseSeedRows,
  summarizeBusinessListings,
} from "./seed/generators";
import { ensureSampleSvgAssets } from "./seed/images";

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DIRECT_URL or DATABASE_URL is required to seed sample data.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

const BUSINESS_BATCH_SIZE = 25;
const COMMERCIAL_BATCH_SIZE = 20;
const FRANCHISE_BATCH_SIZE = 12;

async function resetSeededRecords() {
  await prisma.$transaction(async (tx) => {
    await tx.businessListing.deleteMany({ where: { id: { startsWith: "BBW-" } } });
    await tx.commercialProperty.deleteMany({ where: { id: { startsWith: "BBW-" } } });
    await tx.franchiseOpportunity.deleteMany({ where: { id: { startsWith: "BBW-" } } });
  });
}

async function seedBusinessListings() {
  const rows = buildBusinessListingSeedRows();
  for (let index = 0; index < rows.length; index += BUSINESS_BATCH_SIZE) {
    const chunk = rows.slice(index, index + BUSINESS_BATCH_SIZE);
    await prisma.businessListing.createMany({
      data: chunk.map((row) => ({
        id: row.id,
        slug: row.slug,
        title: row.title,
        category: row.category,
        location: row.location,
        credentials: row.credentials,
        cashFlow: row.cashFlow,
        revenue: row.revenue,
        askingPrice: row.askingPrice,
        status: row.status,
        featured: row.featured,
        sortOrder: row.sortOrder,
      })),
      skipDuplicates: true,
    });
  }
  return rows;
}

async function seedCommercialProperties() {
  const rows = buildCommercialPropertySeedRows();
  for (let index = 0; index < rows.length; index += COMMERCIAL_BATCH_SIZE) {
    const chunk = rows.slice(index, index + COMMERCIAL_BATCH_SIZE);
    await prisma.commercialProperty.createMany({
      data: chunk.map((row) => ({
        id: row.id,
        slug: row.slug,
        title: row.title,
        propertyType: row.propertyType,
        county: row.county,
        summary: row.summary,
        transactionType: row.transactionType,
        buildingAreaSqFt: row.buildingAreaSqFt,
        featured: row.featured,
        sortOrder: row.sortOrder,
        status: row.status,
      })),
      skipDuplicates: true,
    });
  }
  return rows;
}

async function seedFranchiseOpportunities() {
  const rows = buildFranchiseSeedRows();
  for (let index = 0; index < rows.length; index += FRANCHISE_BATCH_SIZE) {
    const chunk = rows.slice(index, index + FRANCHISE_BATCH_SIZE);
    await prisma.franchiseOpportunity.createMany({
      data: chunk.map((row) => ({
        id: row.id,
        slug: row.slug,
        title: row.title,
        pathway: row.pathway,
        sector: row.sector,
        market: row.market,
        summary: row.summary,
        featured: row.featured,
        status: row.status,
        sortOrder: row.sortOrder,
      })),
      skipDuplicates: true,
    });
  }
  return rows;
}

async function main() {
  faker.seed(42);

  const sampleAssets = await ensureSampleSvgAssets();
  await resetSeededRecords();

  const businessRows = await seedBusinessListings();
  const commercialRows = await seedCommercialProperties();
  const franchiseRows = await seedFranchiseOpportunities();

  const summary = summarizeBusinessListings(businessRows);

  console.log("Sample data seeded successfully.");
  console.log(`Generated ${sampleAssets.length} placeholder SVG assets in public/sample.`);
  console.log("Business listings:");
  console.table({
    total: businessRows.length,
    active: summary.statuses.ACTIVE ?? 0,
    pending: summary.statuses.PENDING ?? 0,
    sold: summary.statuses.SOLD ?? 0,
    minAskingPrice: summary.min,
    medianAskingPrice: summary.median,
    maxAskingPrice: summary.max,
  });

  console.log("Counts by category:");
  console.table(summary.categories);
  console.log("Counts by city:");
  console.table(summary.cities);
  console.log("Counts by status:");
  console.table(summary.statuses);

  console.log("Commercial properties:");
  console.table({
    total: commercialRows.length,
    sale: commercialRows.filter((row) => row.transactionType === "SALE").length,
    lease: commercialRows.filter((row) => row.transactionType === "LEASE").length,
  });
  console.log("Franchise opportunities:");
  console.table({ total: franchiseRows.length });

  console.log("Sample admin note: admin seed uses fictional data only; no real auth credentials created.");
}

main()
  .catch((error: unknown) => {
    console.error("Failed to seed sample data.", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
