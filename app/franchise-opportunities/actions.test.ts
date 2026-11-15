import { beforeEach, describe, expect, it, vi } from "vitest";

import type { FranchiseActionState } from "@/src/features/franchise/types";
import { submitFranchiseStrategy } from "./actions";

const { create } = vi.hoisted(() => ({
  create: vi.fn(),
}));

vi.mock("server-only", () => ({}));
vi.mock("@/src/lib/prisma", () => ({
  getPrismaClient: () => ({
    franchiseStrategyRequest: { create },
  }),
}));

describe("submitFranchiseStrategy", () => {
  beforeEach(() => {
    create.mockReset().mockResolvedValue({});
  });

  it("returns field errors and does not persist invalid submissions", async () => {
    const state = await submitFranchiseStrategy(
      { status: "idle", message: "" } satisfies FranchiseActionState,
      new FormData(),
    );

    expect(state).toMatchObject({
      status: "error",
      fieldErrors: {
        fullName: ["Enter your full name."],
        email: ["Enter a valid email address."],
        preferredPathway: ["Choose a franchise pathway."],
        market: ["Choose a geographic focus."],
        sector: ["Choose an industry sector."],
        capitalBand: ["Choose a preferred investment range."],
        timeframe: ["Choose a timeframe."],
        consent: [
          "Please confirm you agree to be contacted about this request.",
        ],
      },
    });
    expect(create).not.toHaveBeenCalled();
  });

  it("normalizes and stores a validated request", async () => {
    const formData = new FormData();
    formData.set("fullName", "  Alex Buyer ");
    formData.set("email", " ALEX@EXAMPLE.COM ");
    formData.set("phone", "");
    formData.set("preferredPathway", "RESALE");
    formData.set("market", "SARASOTA");
    formData.set("sector", "FOOD_BEVERAGE");
    formData.set("capitalBand", "FROM_150K_TO_350K");
    formData.set("timeframe", "WITHIN_SIX_MONTHS");
    formData.set("consent", "on");

    const state = await submitFranchiseStrategy(
      { status: "idle", message: "" },
      formData,
    );

    expect(state.status).toBe("success");
    expect(create).toHaveBeenCalledWith({
      data: {
        fullName: "Alex Buyer",
        email: "alex@example.com",
        phone: null,
        preferredPathway: "RESALE",
        market: "SARASOTA",
        sector: "FOOD_BEVERAGE",
        capitalBand: "FROM_150K_TO_350K",
        timeframe: "WITHIN_SIX_MONTHS",
        contactConsent: true,
      },
    });
  });
});
