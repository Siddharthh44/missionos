import { previewProfiles } from "@/data/seed";
import { DEMO_PASSWORD } from "@/lib/auth/constants";
import type { Profile } from "@/types";

const DEMO_PROFILES = Object.values(previewProfiles);

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function getDemoProfiles(): Profile[] {
  return DEMO_PROFILES;
}

export function resolveDemoProfile(identifier: string | null | undefined) {
  if (!identifier) {
    return null;
  }

  const normalizedIdentifier = normalizeEmail(identifier);

  return (
    DEMO_PROFILES.find((profile) => profile.email === normalizedIdentifier) ??
    DEMO_PROFILES.find((profile) => profile.id === normalizedIdentifier) ??
    null
  );
}

export function isValidDemoPassword(password: string) {
  return password === DEMO_PASSWORD;
}

export function createDemoSessionValue(profile: Profile) {
  return profile.email;
}
