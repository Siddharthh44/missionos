import { describe, expect, it } from "vitest";
import { getMissionHealth } from "@/features/missions/mission-health";
import { MISSION_CATALOG } from "@/data/mission-catalog";
import type { Mission } from "@/types";

describe("getMissionHealth", () => {
  it("returns stable shape for catalog missions", () => {
    for (const mission of MISSION_CATALOG) {
      const health = getMissionHealth(mission);
      expect(health).toMatchObject({
        status: expect.any(String),
        confidence: expect.any(String),
        insight: expect.any(String),
        recommendation: expect.any(String),
        trend: expect.any(String),
        urgency: expect.any(String),
        score: expect.any(Number),
        insightType: expect.any(String),
        sparkline: expect.any(Array),
      });
      expect(health.sparkline).toHaveLength(5);
      expect(health.score).toBeGreaterThanOrEqual(0);
      expect(health.score).toBeLessThanOrEqual(100);
    }
  });

  it("flags strong velocity for high-progress aligned missions", () => {
    const mission = MISSION_CATALOG.find(
      (m) => m.id === "mission-reliability-control-plane",
    )!;
    const health = getMissionHealth(mission);
    expect(health.status).toBe("healthy");
    expect(health.trend).toBe("up");
    expect(health.insight).toContain("velocity");
  });

  it("elevates risk for needs revision missions", () => {
    const mission = MISSION_CATALOG.find(
      (m) => m.id === "mission-incident-review-cadence",
    )!;
    const health = getMissionHealth(mission);
    expect(["attention", "at_risk", "critical"]).toContain(health.status);
    expect(health.urgency).not.toBe("low");
  });

  it("is deterministic for the same mission input", () => {
    const mission = MISSION_CATALOG[0];
    const first = getMissionHealth(mission);
    const second = getMissionHealth(mission);
    expect(first).toEqual(second);
  });

  it("lowers confidence for draft missions without sync", () => {
    const draft: Mission = {
      ...MISSION_CATALOG[0],
      id: "mission-draft-test",
      status: "draft",
      latest_sync: null,
    };
    const health = getMissionHealth(draft);
    expect(health.confidence).toBe("low");
  });
});
