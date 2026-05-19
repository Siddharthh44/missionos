import { describe, expect, it } from "vitest";
import {
  isSafeRedirectPath,
  normalizeRedirectPath,
  resolvePostAuthRedirect,
} from "@/features/auth/redirect-target";

describe("redirect-target", () => {
  it("maps legacy mission control paths to the home route", () => {
    expect(normalizeRedirectPath("/mission-control")).toBe("/");
    expect(normalizeRedirectPath("/dashboard")).toBe("/");
  });

  it("rejects auth and external redirect targets", () => {
    expect(isSafeRedirectPath("/login")).toBe(false);
    expect(isSafeRedirectPath("//evil.example")).toBe(false);
    expect(isSafeRedirectPath("/api/auth/login")).toBe(false);
  });

  it("falls back to role defaults when the target is not allowed", () => {
    expect(resolvePostAuthRedirect("employee", "/admin")).toBe("/");
    expect(resolvePostAuthRedirect("admin", "/admin/audit")).toBe("/admin/audit");
  });

  it("preserves an allowed deep link after auth", () => {
    expect(resolvePostAuthRedirect("manager", "/missions")).toBe("/missions");
  });
});
