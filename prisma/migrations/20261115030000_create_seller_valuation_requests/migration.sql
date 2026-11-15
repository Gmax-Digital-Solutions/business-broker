CREATE TABLE "public"."seller_valuation_requests" (
    "id" TEXT NOT NULL,
    "full_name" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "industry" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "annual_revenue_range" TEXT NOT NULL,
    "annual_cash_flow_range" TEXT,
    "sale_timeline" TEXT,
    "preferred_contact" TEXT,
    "contact_consent" BOOLEAN NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "seller_valuation_requests_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "seller_valuation_requests_created_at_idx"
ON "public"."seller_valuation_requests" ("created_at");

ALTER TABLE "public"."seller_valuation_requests" ENABLE ROW LEVEL SECURITY;
