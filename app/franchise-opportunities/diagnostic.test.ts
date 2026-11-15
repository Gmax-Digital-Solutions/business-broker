import { describe, expect, it } from "vitest";

import { recommendFranchisePathway } from "./diagnostic";

describe("recommendFranchisePathway", () => {
  it("maps existing, conversion, and development goals to their matching paths", () => {
    expect(recommendFranchisePathway("existing", "hands-on", "single")).toBe(
      "RESALE",
    );
    expect(recommendFranchisePathway("convert", "hands-on", "single")).toBe(
      "CONVERSION",
    );
    expect(recommendFranchisePathway("develop", "manager", "regional")).toBe(
      "MASTER_FRANCHISE",
    );
  });
});
