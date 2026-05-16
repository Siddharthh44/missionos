import type { UserRole } from "@/types";

const ROLE_ACCESS: Record<UserRole, string[]> = {
  employee: ["/", "/missions", "/missions/new", "/missions/[id]", "/syncs", "/insights"],
  manager: ["/", "/missions", "/missions/new", "/missions/[id]", "/syncs", "/insights", "/team", "/review", "/admin/shared-missions"],
  admin: ["/", "/missions", "/missions/new", "/missions/[id]", "/syncs", "/insights", "/team", "/review", "/admin", "/admin/shared-missions", "/admin/audit"],
};

const ROLE_DEFAULT_ROUTES: Record<UserRole, string> = {
  employee: "/",
  manager: "/",
  admin: "/admin",
};

export function isRouteAllowed(role: UserRole, pathname: string): boolean {
  const normalizedPath = pathname.startsWith("/missions/") && pathname !== "/missions/new"
    ? "/missions/[id]"
    : pathname;

  return ROLE_ACCESS[role].includes(normalizedPath);
}

export function getDefaultRoute(role: UserRole): string {
  return ROLE_DEFAULT_ROUTES[role];
}
