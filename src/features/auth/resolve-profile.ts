import type { User } from "@supabase/supabase-js";
import { previewProfiles } from "@/data/seed";
import type { Profile, UserRole } from "@/types";

const SEEDED_PROFILE_BY_EMAIL = Object.fromEntries(
  Object.values(previewProfiles).map((profile) => [profile.email, profile]),
) as Record<string, Profile>;

function toDisplayName(email: string) {
  return email
    .split("@")[0]
    .split(/[._-]/)
    .filter(Boolean)
    .map((segment) => segment[0]?.toUpperCase() + segment.slice(1))
    .join(" ");
}

export function resolveProfileFromUser(user: User | null): Profile | null {
  if (!user?.email) {
    return null;
  }

  const normalizedEmail = user.email.toLowerCase();
  const seededProfile = SEEDED_PROFILE_BY_EMAIL[normalizedEmail];

  if (seededProfile) {
    return seededProfile;
  }

  const metadata = user.user_metadata ?? {};
  const role = (metadata.role as UserRole | undefined) ?? "employee";

  return {
    id: user.id,
    name:
      (metadata.full_name as string | undefined) ??
      (metadata.name as string | undefined) ??
      toDisplayName(normalizedEmail),
    email: normalizedEmail,
    role,
    department: (metadata.department as string | undefined) ?? null,
    manager_id: null,
    avatar_url: (metadata.avatar_url as string | undefined) ?? null,
  };
}
