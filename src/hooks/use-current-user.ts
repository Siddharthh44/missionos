"use client";

import { useRoleContext } from "@/hooks/use-role-context";

export function useCurrentUser() {
  const { realProfile, sessionMode, signOut } = useRoleContext();

  return {
    profile: realProfile,
    sessionMode,
    signOut,
  };
}
