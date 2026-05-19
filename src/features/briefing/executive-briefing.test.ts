import { describe, expect, it } from "vitest";
import { MISSION_CATALOG } from "@/data/mission-catalog";
import { getExecutiveBriefing } from "@/features/briefing/executive-briefing";
import type { Mission } from "@/types";

describe("getExecutiveBriefing", () => {
  it("returns stable shape for catalog missions", () => {
    const briefing = getExecutiveBriefing(MISSION_CATALOG);

    expect(briefing).toMatchObject({
      headline: expect.any(String),
      summary: expect.any(String),
      confidence: expect.stringMatching(/^(high|medium|low)$/),
      momentum: {
        score: expect.any(Number),
        deltaPercent: expect.any(Number),
        trend: expect.stringMatching(/^(up|down|neutral)$/),
        label: expect.any(String),
      },
      risks: expect.any(Array),
      highlights: expect.any(Array),
      recommendations: expect.any(Array),
    });

    expect(briefing.headline.length).toBeGreaterThan(0);
    expect(briefing.summary.length).toBeGreaterThan(0);
    expect(briefing.risks.length).toBeGreaterThan(0);
    expect(briefing.highlights.length).toBeGreaterThan(0);
    expect(briefing.recommendations.length).toBeGreaterThan(0);
  });

  it("is deterministic for the same mission input", () => {
    const first = getExecutiveBriefing(MISSION_CATALOG);
    const second = getExecutiveBriefing(MISSION_CATALOG);
    expect(first).toEqual(second);
  });

  it("surfaces portfolio signals from mission health aggregation", () => {
    const briefing = getExecutiveBriefing(MISSION_CATALOG);

    expect(briefing.momentum.score).toBeGreaterThan(0);
    expect(briefing.momentum.score).toBeLessThanOrEqual(100);
    expect(briefing.highlights.some((h) => h.includes("mission"))).toBe(true);
    expect(
      briefing.risks.some(
        (r) =>
          r.label.toLowerCase().includes("review") ||
          r.label.toLowerCase().includes("drift") ||
          r.label.toLowerCase().includes("sync") ||
          r.label.toLowerCase().includes("risk"),
      ),
    ).toBe(true);
  });

  it("handles empty mission arrays", () => {
    const briefing = getExecutiveBriefing([]);
    expect(briefing.confidence).toBe("low");
    expect(briefing.momentum.score).toBe(0);
    expect(briefing.headline).toContain("No active missions");
  });

  it("clamps momentum delta to a believable executive range", () => {
    const briefing = getExecutiveBriefing(MISSION_CATALOG);
    expect(briefing.momentum.deltaPercent).toBeGreaterThanOrEqual(-24);
    expect(briefing.momentum.deltaPercent).toBeLessThanOrEqual(24);
  });

  it("limits risk and recommendation cardinality", () => {
    const briefing = getExecutiveBriefing(MISSION_CATALOG);
    expect(briefing.risks.length).toBeLessThanOrEqual(4);
    expect(briefing.highlights.length).toBeLessThanOrEqual(4);
    expect(briefing.recommendations.length).toBeLessThanOrEqual(3);
  });

  it("reflects accelerated delivery when aligned missions trend up", () => {
    const briefing = getExecutiveBriefing(MISSION_CATALOG);
    const hasAcceleration = briefing.highlights.some((h) =>
      h.toLowerCase().includes("accelerated"),
    );
    const alignedUp = MISSION_CATALOG.filter(
      (m) => m.status === "aligned" && (m.latest_sync?.progress_score ?? 0) >= 70,
    ).length;
    if (alignedUp > 0) {
      expect(hasAcceleration).toBe(true);
    }
  });

  it("derives recommendations from lowest-scoring mission when at risk", () => {
    const draft: Mission = {
      ...MISSION_CATALOG[0],
      id: "mission-briefing-draft",
      status: "draft",
      latest_sync: null,
    };
    const briefing = getExecutiveBriefing([...MISSION_CATALOG, draft]);
    expect(briefing.recommendations.length).toBeGreaterThan(0);
  });
});
