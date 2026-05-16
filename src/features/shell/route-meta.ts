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
    subtitle: "Context, history, and mission state live here once the workflow layer arrives.",
  },
  "/syncs": {
    title: "Mission Sync",
    subtitle: "Quarterly momentum updates will attach to this operational check-in surface.",
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
    subtitle: "Ambient intelligence surfaces live here once insights are connected.",
  },
  "/admin": {
    title: "Workspace Admin",
    subtitle: "The organizational command view for completion, risk, and governance.",
  },
  "/admin/shared-missions": {
    title: "Shared Missions",
    subtitle: "Shared KPI propagation will connect to this route without changing the shell.",
  },
  "/admin/audit": {
    title: "Audit Trail",
    subtitle: "Change visibility and governance history are reserved for this admin surface.",
  },
};

export function resolveRouteMeta(pathname: string): PageMeta {
  if (pathname.startsWith("/missions/") && pathname !== "/missions/new") {
    return ROUTE_META["/missions/[id]"];
  }

  return ROUTE_META[pathname] ?? ROUTE_META["/"];
}
