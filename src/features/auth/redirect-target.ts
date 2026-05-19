import { getDefaultRoute, isRouteAllowed } from "@/features/shell/route-access";
import type { UserRole } from "@/types";

const AUTH_ROUTES = new Set(["/login"]);
const BLOCKED_PREFIXES = ["/api/"];

/** Paths that appear in docs or older flows but are not App Router segments. */
const LEGACY_ROUTE_ALIASES: Record<string, string> = {
  "/mission-control": "/",
  "/dashboard": "/",
};

function stripRedirectPath(pathname: string) {
  return pathname.split("?")[0]?.split("#")[0] ?? pathname;
}

export function normalizeRedirectPath(
  pathname: string | null | undefined,
): string | null {
  if (!pathname || typeof pathname !== "string") {
    return null;
  }

  const trimmed = pathname.trim();

  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) {
    return null;
  }

  const basePath = stripRedirectPath(trimmed);

  return LEGACY_ROUTE_ALIASES[basePath] ?? basePath;
}

export function isSafeRedirectPath(pathname: string | null | undefined): boolean {
  const normalized = normalizeRedirectPath(pathname);

  if (!normalized) {
    return false;
  }

  if (AUTH_ROUTES.has(normalized)) {
    return false;
  }

  return !BLOCKED_PREFIXES.some((prefix) => normalized.startsWith(prefix));
}

export function sanitizeRedirectTarget(
  pathname: string | null | undefined,
  fallback: string,
): string {
  if (!isSafeRedirectPath(pathname)) {
    return fallback;
  }

  return normalizeRedirectPath(pathname) ?? fallback;
}

export function resolvePostAuthRedirect(
  role: UserRole,
  requestedPath: string | null | undefined,
): string {
  const fallback = getDefaultRoute(role);
  const candidate = sanitizeRedirectTarget(requestedPath, fallback);

  return isRouteAllowed(role, candidate) ? candidate : fallback;
}

export function readRedirectSearchParam(value: string | null): string | null {
  if (!value) {
    return null;
  }

  return isSafeRedirectPath(value) ? normalizeRedirectPath(value) : null;
}
