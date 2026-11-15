import { beforeEach, describe, expect, it, vi } from "vitest";

import type { CommercialInquiryState } from "@/src/features/commercial/types";
import { submitCommercialInquiry } from "./actions";

const { create } = vi.hoisted(() => ({
  create: vi.fn(),
}));

vi.mock("server-only", () => ({}));
vi.mock("@/src/lib/prisma", () => ({
  getPrismaClient: () => ({
    commercialPropertyInquiry: { create },
  }),
}));

describe("submitCommercialInquiry", () => {
  beforeEach(() => {
    create.mockReset().mockResolvedValue({});
  });

  it("returns accessible field errors for invalid input", async () => {
    const state = await submitCommercialInquiry(
      { status: "idle", message: "" } satisfies CommercialInquiryState,
      new FormData(),
    );

    expect(state).toMatchObject({
      status: "error",
      fieldErrors: {
        fullName: ["Enter your name."],
        email: ["Enter a valid email address."],
        propertyType: ["Choose a property type."],
        area: ["Choose a search area."],
        consent: [
          "Please confirm you agree to be contacted about this request.",
        ],
      },
    });
    expect(create).not.toHaveBeenCalled();
  });

  it("normalizes and stores a validated inquiry", async () => {
    const formData = new FormData();
    formData.set("fullName", "  Alex Buyer ");
    formData.set("email", " ALEX@EXAMPLE.COM ");
    formData.set("phone", "");
    formData.set("propertyType", "INDUSTRIAL");
    formData.set("area", "manatee");
    formData.set("sizeRange", "not-sure");
    formData.set("capitalRange", "not-sure");
    formData.set("message", "");
    formData.set("consent", "on");

    const state = await submitCommercialInquiry(
      { status: "idle", message: "" },
      formData,
    );

    expect(state.status).toBe("success");
    expect(create).toHaveBeenCalledWith({
      data: {
        fullName: "Alex Buyer",
        email: "alex@example.com",
        phone: null,
        propertyType: "INDUSTRIAL",
        area: "manatee",
        sizeRange: "not-sure",
        capitalRange: "not-sure",
        message: null,
        contactConsent: true,
      },
    });
  });
});
