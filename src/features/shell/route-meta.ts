import type { PageMeta } from "@/types";

export const ROUTE_META: Record<string, PageMeta> = {
  "/": {
    title: "Mission Control",
    subtitle: "A calm operational overview of where work stands right now.",
    ctaLabel: "Create Mission",
  },
  "/login": {
    title: "Sign in to MissionOS",
    subtitle: "Access the workspace where teams align, execute, and accelerate.",
  },
  "/missions": {
    title: "Mission Board",
    subtitle: "A role-aware board for current quarter work, impact, and mission health.",
    ctaLabel: "Create Mission",
  },
  "/missions/new": {
    title: "Create Mission",
    subtitle: "A guided mission setup surface designed for clarity before complexity.",
  },
  "/missions/[id]": {
    title: "Mission Detail",
    subtitle: "Context, history, and mission state for the active delivery lane.",
  },
  "/syncs": {
    title: "Mission Sync",
    subtitle: "Quarterly momentum check-ins, sync cadence, and review readiness.",
  },
  "/team": {
    title: "Team Momentum",
    subtitle: "A manager-focused overview of progress, risk, and review load.",
  },
  "/review": {
    title: "Alignment Review",
    subtitle: "A queue-first destination for reviewing and refining team missions.",
  },
  "/insights": {
    title: "Momentum Insights",
    subtitle: "Portfolio health, executive briefing, and operational risk signals.",
  },
  "/admin": {
    title: "Workspace Admin",
    subtitle: "The organizational command view for completion, risk, and governance.",
  },
  "/admin/shared-missions": {
    title: "Shared Missions",
    subtitle: "Cross-team KPI propagation and shared mission governance.",
  },
  "/admin/audit": {
    title: "Audit Trail",
    subtitle: "Change visibility and governance history across the workspace.",
  },
};

export function resolveRouteMeta(pathname: string): PageMeta {
  if (pathname.startsWith("/missions/") && pathname !== "/missions/new") {
    return ROUTE_META["/missions/[id]"];
  }

  return ROUTE_META[pathname] ?? ROUTE_META["/"];
}
