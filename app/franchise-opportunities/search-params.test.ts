import { describe, expect, it } from "vitest";

import { parseFranchiseFilters } from "./search-params";

describe("parseFranchiseFilters", () => {
  it("parses supported inventory filters", () => {
    expect(
      parseFranchiseFilters({
        q: " resale ",
        pathway: "RESALE",
        sector: "FOOD_BEVERAGE",
        market: "SARASOTA",
        page: "2",
      }),
    ).toEqual({
      query: "resale",
      pathway: "RESALE",
      sector: "FOOD_BEVERAGE",
      market: "SARASOTA",
      page: 2,
    });
  });

  it("ignores unsupported and repeated query values", () => {
    expect(
      parseFranchiseFilters({
        q: ["resale", "fitness"],
        pathway: "INTERNAL",
        sector: "UNSUPPORTED",
        market: "UNKNOWN",
        page: "1001",
      }),
    ).toEqual({
      query: "",
      pathway: "",
      sector: "",
      market: "",
      page: 1,
    });
  });
});
