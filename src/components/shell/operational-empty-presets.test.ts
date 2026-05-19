import { describe, expect, it } from "vitest";
import { operationalEmptyPresets } from "@/components/shell/operational-empty-presets";

describe("operationalEmptyPresets", () => {
  it("exposes tailored presets for core operational surfaces", () => {
    expect(operationalEmptyPresets.missionsCatalog.title).toMatch(/missions/i);
    expect(operationalEmptyPresets.reviewsClear.title).toMatch(/review/i);
    expect(operationalEmptyPresets.syncsHealthy.title).toMatch(/sync cadence/i);
    expect(operationalEmptyPresets.insightsClear.title).toMatch(/risks/i);
    expect(operationalEmptyPresets.activityQuiet.title).toMatch(/movement/i);
    expect(operationalEmptyPresets.commandNoMatch.title).toMatch(/matching/i);
  });
});
