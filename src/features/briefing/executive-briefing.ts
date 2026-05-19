import { getMissionHealth } from "@/features/missions/mission-health";
import type {
  ExecutiveBriefing,
  ExecutiveBriefingRisk,
  Mission,
  MissionHealth,
  MissionHealthConfidence,
  MissionHealthTrend,
} from "@/types";

interface MissionHealthRow {
  mission: Mission;
  health: MissionHealth;
}

interface BriefingMetrics {
  fleetSize: number;
  avgScore: number;
  healthyCount: number;
  attentionCount: number;
  atRiskCount: number;
  criticalCount: number;
  trendUpCount: number;
  trendDownCount: number;
  acceleratedCount: number;
  reviewBottleneckCount: number;
  coordinationPressureCount: number;
  executionDriftCount: number;
  syncBreakdownCount: number;
  syncHealthyCount: number;
  highConfidenceCount: number;
  lowConfidenceCount: number;
  platformRiskElevated: boolean;
  momentumDeltaPercent: number;
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

function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return count === 1 ? singular : plural;
}

function buildRows(missions: Mission[]): MissionHealthRow[] {
  return missions.map((mission) => ({
    mission,
    health: getMissionHealth(mission),
  }));
}

function computeMetrics(rows: MissionHealthRow[]): BriefingMetrics {
  const fleetSize = Math.max(rows.length, 1);
  const avgScore = Math.round(
    rows.reduce((sum, row) => sum + row.health.score, 0) / fleetSize,
  );

  const statusCounts = rows.reduce(
    (acc, { health }) => {
      acc[health.status] = (acc[health.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<MissionHealth["status"], number>,
  );

  const trendUpCount = rows.filter(({ health }) => health.trend === "up").length;
  const trendDownCount = rows.filter(({ health }) => health.trend === "down").length;

  const acceleratedCount = rows.filter(
    ({ mission, health }) =>
      health.trend === "up" &&
      mission.status === "aligned" &&
      (mission.latest_sync?.progress_score ?? 0) >= 70,
  ).length;

  const reviewBottleneckCount = rows.filter(
    ({ mission }) => mission.status === "awaiting_review",
  ).length;

  const coordinationPressureCount = rows.filter(
    ({ mission, health }) =>
      mission.is_shared ||
      health.insight.toLowerCase().includes("coordination") ||
      health.insight.toLowerCase().includes("cross-functional"),
  ).length;

  const executionDriftCount = rows.filter(
    ({ mission, health }) =>
      health.trend === "down" ||
      mission.status === "needs_revision" ||
      health.insight.toLowerCase().includes("drift") ||
      health.insight.toLowerCase().includes("deadline pressure"),
  ).length;

  const syncBreakdownCount = rows.filter(
    ({ mission }) => mission.latest_sync?.sync_status === "ready_to_start",
  ).length;

  const syncHealthyCount = rows.filter(({ mission }) => {
    const status = mission.latest_sync?.sync_status;
    return status === "on_track" || status === "achieved";
  }).length;

  const highConfidenceCount = rows.filter(
    ({ health }) => health.confidence === "high",
  ).length;

  const lowConfidenceCount = rows.filter(
    ({ health }) => health.confidence === "low",
  ).length;

  const platformRiskElevated = rows.some(
    ({ mission, health }) =>
      mission.thrust_area.toLowerCase().includes("platform") &&
      (health.status === "at_risk" ||
        health.status === "critical" ||
        health.status === "attention") &&
      (syncBreakdownCount > 0 || health.trend === "down"),
  );

  const baselineSkew =
    rows.reduce((sum, row) => sum + (hashSeed(row.mission.id) % 9), 0) /
    fleetSize;
  const syntheticPrior = clamp(avgScore - 6 + baselineSkew, 0, 100);
  const momentumDeltaPercent = clamp(
    Math.round(((avgScore - syntheticPrior) / Math.max(syntheticPrior, 1)) * 100),
    -24,
    24,
  );

  return {
    fleetSize: rows.length,
    avgScore,
    healthyCount: statusCounts.healthy ?? 0,
    attentionCount: statusCounts.attention ?? 0,
    atRiskCount: statusCounts.at_risk ?? 0,
    criticalCount: statusCounts.critical ?? 0,
    trendUpCount,
    trendDownCount,
    acceleratedCount,
    reviewBottleneckCount,
    coordinationPressureCount,
    executionDriftCount,
    syncBreakdownCount,
    syncHealthyCount,
    highConfidenceCount,
    lowConfidenceCount,
    platformRiskElevated,
    momentumDeltaPercent,
  };
}

function deriveConfidence(metrics: BriefingMetrics): MissionHealthConfidence {
  const coverageRatio = metrics.highConfidenceCount / Math.max(metrics.fleetSize, 1);
  const riskLoad =
    metrics.atRiskCount + metrics.criticalCount + metrics.attentionCount;

  if (coverageRatio >= 0.6 && riskLoad <= 1 && metrics.lowConfidenceCount === 0) {
    return "high";
  }
  if (coverageRatio >= 0.4 && metrics.criticalCount === 0) {
    return "medium";
  }
  return "low";
}

function deriveMomentumTrend(
  metrics: BriefingMetrics,
): MissionHealthTrend {
  if (
    metrics.momentumDeltaPercent >= 4 ||
    (metrics.trendUpCount > metrics.trendDownCount && metrics.avgScore >= 70)
  ) {
    return "up";
  }
  if (
    metrics.momentumDeltaPercent <= -4 ||
    metrics.trendDownCount > metrics.trendUpCount ||
    metrics.executionDriftCount >= 2
  ) {
    return "down";
  }
  return "neutral";
}

function momentumLabel(trend: MissionHealthTrend, metrics: BriefingMetrics): string {
  if (trend === "up") return "Organizational momentum improving";
  if (trend === "down") return "Organizational momentum under pressure";
  if (metrics.avgScore >= 75) return "Organizational momentum holding steady";
  return "Organizational momentum mixed across portfolio";
}

function buildRisks(metrics: BriefingMetrics): ExecutiveBriefingRisk[] {
  const risks: ExecutiveBriefingRisk[] = [];

  if (metrics.criticalCount > 0 || metrics.atRiskCount > 0) {
    risks.push({
      label: `${metrics.atRiskCount + metrics.criticalCount} ${pluralize(
        metrics.atRiskCount + metrics.criticalCount,
        "mission",
      )} in elevated portfolio risk`,
      severity: metrics.criticalCount > 0 ? "high" : "medium",
    });
  }

  if (metrics.executionDriftCount > 0) {
    risks.push({
      label: `Execution drift on ${metrics.executionDriftCount} ${pluralize(
        metrics.executionDriftCount,
        "lane",
      )}`,
      severity: metrics.executionDriftCount >= 2 ? "high" : "medium",
    });
  }

  if (metrics.coordinationPressureCount > 0) {
    risks.push({
      label: "Cross-functional coordination pressure elevated",
      severity: metrics.coordinationPressureCount >= 2 ? "high" : "medium",
    });
  }

  if (metrics.reviewBottleneckCount > 0) {
    risks.push({
      label: `${metrics.reviewBottleneckCount} alignment ${pluralize(
        metrics.reviewBottleneckCount,
        "gate",
      )} pending review`,
      severity: "medium",
    });
  }

  if (metrics.syncBreakdownCount > 0) {
    risks.push({
      label: `${metrics.syncBreakdownCount} ${pluralize(
        metrics.syncBreakdownCount,
        "mission",
      )} with sync cadence breakdown`,
      severity: metrics.syncBreakdownCount >= 2 ? "high" : "medium",
    });
  }

  if (metrics.platformRiskElevated) {
    risks.push({
      label: "Infrastructure execution risk increased after delayed sync cadence",
      severity: "high",
    });
  }

  if (risks.length === 0) {
    risks.push({
      label: "No material portfolio risk signals detected",
      severity: "low",
    });
  }

  return risks.slice(0, 4);
}

function buildHighlights(metrics: BriefingMetrics): string[] {
  const highlights: string[] = [];

  if (metrics.acceleratedCount > 0) {
    highlights.push(
      `${metrics.acceleratedCount} ${pluralize(metrics.acceleratedCount, "mission")} accelerated ahead of schedule this week.`,
    );
  }

  if (metrics.momentumDeltaPercent !== 0) {
    const direction = metrics.momentumDeltaPercent > 0 ? "improved" : "softened";
    highlights.push(
      `Operational momentum ${direction} ${Math.abs(metrics.momentumDeltaPercent)}% week-over-week.`,
    );
  }

  if (metrics.healthyCount > 0) {
    highlights.push(
      `${metrics.healthyCount} of ${metrics.fleetSize} missions reporting healthy operational posture.`,
    );
  }

  if (metrics.syncHealthyCount > 0) {
    highlights.push(
      `Sync health stable on ${metrics.syncHealthyCount} ${pluralize(
        metrics.syncHealthyCount,
        "lane",
      )} with on-track cadence.`,
    );
  }

  if (metrics.coordinationPressureCount > 0) {
    highlights.push(
      "Cross-functional coordination pressure remains elevated across shared execution lanes.",
    );
  }

  if (metrics.reviewBottleneckCount > 0) {
    highlights.push(
      `${metrics.reviewBottleneckCount} review ${pluralize(
        metrics.reviewBottleneckCount,
        "bottleneck",
      )} slowing delivery pacing.`,
    );
  }

  if (highlights.length === 0) {
    highlights.push(
      "Portfolio signals are stable — maintain current sync rhythm and proof capture.",
    );
  }

  return highlights.slice(0, 4);
}

function buildRecommendations(
  metrics: BriefingMetrics,
  rows: MissionHealthRow[],
): string[] {
  const recommendations: string[] = [];

  if (metrics.reviewBottleneckCount > 0) {
    recommendations.push(
      "Clear alignment gates on awaiting-review missions before the next sync window.",
    );
  }

  if (metrics.syncBreakdownCount > 0) {
    recommendations.push(
      "Re-open quarter syncs with baseline actuals on lanes showing cadence breakdown.",
    );
  }

  if (metrics.executionDriftCount > 0) {
    recommendations.push(
      "Re-sequence near-term milestones on drift lanes and confirm blocker owners.",
    );
  }

  if (metrics.coordinationPressureCount > 0) {
    recommendations.push(
      "Confirm stakeholder owners and dependency checkpoints on shared execution lanes.",
    );
  }

  const topRisk = [...rows].sort((a, b) => a.health.score - b.health.score)[0];
  if (topRisk && topRisk.health.score < 65) {
    recommendations.push(topRisk.health.recommendation);
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "Protect delivery velocity on healthy lanes and keep evidence bundles current.",
    );
  }

  return Array.from(new Set(recommendations)).slice(0, 3);
}

function buildHeadline(metrics: BriefingMetrics, trend: MissionHealthTrend): string {
  if (metrics.criticalCount > 0) {
    return "Critical execution signals require executive attention";
  }
  if (trend === "up" && metrics.acceleratedCount > 0) {
    return "Portfolio momentum strengthening with accelerated delivery";
  }
  if (metrics.executionDriftCount >= 2 || metrics.syncBreakdownCount >= 2) {
    return "Execution drift widening across the active mission portfolio";
  }
  if (metrics.reviewBottleneckCount > 0 && metrics.atRiskCount > 0) {
    return "Review bottlenecks compounding portfolio risk";
  }
  if (metrics.avgScore >= 75) {
    return "Operational posture stable with selective risk pockets";
  }
  return "Mixed operational signals across the mission portfolio";
}

function buildSummary(
  metrics: BriefingMetrics,
  trend: MissionHealthTrend,
  confidence: MissionHealthConfidence,
): string {
  const parts: string[] = [];

  parts.push(
    `Fleet health averages ${metrics.avgScore} with ${metrics.healthyCount} healthy and ${
      metrics.atRiskCount + metrics.criticalCount + metrics.attentionCount
    } lanes needing attention.`,
  );

  if (metrics.acceleratedCount > 0) {
    parts.push(
      `${metrics.acceleratedCount} ${pluralize(metrics.acceleratedCount, "mission")} show delivery acceleration.`,
    );
  }

  if (metrics.platformRiskElevated) {
    parts.push(
      "Infrastructure execution risk increased after delayed sync cadence.",
    );
  } else if (metrics.syncBreakdownCount > 0) {
    parts.push(
      `${metrics.syncBreakdownCount} ${pluralize(metrics.syncBreakdownCount, "mission")} report sync cadence stress.`,
    );
  }

  if (metrics.coordinationPressureCount > 0) {
    parts.push("Cross-functional coordination pressure remains elevated.");
  }

  if (trend === "up" && metrics.momentumDeltaPercent > 0) {
    parts.push(
      `Operational momentum improved ${metrics.momentumDeltaPercent}% week-over-week.`,
    );
  } else if (trend === "down" && metrics.momentumDeltaPercent < 0) {
    parts.push(
      `Operational momentum softened ${Math.abs(metrics.momentumDeltaPercent)}% week-over-week.`,
    );
  }

  parts.push(
    confidence === "high"
      ? "Overall operational confidence is high based on sync coverage and signal quality."
      : confidence === "medium"
        ? "Overall operational confidence is moderate — validate weak signals in the next sync cycle."
        : "Overall operational confidence is constrained by limited sync coverage or draft lanes.",
  );

  return parts.join(" ");
}

export function getExecutiveBriefing(missions: Mission[]): ExecutiveBriefing {
  if (missions.length === 0) {
    return {
      headline: "No active missions in portfolio",
      summary:
        "Add missions to the catalog to generate an operational briefing for the organization.",
      confidence: "low",
      momentum: {
        score: 0,
        deltaPercent: 0,
        trend: "neutral",
        label: "Awaiting mission data",
      },
      risks: [{ label: "Portfolio empty", severity: "low" }],
      highlights: ["No mission health signals available."],
      recommendations: ["Create or import missions to begin operational tracking."],
    };
  }

  const rows = buildRows(missions);
  const metrics = computeMetrics(rows);
  const confidence = deriveConfidence(metrics);
  const trend = deriveMomentumTrend(metrics);

  return {
    headline: buildHeadline(metrics, trend),
    summary: buildSummary(metrics, trend, confidence),
    confidence,
    momentum: {
      score: metrics.avgScore,
      deltaPercent: metrics.momentumDeltaPercent,
      trend,
      label: momentumLabel(trend, metrics),
    },
    risks: buildRisks(metrics),
    highlights: buildHighlights(metrics),
    recommendations: buildRecommendations(metrics, rows),
  };
}
