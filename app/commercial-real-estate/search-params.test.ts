import { describe, expect, it } from "vitest";

import { parseCommercialFilters } from "./search-params";

describe("parseCommercialFilters", () => {
  it("parses supported filters and drops an inverted area range", () => {
    expect(
      parseCommercialFilters({
        q: "  warehouse ",
        propertyType: "INDUSTRIAL",
        area: "manatee",
        transaction: "LEASE",
        minArea: "50000",
        maxArea: "25000",
        sort: "size-desc",
        page: "2",
      }),
    ).toEqual({
      query: "warehouse",
      propertyType: "INDUSTRIAL",
      area: "manatee",
      transaction: "LEASE",
      minArea: 50_000,
      maxArea: undefined,
      sort: "size-desc",
      page: 2,
    });
  });

  it("ignores repeated or unsupported query values", () => {
    expect(
      parseCommercialFilters({
        q: ["warehouse", "office"],
        propertyType: "UNSUPPORTED",
        area: "elsewhere",
        transaction: "PRIVATE",
        minArea: "-1",
        maxArea: "",
        sort: "internal",
        page: "5000",
      }),
    ).toEqual({
      query: "",
      propertyType: "",
      area: "",
      transaction: "",
      minArea: undefined,
      maxArea: undefined,
      sort: "featured",
      page: 1,
    });
  });
});
