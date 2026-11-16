import { beforeEach, describe, expect, it, vi } from "vitest";

import type { ContactActionState } from "@/src/features/contact/types";
import { submitContactInquiry } from "./actions";

const { create } = vi.hoisted(() => ({
  create: vi.fn(),
}));

vi.mock("server-only", () => ({}));
vi.mock("@/src/lib/prisma", () => ({
  getPrismaClient: () => ({
    contactInquiry: { create },
  }),
}));

describe("submitContactInquiry", () => {
  beforeEach(() => {
    create.mockReset().mockResolvedValue({});
  });

  it("returns field errors and does not persist invalid requests", async () => {
    const state = await submitContactInquiry(
      { status: "idle", message: "" } satisfies ContactActionState,
      new FormData(),
    );

    expect(state).toMatchObject({
      status: "error",
      fieldErrors: {
        fullName: ["Enter your name."],
        email: ["Enter a valid email address."],
        topic: ["Choose an inquiry topic."],
        consent: ["Please confirm you agree to be contacted about this inquiry."],
      },
    });
    expect(create).not.toHaveBeenCalled();
  });

  it("normalizes and stores only validated contact fields", async () => {
    const formData = new FormData();
    formData.set("fullName", "  Alex Buyer ");
    formData.set("email", " ALEX@EXAMPLE.COM ");
    formData.set("phone", "");
    formData.set("topic", "BUSINESS_PURCHASE");
    formData.set("message", "  I have a question about the process. ");
    formData.set("consent", "on");

    const state = await submitContactInquiry(
      { status: "idle", message: "" },
      formData,
    );

    expect(state.status).toBe("success");
    expect(create).toHaveBeenCalledWith({
      data: {
        fullName: "Alex Buyer",
        email: "alex@example.com",
        phone: null,
        topic: "BUSINESS_PURCHASE",
        message: "I have a question about the process.",
        contactConsent: true,
      },
    });
  });

  it("returns an explicit failure state when persistence fails", async () => {
    const logError = vi.spyOn(console, "error").mockImplementation(() => {});
    create.mockRejectedValueOnce(new Error("Database unavailable"));
    const formData = new FormData();
    formData.set("fullName", "Alex Buyer");
    formData.set("email", "alex@example.com");
    formData.set("topic", "OTHER");
    formData.set("message", "");
    formData.set("consent", "on");

    const state = await submitContactInquiry(
      { status: "idle", message: "" },
      formData,
    );

    expect(state).toMatchObject({
      status: "error",
      message: "We couldn't submit your inquiry. Please try again.",
    });
    expect(logError).toHaveBeenCalled();
    logError.mockRestore();
  });
});
