import type { LucideIcon } from "lucide-react";

export type UserRole = "employee" | "manager" | "admin";
export type SessionMode = "supabase" | "demo" | "none";

export interface Profile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string | null;
  manager_id: string | null;
  avatar_url: string | null;
}

export interface AuthSnapshot {
  realProfile: Profile | null;
  effectiveRole: UserRole | null;
  roleOverride: UserRole | null;
  isAuthenticated: boolean;
  sessionMode: SessionMode;
  quarterLabel: string;
}

export type UomType =
  | "numeric_min"
  | "numeric_max"
  | "percentage_min"
  | "percentage_max"
  | "timeline"
  | "zero_based";

export type MissionStatus =
  | "draft"
  | "awaiting_review"
  | "aligned"
  | "needs_revision"
  | "locked";

export type SyncStatus = "ready_to_start" | "on_track" | "achieved";

export interface Mission {
  id: string;
  employee_id: string;
  title: string;
  description: string | null;
  thrust_area: string;
  uom_type: UomType;
  target_value: number | null;
  target_date: string | null;
  impact_score: number;
  status: MissionStatus;
  is_shared: boolean;
  shared_source_id: string | null;
  quarter: string;
  year: number;
  locked_at: string | null;
  created_at: string;
  updated_at: string;
  employee?: Profile;
  latest_sync?: MissionSync | null;
}

export interface MissionSync {
  id: string;
  mission_id: string;
  quarter: string;
  actual_value: number | null;
  actual_date: string | null;
  sync_status: SyncStatus;
  progress_score: number | null;
  submitted_at: string | null;
  created_at: string;
}

export interface MissionReview {
  id: string;
  mission_id: string;
  reviewer_id: string;
  action: "approved" | "returned" | "edited";
  comment: string | null;
  edits: Record<string, { old: unknown; new: unknown }> | null;
  created_at: string;
  reviewer?: Profile;
}

export interface CheckinComment {
  id: string;
  sync_id: string;
  manager_id: string;
  comment: string;
  created_at: string;
  manager?: Profile;
}

export interface AuditLog {
  id: string;
  actor_id: string;
  entity_type: string;
  entity_id: string;
  action: string;
  changes: Record<string, unknown> | null;
  created_at: string;
  actor?: Profile;
}

export interface InsightResponse {
  summary: string;
  momentum_score: number;
  risk_signals: string[];
  recommendations: string[];
}

export interface ExecutiveBriefingMomentum {
  score: number;
  deltaPercent: number;
  trend: MissionHealthTrend;
  label: string;
}

export interface ExecutiveBriefingRisk {
  label: string;
  severity: "low" | "medium" | "high";
}

export interface ExecutiveBriefing {
  headline: string;
  summary: string;
  confidence: MissionHealthConfidence;
  momentum: ExecutiveBriefingMomentum;
  risks: ExecutiveBriefingRisk[];
  highlights: string[];
  recommendations: string[];
}

export type MissionHealthStatus = "healthy" | "attention" | "at_risk" | "critical";
export type MissionHealthConfidence = "high" | "medium" | "low";
export type MissionHealthTrend = "up" | "down" | "neutral";
export type MissionHealthUrgency = "low" | "medium" | "high" | "critical";
export type MissionHealthInsightType =
  | "pattern"
  | "risk"
  | "opportunity"
  | "recommendation";

export interface MissionHealth {
  status: MissionHealthStatus;
  confidence: MissionHealthConfidence;
  insight: string;
  recommendation: string;
  trend: MissionHealthTrend;
  urgency: MissionHealthUrgency;
  score: number;
  insightType: MissionHealthInsightType;
  sparkline: number[];
}

export interface QuarterWindow {
  id: string;
  quarter: string;
  phase: string;
  opens_at: string;
  closes_at: string;
  is_active: boolean;
}

export interface ShellStat {
  label: string;
  value: string;
  tone?: "default" | "accent" | "success" | "warning";
  detail?: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
}

export interface PageMeta {
  title: string;
  subtitle: string;
  ctaLabel?: string;
}

export interface NavigationItemDefinition {
  label: string;
  href: string;
  icon: LucideIcon;
  allowedRoles: UserRole[];
}

export interface NavigationSectionDefinition {
  label: string;
  items: NavigationItemDefinition[];
}

export interface PlaceholderSurfaceContent {
  eyebrow: string;
  title: string;
  description: string;
  emptyTitle: string;
  emptyBody: string;
  points: string[];
  metrics: ShellStat[];
  sideTitle: string;
  sideBody: string;
  sideHighlights: string[];
}

export type SurfaceTone =
  | "default"
  | "accent"
  | "success"
  | "warning";

export interface OperationalBadge {
  label: string;
  tone?: SurfaceTone;
}

export interface OperationalHeroHighlight {
  label: string;
  value: string;
  detail: string;
}

export interface OperationalHeroSurface {
  label: string;
  title: string;
  description: string;
  highlights: OperationalHeroHighlight[];
  noteTitle: string;
  noteBody: string;
  noteHighlights: string[];
}

export interface OperationalSurfaceItem {
  id: string;
  title: string;
  description: string;
  detail?: string;
  meta?: string[];
  badges?: OperationalBadge[];
  progress?: number;
  href?: string;
}

export interface OperationalSurfaceBlock {
  label: string;
  title: string;
  description: string;
  layout?: "stack" | "grid" | "timeline";
  items: OperationalSurfaceItem[];
}

export interface OperationalSupportPanel {
  label: string;
  title: string;
  body: string;
  highlights: string[];
}

export interface OperationalRouteSurface {
  stats: ShellStat[];
  hero: OperationalHeroSurface;
  primary: OperationalSurfaceBlock;
  secondary: OperationalSurfaceBlock;
  support: OperationalSupportPanel[];
  activity?: ActivityItem[];
}
