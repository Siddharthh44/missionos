import { describe, expect, it } from "vitest";
import {
  getOperationalSurface,
  getQuarterLabel,
  getMissionDetailSurface,
} from "@/data/shell-selectors";

describe("shell selectors", () => {
  it("returns a populated manager dashboard surface", () => {
    const surface = getOperationalSurface("/", "manager");

    expect(surface.stats).toHaveLength(4);
    expect(surface.hero.highlights).toHaveLength(3);
    expect(surface.primary.items.length).toBeGreaterThanOrEqual(3);
    expect(surface.secondary.items.length).toBeGreaterThanOrEqual(2);
    expect(surface.support).toHaveLength(2);
  });

  it("hydrates a mission detail surface from a seeded mission id", () => {
    const surface = getMissionDetailSurface(
      "manager",
      "mission-reliability-control-plane",
    );

    expect(surface.hero.title).toContain("Reliability");
    expect(surface.primary.items[0]?.description).toContain("recovery time");
    expect(surface.secondary.items.length).toBeGreaterThanOrEqual(3);
  });

  it("falls back to a valid seeded mission detail surface when id is unknown", () => {
    const fallback = getMissionDetailSurface("employee", "mission-missing");

    expect(fallback.hero.title.length).toBeGreaterThan(0);
    expect(fallback.support[0]?.highlights.length).toBeGreaterThan(1);
  });

  it("keeps the active quarter framing current for the operational shell", () => {
    expect(getQuarterLabel()).toContain("Q2 2026");
  });
});
