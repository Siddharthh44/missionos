"use client";

import {
  createContext,
  startTransition,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import type { AuthSnapshot, Profile, SessionMode, UserRole } from "@/types";

interface RoleContextValue {
  effectiveRole: UserRole | null;
  isAuthenticated: boolean;
  isRoleOverrideActive: boolean;
  isSubmitting: boolean;
  quarterLabel: string;
  realProfile: Profile | null;
  roleOverride: UserRole | null;
  sessionMode: SessionMode;
  setRole: (role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
}

const RoleContext = createContext<RoleContextValue | null>(null);

interface RoleProviderProps extends PropsWithChildren {
  initialState: AuthSnapshot;
}

export default function RoleProvider({
  children,
  initialState,
}: RoleProviderProps) {
  const [authState, setAuthState] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const setRole = async (role: UserRole) => {
    if (!authState.realProfile || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/demo/switch-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pathname,
          role,
        }),
      });

      const payload = (await response.json()) as {
        effectiveRole?: UserRole;
        redirectTo?: string;
        roleOverride?: UserRole | null;
      };

      if (!response.ok || !payload.effectiveRole) {
        throw new Error("Unable to change role view.");
      }

      setAuthState((current) => ({
        ...current,
        effectiveRole: payload.effectiveRole ?? current.effectiveRole,
        roleOverride:
          payload.roleOverride === undefined
            ? current.roleOverride
            : payload.roleOverride,
      }));

      startTransition(() => {
        if (payload.redirectTo && payload.redirectTo !== pathname) {
          router.replace(payload.redirectTo);
          return;
        }

        router.refresh();
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const signOut = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      setAuthState((current) => ({
        ...current,
        effectiveRole: null,
        isAuthenticated: false,
        realProfile: null,
        roleOverride: null,
        sessionMode: "none",
      }));

      startTransition(() => {
        router.replace("/login");
        router.refresh();
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const value: RoleContextValue = {
    ...authState,
    isRoleOverrideActive:
      authState.realProfile !== null &&
      authState.roleOverride !== null &&
      authState.roleOverride !== authState.realProfile.role,
    isSubmitting,
    setRole,
    signOut,
  };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRoleContextValue() {
  const context = useContext(RoleContext);

  if (!context) {
    throw new Error("useRoleContextValue must be used inside RoleProvider.");
  }

  return context;
}
