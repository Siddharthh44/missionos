import { describe, expect, it } from "vitest";
import { TOAST_DURATION_MS, TOAST_MAX_VISIBLE } from "@/features/toast/types";

describe("toast configuration", () => {
  it("caps visible stack size for low-noise UX", () => {
    expect(TOAST_MAX_VISIBLE).toBe(3);
  });

  it("uses brief auto-dismiss durations", () => {
    expect(TOAST_DURATION_MS.success).toBeLessThanOrEqual(3500);
    expect(TOAST_DURATION_MS.error).toBeLessThanOrEqual(5000);
  });
});
