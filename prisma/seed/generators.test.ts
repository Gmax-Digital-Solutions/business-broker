import { describe, expect, it } from "vitest";

import {
  buildBusinessListingSeedRows,
  buildCommercialPropertySeedRows,
  buildFranchiseSeedRows,
  isWithinCountyBounds,
} from "./generators";

describe("seed generators", () => {
  it("keeps SDE-to-asking-price multiples aligned with the configured ranges", () => {
    const rows = buildBusinessListingSeedRows();

    expect(rows).toHaveLength(120);

    for (const row of rows) {
      expect(row.askingPrice).toBe(Math.round(row.sde * row.multiple / 5000) * 5000);
    }
  });

  it("keeps all coordinates within either Manatee or Sarasota county bounds", () => {
    const rows = [
      ...buildBusinessListingSeedRows(),
      ...buildCommercialPropertySeedRows(),
      ...buildFranchiseSeedRows(),
    ];

    for (const row of rows) {
      expect(isWithinCountyBounds(row.county, row.lat, row.lon)).toBe(true);
    }
  });

  it("generates unique IDs and slugs for seeded listings", () => {
    const rows = buildBusinessListingSeedRows();
    const ids = new Set(rows.map((row) => row.id));
    const slugs = new Set(rows.map((row) => row.slug));

    expect(ids.size).toBe(rows.length);
    expect(slugs.size).toBe(rows.length);
    expect([...ids][0]).toMatch(/^BBW-\d+$/);
  });

  it("keeps public-facing titles generic and free from address-like details", () => {
    const rows = buildBusinessListingSeedRows();

    for (const row of rows) {
      expect(row.title).not.toMatch(/\d/);
      expect(row.title).not.toMatch(/\b(?:street|avenue|boulevard|drive|road|lane|blvd|ave|rd|ln)\b/i);
    }
  });
});
