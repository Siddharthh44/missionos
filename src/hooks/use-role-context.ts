"use client";

import { useRoleContextValue } from "@/providers/role-provider";

export function useRoleContext() {
  return useRoleContextValue();
}
