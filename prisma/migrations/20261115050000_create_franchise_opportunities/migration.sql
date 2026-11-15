CREATE TYPE "franchise_pathway" AS ENUM (
    'CONSULTING',
    'SINGLE_UNIT',
    'MASTER_FRANCHISE',
    'AREA_DEVELOPMENT',
    'RESALE',
    'CONVERSION'
);

CREATE TYPE "franchise_market" AS ENUM (
    'SARASOTA',
    'MANATEE',
    'SOUTHWEST_FLORIDA',
    'OTHER'
);

CREATE TYPE "franchise_capital_band" AS ENUM (
    'UNDECIDED',
    'UNDER_150K',
    'FROM_150K_TO_350K',
    'FROM_350K_TO_750K',
    'OVER_750K'
);

CREATE TYPE "franchise_timeframe" AS ENUM (
    'IMMEDIATE',
    'WITHIN_SIX_MONTHS',
    'WITHIN_TWELVE_MONTHS',
    'RESEARCHING'
);

CREATE TABLE "public"."franchise_opportunities" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "pathway" "franchise_pathway" NOT NULL,
    "sector" TEXT NOT NULL,
    "market" "franchise_market" NOT NULL,
    "summary" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "franchise_opportunities_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "franchise_opportunities_slug_key"
ON "public"."franchise_opportunities" ("slug");

CREATE INDEX "franchise_opportunities_status_featured_sort_order_idx"
ON "public"."franchise_opportunities" ("status", "featured", "sort_order");

CREATE INDEX "franchise_opportunities_status_pathway_sort_order_idx"
ON "public"."franchise_opportunities" ("status", "pathway", "sort_order");

CREATE INDEX "franchise_opportunities_status_sector_sort_order_idx"
ON "public"."franchise_opportunities" ("status", "sector", "sort_order");

CREATE INDEX "franchise_opportunities_status_market_sort_order_idx"
ON "public"."franchise_opportunities" ("status", "market", "sort_order");

ALTER TABLE "public"."franchise_opportunities" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE "public"."franchise_opportunities" FROM anon, authenticated;

CREATE TABLE "public"."franchise_strategy_requests" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "preferred_pathway" "franchise_pathway" NOT NULL,
    "market" "franchise_market" NOT NULL,
    "sector" TEXT NOT NULL,
    "capital_band" "franchise_capital_band" NOT NULL,
    "timeframe" "franchise_timeframe" NOT NULL,
    "contact_consent" BOOLEAN NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "franchise_strategy_requests_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "franchise_strategy_requests_created_at_idx"
ON "public"."franchise_strategy_requests" ("created_at");

ALTER TABLE "public"."franchise_strategy_requests" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE "public"."franchise_strategy_requests" FROM anon, authenticated;
