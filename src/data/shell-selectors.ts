import { previewActivityByRole, previewPlaceholderContent, previewQuarter, previewStatsByRole } from "@/data/seed";
import type { ActivityItem, PlaceholderSurfaceContent, ShellStat, UserRole } from "@/types";

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
