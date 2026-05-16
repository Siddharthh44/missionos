"use client";

import { useRoleContext } from "@/hooks/use-role-context";

export function useQuarter() {
  const { quarterLabel } = useRoleContext();

  return {
    quarterLabel,
  };
}
