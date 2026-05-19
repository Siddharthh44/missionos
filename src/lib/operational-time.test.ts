import { describe, expect, it } from "vitest";
import {
  OPERATIONAL_NOW,
  formatOperationalDeadline,
  formatOperationalRelative,
} from "@/lib/operational-time";

describe("formatOperationalRelative", () => {
  it("formats minutes and hours compactly", () => {
    expect(
      formatOperationalRelative("2026-05-19T11:50:00Z", OPERATIONAL_NOW),
    ).toBe("10m ago");
    expect(
      formatOperationalRelative("2026-05-19T08:00:00Z", OPERATIONAL_NOW),
    ).toBe("4h ago");
  });

  it("formats yesterday and multi-day gaps", () => {
    expect(
      formatOperationalRelative("2026-05-18T10:00:00Z", OPERATIONAL_NOW),
    ).toBe("Yesterday");
    expect(
      formatOperationalRelative("2026-05-14T11:50:00Z", OPERATIONAL_NOW),
    ).toBe("5d ago");
  });

  it("falls back to short absolute dates beyond one week", () => {
    expect(
      formatOperationalRelative("2026-04-20T14:00:00Z", OPERATIONAL_NOW),
    ).toBe("Apr 20");
  });
});

describe("formatOperationalDeadline", () => {
  it("uses near-future compact language", () => {
    expect(formatOperationalDeadline("2026-05-20T00:00:00Z", OPERATIONAL_NOW)).toBe(
      "Due tomorrow",
    );
    expect(formatOperationalDeadline("2026-05-24T00:00:00Z", OPERATIONAL_NOW)).toBe(
      "Due in 5d",
    );
  });

  it("marks overdue deadlines with absolute month/day", () => {
    expect(formatOperationalDeadline("2026-05-10T00:00:00Z", OPERATIONAL_NOW)).toBe(
      "Overdue · May 10",
    );
  });
});
