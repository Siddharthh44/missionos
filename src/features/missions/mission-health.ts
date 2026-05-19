import type {
  Mission,
  MissionHealth,
  MissionHealthConfidence,
  MissionHealthInsightType,
  MissionHealthStatus,
  MissionHealthTrend,
  MissionHealthUrgency,
} from "@/types";

import { OPERATIONAL_NOW } from "@/lib/operational-time";

/** Demo reference date for deterministic inactivity / due-date heuristics. */
const REFERENCE_DATE = OPERATIONAL_NOW;

const MS_PER_DAY = 86_400_000;

function daysBetween(earlier: Date, later: Date): number {
  return Math.floor((later.getTime() - earlier.getTime()) / MS_PER_DAY);
}

function daysSince(isoDate: string | null | undefined): number | null {
  if (!isoDate) return null;
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) return null;
  return daysBetween(parsed, REFERENCE_DATE);
}

function daysUntil(isoDate: string | null | undefined): number | null {
  if (!isoDate) return null;
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) return null;
  return daysBetween(REFERENCE_DATE, parsed);
}

function hashSeed(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function buildSparkline(
  missionId: string,
  progress: number,
  trend: MissionHealthTrend,
): number[] {
  const points: number[] = [];
  for (let i = 0; i < 5; i += 1) {
    const variance = (hashSeed(`${missionId}-${i}`) % 11) - 5;
    let value = progress;
    if (trend === "up") {
      value = progress - (4 - i) * 3 + variance;
    } else if (trend === "down") {
      value = progress - 8 + i * 2 + variance;
    } else {
      value = progress - 4 + i + variance;
    }
    points.push(clamp(Math.round(value), 0, 100));
  }
  return points;
}

interface InsightCandidate {
  weight: number;
  insight: string;
  recommendation: string;
  insightType: MissionHealthInsightType;
}

function selectInsight(candidates: InsightCandidate[]): InsightCandidate {
  return candidates.reduce((best, current) =>
    current.weight > best.weight ? current : best,
  );
}

export function getMissionHealth(mission: Mission): MissionHealth {
  const progress = mission.latest_sync?.progress_score ?? 0;
  const syncStatus = mission.latest_sync?.sync_status;
  const syncSubmittedDays = daysSince(mission.latest_sync?.submitted_at);
  const updatedDays = daysSince(mission.updated_at);
  const dueInDays = daysUntil(mission.target_date);

  let risk = 0;

  if (mission.status === "draft") risk += 18;
  if (mission.status === "needs_revision") risk += 28;
  if (mission.status === "awaiting_review") risk += 14;

  if (!mission.latest_sync) risk += 20;
  if (progress < 50) risk += 18;
  else if (progress < 70) risk += 10;

  if (syncStatus === "ready_to_start") risk += 14;
  if (syncSubmittedDays !== null && syncSubmittedDays > 10) risk += 16;
  if (updatedDays !== null && updatedDays > 12) risk += 10;

  if (dueInDays !== null && dueInDays >= 0 && dueInDays <= 21 && progress < 80) {
    risk += dueInDays <= 7 ? 20 : 12;
  }

  if (mission.is_shared) risk += 6;
  if (mission.impact_score >= 4 && mission.status !== "aligned") risk += 4;

  if (mission.status === "aligned" && progress >= 75) risk -= 10;
  if (syncStatus === "on_track" || syncStatus === "achieved") risk -= 6;
  if (syncSubmittedDays !== null && syncSubmittedDays <= 5) risk -= 8;

  const score = clamp(100 - risk, 0, 100);

  let status: MissionHealthStatus;
  if (score >= 78) status = "healthy";
  else if (score >= 58) status = "attention";
  else if (score >= 38) status = "at_risk";
  else status = "critical";

  let trend: MissionHealthTrend;
  if (
    mission.status === "aligned" &&
    progress >= 70 &&
    (syncStatus === "on_track" || syncStatus === "achieved") &&
    syncSubmittedDays !== null &&
    syncSubmittedDays <= 7
  ) {
    trend = "up";
  } else if (
    mission.status === "needs_revision" ||
    progress < 55 ||
    syncStatus === "ready_to_start" ||
    (syncSubmittedDays !== null && syncSubmittedDays > 12)
  ) {
    trend = "down";
  } else {
    trend = "neutral";
  }

  let urgency: MissionHealthUrgency;
  if (
    status === "critical" ||
    mission.status === "needs_revision" ||
    (dueInDays !== null && dueInDays >= 0 && dueInDays <= 7 && progress < 70)
  ) {
    urgency = "critical";
  } else if (
    status === "at_risk" ||
    mission.status === "awaiting_review" ||
    (dueInDays !== null && dueInDays >= 0 && dueInDays <= 14)
  ) {
    urgency = "high";
  } else if (status === "attention") {
    urgency = "medium";
  } else {
    urgency = "low";
  }

  let confidence: MissionHealthConfidence;
  if (mission.latest_sync && mission.status !== "draft") {
    confidence = "high";
  } else if (mission.status === "draft" || !mission.latest_sync) {
    confidence = "low";
  } else {
    confidence = "medium";
  }

  const candidates: InsightCandidate[] = [
    {
      weight: mission.status === "needs_revision" ? 95 : 0,
      insight: "Review cycle creating execution drag",
      recommendation:
        "Close the revision loop with a focused proof bundle before the next sync window.",
      insightType: "risk",
    },
    {
      weight:
        syncSubmittedDays !== null && syncSubmittedDays > 10 ? 88 : 0,
      insight: "Momentum slowing due to sync inactivity",
      recommendation:
        "Schedule a checkpoint sync this week to restore cadence visibility.",
      insightType: "risk",
    },
    {
      weight:
        mission.is_shared && progress < 75 ? 82 : mission.is_shared ? 55 : 0,
      insight: "Cross-functional coordination load elevated",
      recommendation:
        "Confirm stakeholder owners and dependency checkpoints on the shared lane.",
      insightType: "pattern",
    },
    {
      weight:
        dueInDays !== null && dueInDays >= 0 && dueInDays <= 21 && progress < 80
          ? 80 + (dueInDays <= 7 ? 10 : 0)
          : 0,
      insight:
        dueInDays !== null && dueInDays <= 14
          ? "Deadline pressure mounting with progress gap"
          : "Execution risk increasing from dependency drift",
      recommendation:
        "Re-sequence near-term milestones and validate blocker owners before the close window.",
      insightType: "risk",
    },
    {
      weight: mission.status === "awaiting_review" ? 75 : 0,
      insight: "Alignment gate pending — delivery pacing on hold",
      recommendation:
        "Submit the alignment narrative so execution can resume without drift.",
      insightType: "recommendation",
    },
    {
      weight: syncStatus === "ready_to_start" ? 72 : 0,
      insight: "Sync cadence breakdown detected",
      recommendation:
        "Open the quarter sync with baseline actuals to re-establish progress tracking.",
      insightType: "risk",
    },
    {
      weight:
        mission.status === "aligned" && progress >= 75 && trend === "up" ? 70 : 0,
      insight: "Strong delivery velocity maintained",
      recommendation:
        "Protect the current sync rhythm and capture proof while momentum is high.",
      insightType: "opportunity",
    },
    {
      weight: updatedDays !== null && updatedDays > 12 ? 65 : 0,
      insight: "Owner update streak interrupted",
      recommendation:
        "Refresh mission narrative and sync notes to keep operational visibility current.",
      insightType: "pattern",
    },
    {
      weight: 40,
      insight:
        status === "healthy"
          ? "Operational posture stable for the current quarter"
          : "Execution signals warrant closer operational attention",
      recommendation:
        status === "healthy"
          ? "Maintain sync cadence and keep evidence bundles current."
          : "Prioritize the highest-weight blocker in the next working session.",
      insightType: status === "healthy" ? "pattern" : "recommendation",
    },
  ];

  const selected = selectInsight(candidates);

  return {
    status,
    confidence,
    insight: selected.insight,
    recommendation: selected.recommendation,
    trend,
    urgency,
    score,
    insightType: selected.insightType,
    sparkline: buildSparkline(mission.id, progress, trend),
  };
}

export function getMissionHealthLabel(status: MissionHealthStatus): string {
  switch (status) {
    case "healthy":
      return "Healthy";
    case "attention":
      return "Attention";
    case "at_risk":
      return "At Risk";
    case "critical":
      return "Critical";
    default:
      return "Unknown";
  }
}
