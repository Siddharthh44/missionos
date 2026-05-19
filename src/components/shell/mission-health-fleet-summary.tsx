"use client";

import { Sparkles } from "lucide-react";
import AnalyticsWidget from "@/components/shell/analytics-widget";
import MissionHealthStrip from "@/components/shell/mission-health-strip";
import SectionLabel from "@/components/shell/section-label";
import OperationalEmptyState from "@/components/shell/operational-empty-state";
import { operationalEmptyPresets } from "@/components/shell/operational-empty-presets";
import ShellCard from "@/components/shell/shell-card";
import { getMissionHealth, getMissionHealthLabel } from "@/features/missions/mission-health";
import type { Mission, MissionHealthStatus } from "@/types";

interface MissionHealthFleetSummaryProps {
  missions: Mission[];
  className?: string;
}

export default function MissionHealthFleetSummary({
  missions,
  className,
}: MissionHealthFleetSummaryProps) {
  if (missions.length === 0) {
    return (
      <ShellCard className={className}>
        <OperationalEmptyState {...operationalEmptyPresets.insightsClear} compact />
      </ShellCard>
    );
  }

  const healthRows = missions.map((mission) => ({
    mission,
    health: getMissionHealth(mission),
  }));

  const statusCounts = healthRows.reduce(
    (acc, { health }) => {
      acc[health.status] = (acc[health.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<MissionHealthStatus, number>,
  );

  const atRiskCount =
    (statusCounts.at_risk ?? 0) +
    (statusCounts.critical ?? 0) +
    (statusCounts.attention ?? 0);

  const healthyCount = statusCounts.healthy ?? 0;
  const avgScore = Math.round(
    healthRows.reduce((sum, row) => sum + row.health.score, 0) /
      Math.max(healthRows.length, 1),
  );

  const topRisk = [...healthRows]
    .sort((a, b) => a.health.score - b.health.score)
    .slice(0, 3);

  return (
    <ShellCard className={className}>
      <div className="space-y-5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-accent" />
          <SectionLabel label="AI Mission Health Layer" />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <AnalyticsWidget
            title="Fleet health score"
            value={`${avgScore}`}
            variant={
              avgScore >= 75 ? "success" : avgScore >= 55 ? "accent" : "warning"
            }
            size="sm"
          />
          <AnalyticsWidget
            title="Healthy missions"
            value={healthyCount}
            change={{
              value: Math.round((healthyCount / missions.length) * 100),
              period: "of fleet",
              trend: healthyCount >= missions.length / 2 ? "up" : "down",
            }}
            variant="success"
            size="sm"
          />
          <AnalyticsWidget
            title="Needs attention"
            value={atRiskCount}
            variant={atRiskCount > 0 ? "warning" : "success"}
            size="sm"
          />
        </div>

        <div className="space-y-3">
          <p className="text-sm text-text-secondary">
            Deterministic operational interpretation across active missions — no
            live model calls.
          </p>
          {topRisk.map(({ mission, health }) => (
            <div key={mission.id} className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.16em] text-text-muted">
                {mission.title} · {getMissionHealthLabel(health.status)}
              </p>
              <MissionHealthStrip health={health} variant="compact" />
            </div>
          ))}
        </div>
      </div>
    </ShellCard>
  );
}
