import {
  Activity,
  ClipboardCheck,
  FolderKanban,
  Radar,
  RefreshCw,
  Search,
  Shield,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { OperationalEmptyAction } from "@/components/shell/operational-empty-state";

export interface OperationalEmptyPreset {
  icon: LucideIcon;
  title: string;
  body: string;
  guidance?: string;
  label?: string;
  action?: OperationalEmptyAction;
}

export const operationalEmptyPresets = {
  missionsCatalog: {
    icon: FolderKanban,
    label: "Mission Board",
    title: "No active missions in workspace",
    body: "Establish quarterly focus lanes with clear outcomes and ownership.",
    guidance: "Missions surface here once created and assigned.",
    action: { label: "Create Mission", href: "/missions/new" },
  },
  missionsFiltered: {
    icon: Search,
    label: "Mission Board",
    title: "No matching missions found for current filters",
    body: "Adjust search, status, or thrust filters to widen the board view.",
    guidance: "Clear filters to return to the full mission catalog.",
  },
  reviewsClear: {
    icon: ClipboardCheck,
    label: "Review Queue",
    title: "No missions currently require review",
    body: "The alignment queue is clear for this review window.",
    guidance: "New submissions will surface here when teams request alignment.",
  },
  syncsHealthy: {
    icon: RefreshCw,
    label: "Sync Cadence",
    title: "Sync cadence is healthy across active missions",
    body: "All missions carry current momentum updates for this check-in cycle.",
    guidance: "Pending sync windows will appear when submissions are due.",
  },
  insightsClear: {
    icon: Sparkles,
    label: "Mission Health",
    title: "No operational risks detected in this window",
    body: "Portfolio health signals will populate as missions enter active tracking.",
    guidance: "Add missions to the catalog to enable fleet-level interpretation.",
  },
  activityQuiet: {
    icon: Activity,
    label: "Activity Feed",
    title: "No recent operational movement",
    body: "Mission updates, reviews, and sync events will stream here as work progresses.",
    guidance: "Activity reflects the last operational window across the workspace.",
  },
  commandNoMatch: {
    icon: Search,
    title: "No matching commands for this query",
    body: "Try a route name, navigation label, or action keyword.",
    guidance: "Use fewer characters or broaden the search term.",
  },
  adminNoRecords: {
    icon: Shield,
    label: "Governance",
    title: "No governance records in this view",
    body: "Administrative events and configuration changes will log here as they occur.",
    guidance: "Records appear when shared missions or workspace settings change.",
  },
  adminAuditClear: {
    icon: Radar,
    label: "Audit Trail",
    title: "No audit events in the selected window",
    body: "Change visibility and governance history will accumulate as actions are taken.",
    guidance: "Narrow or widen the time window to inspect prior activity.",
  },
  surfaceBlockEmpty: {
    icon: FolderKanban,
    title: "No items in this operational lane",
    body: "Structured entries will appear when this surface receives data.",
    guidance: "Lanes stay visible to preserve dashboard composition.",
  },
} as const satisfies Record<string, OperationalEmptyPreset>;

export type OperationalEmptyPresetKey = keyof typeof operationalEmptyPresets;
