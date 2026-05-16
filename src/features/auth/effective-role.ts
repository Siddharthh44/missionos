import type { UserRole } from "@/types";

const USER_ROLES: UserRole[] = ["employee", "manager", "admin"];

export function isUserRole(value: string | null | undefined): value is UserRole {
  return USER_ROLES.includes(value as UserRole);
}

export function parseRoleOverride(
  value: string | null | undefined,
): UserRole | null {
  if (isUserRole(value)) {
    return value;
  }

  return null;
}

export function resolveEffectiveRole(
  realRole: UserRole,
  roleOverride: UserRole | null,
) {
  return roleOverride ?? realRole;
}
