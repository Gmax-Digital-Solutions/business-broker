import { beforeEach, describe, expect, it, vi } from "vitest";

import type { InvestorVisaActionState } from "@/src/features/investor-visas/types";
import { submitInvestorVisaConsultation } from "./actions";

const { create } = vi.hoisted(() => ({
  create: vi.fn(),
}));

vi.mock("server-only", () => ({}));
vi.mock("@/src/lib/prisma", () => ({
  getPrismaClient: () => ({
    investorVisaConsultationRequest: { create },
  }),
}));

describe("submitInvestorVisaConsultation", () => {
  beforeEach(() => {
    create.mockReset().mockResolvedValue({});
  });

  it("returns accessible field errors without persisting an invalid request", async () => {
    const state = await submitInvestorVisaConsultation(
      { status: "idle", message: "" } satisfies InvestorVisaActionState,
      new FormData(),
    );

    expect(state).toMatchObject({
      status: "error",
      fieldErrors: {
        fullName: ["Enter your name."],
        email: ["Enter a valid email address."],
        pathway: ["Choose an area of interest."],
        businessPlan: ["Choose a business plan."],
        consent: [
          "Please confirm you agree to be contacted about this request.",
        ],
      },
    });
    expect(create).not.toHaveBeenCalled();
  });

  it("normalizes and stores only contact and business-interest fields", async () => {
    const formData = new FormData();
    formData.set("fullName", "  Alex Buyer ");
    formData.set("email", " ALEX@EXAMPLE.COM ");
    formData.set("phone", "");
    formData.set("pathway", "E2");
    formData.set("businessPlan", "ACQUIRE_BUSINESS");
    formData.set("consent", "on");

    const state = await submitInvestorVisaConsultation(
      { status: "idle", message: "" },
      formData,
    );

    expect(state.status).toBe("success");
    expect(create).toHaveBeenCalledWith({
      data: {
        fullName: "Alex Buyer",
        email: "alex@example.com",
        phone: null,
        pathway: "E2",
        businessPlan: "ACQUIRE_BUSINESS",
        contactConsent: true,
      },
    });
  });
});
