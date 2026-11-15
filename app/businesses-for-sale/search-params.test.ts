import { describe, expect, it } from "vitest";

import { parseListingFilters } from "./search-params";

describe("parseListingFilters", () => {
  it("parses supported filters and removes an inverted price range", () => {
    const filters = parseListingFilters({
      q: "  marine ",
      industry: "Marine services",
      area: "sarasota",
      minPrice: "2500000",
      maxPrice: "1000000",
      minCashFlow: "200000",
      sort: "cash-flow-desc",
      page: "3",
      view: "list",
    });

    expect(filters).toEqual({
      query: "marine",
      industry: "Marine services",
      area: "sarasota",
      credential: "",
      sort: "cash-flow-desc",
      page: 3,
      minPrice: 2_500_000,
      maxPrice: undefined,
      minCashFlow: 200_000,
      view: "list",
    });
  });

  it("rejects repeated or out-of-range query values without throwing", () => {
    const filters = parseListingFilters({
      q: ["marine", "hvac"],
      area: "somewhere-else",
      minPrice: "-1",
      sort: "secret-field",
      page: "999999",
    });

    expect(filters.query).toBe("");
    expect(filters.area).toBe("");
    expect(filters.minPrice).toBeUndefined();
    expect(filters.sort).toBe("featured");
    expect(filters.page).toBe(1);
  });
});
