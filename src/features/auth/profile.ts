import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { getQuarterLabel } from "@/data/shell-selectors";
import {
  DEMO_SESSION_COOKIE_NAME,
  ROLE_OVERRIDE_COOKIE_NAME,
} from "@/lib/auth/constants";
import { resolveDemoProfile } from "@/lib/auth/demo-session";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  parseRoleOverride,
  resolveEffectiveRole,
} from "@/features/auth/effective-role";
import { resolveProfileFromUser } from "@/features/auth/resolve-profile";
import type { AuthSnapshot, Profile } from "@/types";

export const getAuthSnapshot = cache(async (): Promise<AuthSnapshot> => {
  const cookieStore = cookies();
  const roleOverride = parseRoleOverride(
    cookieStore.get(ROLE_OVERRIDE_COOKIE_NAME)?.value,
  );

  let realProfile: Profile | null = null;
  let sessionMode: AuthSnapshot["sessionMode"] = "none";

  const supabase = createServerSupabaseClient();

  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    realProfile = resolveProfileFromUser(user);

    if (realProfile) {
      sessionMode = "supabase";
    }
  }

  if (!realProfile) {
    realProfile = resolveDemoProfile(
      cookieStore.get(DEMO_SESSION_COOKIE_NAME)?.value,
    );

    if (realProfile) {
      sessionMode = "demo";
    }
  }

  return {
    realProfile,
    effectiveRole: realProfile
      ? resolveEffectiveRole(realProfile.role, roleOverride)
      : null,
    roleOverride: realProfile ? roleOverride : null,
    isAuthenticated: realProfile !== null,
    sessionMode,
    quarterLabel: getQuarterLabel(),
  };
});
