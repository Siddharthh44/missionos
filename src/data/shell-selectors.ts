import { previewActivityByRole, previewPlaceholderContent, previewProfiles, previewQuarter, previewStatsByRole } from "@/data/seed";
import type { ActivityItem, PlaceholderSurfaceContent, Profile, ShellStat, UserRole } from "@/types";

export function getPreviewProfile(role: UserRole): Profile {
  return previewProfiles[role];
}

export function getQuarterLabel(): string {
  return `${previewQuarter.quarter.replace("-", " ")} · Mission Sync Open`;
}

export function getRoleStats(role: UserRole): ShellStat[] {
  return previewStatsByRole[role];
}

export function getRoleActivity(role: UserRole): ActivityItem[] {
  return previewActivityByRole[role];
}

export function getPlaceholderSurface(pathname: string): PlaceholderSurfaceContent {
  return previewPlaceholderContent[pathname];
}
