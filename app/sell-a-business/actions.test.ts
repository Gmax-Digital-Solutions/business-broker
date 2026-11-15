import { beforeEach, describe, expect, it, vi } from "vitest";

import { submitFullValuation, submitQuickValuation } from "./actions";
import type { LeadActionState } from "@/src/features/listings/types";

const { createValuationRequest } = vi.hoisted(() => ({
  createValuationRequest: vi.fn(),
}));

vi.mock("server-only", () => ({}));
vi.mock("@/src/lib/prisma", () => ({
  getPrismaClient: () => ({
    sellerValuationRequest: { create: createValuationRequest },
  }),
}));

const idleState = { status: "idle", message: "" } satisfies LeadActionState;

describe("seller valuation actions", () => {
  beforeEach(() => {
    createValuationRequest.mockReset();
    createValuationRequest.mockResolvedValue({});
  });

  it("returns field-specific errors for an empty quick request", async () => {
    const state = await submitQuickValuation(idleState, new FormData());

    expect(state).toMatchObject({
      status: "error",
      fieldErrors: {
        email: ["Enter a valid email address."],
        industry: ["Choose an industry."],
        location: ["Choose a location."],
        annualRevenueRange: ["Select an annual revenue range."],
        consent: [
          "Please confirm you agree to be contacted about this request.",
        ],
      },
    });
  });

  it("persists a validated quick request without collecting extra details", async () => {
    const formData = new FormData();
    formData.set("email", " SELLER@EXAMPLE.COM ");
    formData.set("industry", "marine");
    formData.set("location", "sarasota");
    formData.set("annualRevenueRange", "1m-3m");
    formData.set("consent", "on");

    const state = await submitQuickValuation(idleState, formData);

    expect(state.status).toBe("success");
    expect(createValuationRequest).toHaveBeenCalledWith({
      data: {
        fullName: null,
        email: "seller@example.com",
        phone: null,
        industry: "marine",
        location: "sarasota",
        annualRevenueRange: "1m-3m",
        annualCashFlowRange: null,
        saleTimeline: null,
        preferredContact: null,
        contactConsent: true,
      },
    });
  });

  it("returns field-specific errors for an empty full request", async () => {
    const state = await submitFullValuation(idleState, new FormData());

    expect(state).toMatchObject({
      status: "error",
      fieldErrors: {
        fullName: ["Enter your full name."],
        email: ["Enter a valid email address."],
        phone: ["Enter a valid phone number."],
        industry: ["Choose an industry."],
        location: ["Choose a location."],
        annualRevenueRange: ["Select an annual revenue range."],
        annualCashFlowRange: ["Select an annual cash flow range."],
        saleTimeline: ["Choose a sale timeline."],
        preferredContact: ["Choose a preferred contact method."],
        consent: [
          "Please confirm you agree to be contacted about this request.",
        ],
      },
    });
  });

  it("persists a validated full request", async () => {
    const formData = new FormData();
    formData.set("fullName", "Taylor Owner");
    formData.set("email", "seller@example.com");
    formData.set("phone", "941 555 0100");
    formData.set("industry", "marine");
    formData.set("location", "sarasota");
    formData.set("annualRevenueRange", "1m-3m");
    formData.set("annualCashFlowRange", "250k-500k");
    formData.set("saleTimeline", "exploring");
    formData.set("preferredContact", "email");
    formData.set("consent", "on");

    const state = await submitFullValuation(idleState, formData);

    expect(state.status).toBe("success");
    expect(createValuationRequest).toHaveBeenCalledWith({
      data: {
        fullName: "Taylor Owner",
        email: "seller@example.com",
        phone: "941 555 0100",
        industry: "marine",
        location: "sarasota",
        annualRevenueRange: "1m-3m",
        annualCashFlowRange: "250k-500k",
        saleTimeline: "exploring",
        preferredContact: "email",
        contactConsent: true,
      },
    });
  });
});
