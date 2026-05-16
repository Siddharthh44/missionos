import {
  previewMissionDetailSurfaces,
  previewOperationalSurfacesByRole,
  previewQuarter,
} from "@/data/seed";
import type { OperationalRouteSurface, UserRole } from "@/types";

function normalizePath(pathname: string) {
  if (pathname.startsWith("/missions/") && pathname !== "/missions/new") {
    return "/missions/[id]";
  }

  return pathname;
}

function getFallbackMissionDetail() {
  return (
    previewMissionDetailSurfaces["mission-reliability-control-plane"] ??
    Object.values(previewMissionDetailSurfaces)[0]
  );
}

export function getQuarterLabel(): string {
  return `${previewQuarter.quarter.replace("-", " ")} sync window`;
}

export function getOperationalSurface(
  pathname: string,
  role: UserRole,
  missionId?: string,
): OperationalRouteSurface {
  const normalizedPath = normalizePath(pathname);

  if (normalizedPath === "/missions/[id]") {
    return getMissionDetailSurface(role, missionId);
  }

  return (
    previewOperationalSurfacesByRole[role][normalizedPath] ??
    previewOperationalSurfacesByRole[role]["/"]
  );
}

export function getMissionDetailSurface(
  _role: UserRole,
  missionId?: string,
): OperationalRouteSurface {
  if (missionId && previewMissionDetailSurfaces[missionId]) {
    return previewMissionDetailSurfaces[missionId];
  }

  return getFallbackMissionDetail();
}
