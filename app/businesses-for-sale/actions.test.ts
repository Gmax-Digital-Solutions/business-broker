import { describe, expect, it, vi } from "vitest";

import { submitBuyerCriteria } from "./actions";
import type { LeadActionState } from "@/src/features/listings/types";

vi.mock("server-only", () => ({}));
vi.mock("@/src/lib/prisma", () => ({ getPrismaClient: vi.fn() }));

describe("submitBuyerCriteria", () => {
  it("returns helpful field errors when required form values are missing", async () => {
    const state = await submitBuyerCriteria(
      { status: "idle", message: "" } satisfies LeadActionState,
      new FormData(),
    );

    expect(state).toMatchObject({
      status: "error",
      fieldErrors: {
        fullName: ["Enter your full name."],
        contact: ["Enter a valid email address or phone number."],
        targetIndustry: ["Choose a target industry."],
        minimumSde: ["Select a cash flow target."],
        liquidEquity: ["Select your available liquid equity."],
        geographicFocus: ["Select a geographic focus."],
        consent: ["Please confirm you want us to follow up about your criteria."],
      },
    });
  });
});
