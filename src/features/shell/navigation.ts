import {
  Activity,
  ClipboardCheck,
  Compass,
  LayoutDashboard,
  Radar,
  ShieldCheck,
  Target,
  Users,
  Waypoints,
} from "lucide-react";
import type { NavigationSectionDefinition } from "@/types";

export const NAVIGATION_SECTIONS: NavigationSectionDefinition[] = [
  {
    label: "Mission Layer",
    items: [
      { label: "Mission Control", href: "/", icon: LayoutDashboard, allowedRoles: ["employee", "manager", "admin"] },
      { label: "Mission Board", href: "/missions", icon: Target, allowedRoles: ["employee", "manager", "admin"] },
      { label: "Mission Sync", href: "/syncs", icon: Activity, allowedRoles: ["employee", "manager", "admin"] },
      { label: "Momentum Insights", href: "/insights", icon: Compass, allowedRoles: ["employee", "manager", "admin"] },
    ],
  },
  {
    label: "Manager View",
    items: [
      { label: "Team Momentum", href: "/team", icon: Users, allowedRoles: ["manager", "admin"] },
      { label: "Alignment Review", href: "/review", icon: ClipboardCheck, allowedRoles: ["manager", "admin"] },
    ],
  },
  {
    label: "Workspace Admin",
    items: [
      { label: "Workspace Admin", href: "/admin", icon: Radar, allowedRoles: ["admin"] },
      { label: "Shared Missions", href: "/admin/shared-missions", icon: Waypoints, allowedRoles: ["manager", "admin"] },
      { label: "Audit Trail", href: "/admin/audit", icon: ShieldCheck, allowedRoles: ["admin"] },
    ],
  },
];
