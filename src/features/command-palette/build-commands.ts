import {
  ClipboardCheck,
  Compass,
  LayoutDashboard,
  Plus,
  Target,
  Users,
} from "lucide-react";
import { MISSION_CATALOG } from "@/data/mission-catalog";
import { isRouteAllowed } from "@/features/shell/route-access";
import { NAVIGATION_SECTIONS } from "@/features/shell/navigation";
import {
  COMMAND_GROUP_LABELS,
  type CommandGroup,
  type CommandGroupId,
  type CommandItem,
} from "@/features/command-palette/types";
import type { UserRole } from "@/types";

const ROLE_LABELS: Record<UserRole, string> = {
  employee: "Employee",
  manager: "Manager",
  admin: "Admin",
};

function group(
  id: CommandGroupId,
  items: CommandItem[],
): CommandGroup | null {
  if (items.length === 0) {
    return null;
  }

  return {
    id,
    label: COMMAND_GROUP_LABELS[id],
    items,
  };
}

function navigationCommands(role: UserRole): CommandItem[] {
  return NAVIGATION_SECTIONS.flatMap((section) =>
    section.items
      .filter((item) => item.allowedRoles.includes(role))
      .map((item) => ({
        id: `nav-${item.href}`,
        group: "navigation" as const,
        label: item.label,
        subtitle: section.label,
        keywords: [section.label, item.href],
        icon: item.icon,
        action: { type: "navigate" as const, href: item.href },
      })),
  );
}

function missionCommands(role: UserRole): CommandItem[] {
  return MISSION_CATALOG.flatMap((mission) => {
    const href = `/missions/${mission.id}`;
    if (!isRouteAllowed(role, href)) {
      return [];
    }

    return [
      {
        id: `mission-${mission.id}`,
        group: "missions" as const,
        label: mission.title,
        subtitle: `${mission.thrust_area} · ${mission.employee?.name ?? "Unassigned"}`,
        keywords: [
          mission.id,
          mission.thrust_area,
          mission.status,
          mission.employee?.name ?? "",
          mission.employee?.department ?? "",
        ],
        icon: Target,
        action: { type: "navigate" as const, href },
      },
    ];
  });
}

function roleCommands(currentRole: UserRole): CommandItem[] {
  const roles: UserRole[] = ["employee", "manager", "admin"];

  return roles.map((role) => ({
    id: `role-${role}`,
    group: "roles" as const,
    label: `Switch to ${ROLE_LABELS[role]} view`,
    subtitle: role === currentRole ? "Current view" : "Demo role preview",
    keywords: ["role", "switch", role, ROLE_LABELS[role]],
    icon: Users,
    action: { type: "role" as const, role },
    disabled: role === currentRole,
  }));
}

function quickActionCommands(role: UserRole): CommandItem[] {
  const items: CommandItem[] = [];

  if (isRouteAllowed(role, "/missions/new")) {
    items.push({
      id: "action-create-mission",
      group: "actions",
      label: "Create mission",
      subtitle: "Open mission composer",
      keywords: ["new", "add", "mission"],
      icon: Plus,
      action: { type: "navigate", href: "/missions/new" },
    });
  }

  if (isRouteAllowed(role, "/review")) {
    items.push({
      id: "action-review-queue",
      group: "actions",
      label: "Open review queue",
      subtitle: "Alignment review workspace",
      keywords: ["review", "alignment", "approve"],
      icon: ClipboardCheck,
      action: { type: "navigate", href: "/review" },
    });
  }

  if (isRouteAllowed(role, "/missions")) {
    items.push({
      id: "action-mission-board",
      group: "actions",
      label: "Open mission board",
      subtitle: "Fleet execution view",
      keywords: ["board", "missions", "fleet"],
      icon: Target,
      action: { type: "navigate", href: "/missions" },
    });
  }

  return items;
}

function insightCommands(role: UserRole): CommandItem[] {
  const items: CommandItem[] = [];

  if (isRouteAllowed(role, "/insights")) {
    items.push({
      id: "insights-momentum",
      group: "insights",
      label: "Open Momentum Insights",
      subtitle: "Operational intelligence layer",
      keywords: ["insights", "momentum", "analytics", "briefing"],
      icon: Compass,
      action: { type: "navigate", href: "/insights" },
    });
  }

  if (isRouteAllowed(role, "/")) {
    items.push({
      id: "insights-mission-control",
      group: "insights",
      label: "Open Mission Control",
      subtitle: "Today's operational briefing",
      keywords: ["dashboard", "control", "briefing", "executive"],
      icon: LayoutDashboard,
      action: { type: "navigate", href: "/" },
    });
  }

  return items;
}

export function buildCommandGroups(role: UserRole): CommandGroup[] {
  const groups = [
    group("navigation", navigationCommands(role)),
    group("missions", missionCommands(role)),
    group("roles", roleCommands(role)),
    group("actions", quickActionCommands(role)),
    group("insights", insightCommands(role)),
  ];

  return groups.filter((entry): entry is CommandGroup => entry !== null);
}
