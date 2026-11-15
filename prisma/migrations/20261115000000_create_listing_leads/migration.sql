CREATE TABLE "public"."listing_search_alerts" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "keyword" TEXT,
    "industry" TEXT,
    "geography" TEXT,
    "minimum_asking_price" INTEGER,
    "maximum_asking_price" INTEGER,
    "minimum_cash_flow" INTEGER,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "listing_search_alerts_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "listing_search_alerts_created_at_idx"
ON "public"."listing_search_alerts" ("created_at");

ALTER TABLE "public"."listing_search_alerts" ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."buyer_criteria_requests" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "target_industry" TEXT NOT NULL,
    "minimum_sde" TEXT NOT NULL,
    "liquid_equity" TEXT NOT NULL,
    "geographic_focus" TEXT NOT NULL,
    "target_listing_slug" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "buyer_criteria_requests_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "buyer_criteria_requests_created_at_idx"
ON "public"."buyer_criteria_requests" ("created_at");

ALTER TABLE "public"."buyer_criteria_requests" ENABLE ROW LEVEL SECURITY;
