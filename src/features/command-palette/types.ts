import type { LucideIcon } from "lucide-react";
import type { UserRole } from "@/types";

export type CommandGroupId =
  | "navigation"
  | "missions"
  | "roles"
  | "actions"
  | "insights";

export type CommandAction =
  | { type: "navigate"; href: string }
  | { type: "role"; role: UserRole };

export interface CommandItem {
  id: string;
  group: CommandGroupId;
  label: string;
  subtitle?: string;
  keywords?: string[];
  icon?: LucideIcon;
  action: CommandAction;
  disabled?: boolean;
}

export interface CommandGroup {
  id: CommandGroupId;
  label: string;
  items: CommandItem[];
}

export const COMMAND_GROUP_LABELS: Record<CommandGroupId, string> = {
  navigation: "Navigation",
  missions: "Missions",
  roles: "Role Switching",
  actions: "Quick Actions",
  insights: "Insights",
};
