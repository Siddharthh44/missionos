"use client";

import { TrendingDown, TrendingUp, Minus, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";
import { getMissionHealthLabel } from "@/features/missions/mission-health";
import type { MissionHealth, MissionHealthStatus } from "@/types";

interface MissionHealthStripProps {
  health: MissionHealth;
  variant?: "compact" | "inline" | "panel";
  className?: string;
}

const STATUS_STYLES: Record<
  MissionHealthStatus,
  { border: string; bg: string; text: string }
> = {
  healthy: {
    border: "border-status-aligned/25",
    bg: "bg-status-aligned/8",
    text: "text-status-aligned",
  },
  attention: {
    border: "border-accent/25",
    bg: "bg-accent/8",
    text: "text-accent",
  },
  at_risk: {
    border: "border-status-warning/25",
    bg: "bg-status-warning/8",
    text: "text-status-warning",
  },
  critical: {
    border: "border-status-revision/25",
    bg: "bg-status-revision/8",
    text: "text-status-revision",
  },
};

const CONFIDENCE_STYLES = {
  high: "border-status-aligned/20 bg-status-aligned/10 text-status-aligned",
  medium: "border-accent/20 bg-accent/10 text-accent",
  low: "border-status-warning/20 bg-status-warning/10 text-status-warning",
} as const;

function TrendIcon({ trend }: { trend: MissionHealth["trend"] }) {
  if (trend === "up") {
    return <TrendingUp className="h-3 w-3 shrink-0 text-status-aligned" />;
  }
  if (trend === "down") {
    return <TrendingDown className="h-3 w-3 shrink-0 text-status-warning" />;
  }
  return <Minus className="h-3 w-3 shrink-0 text-text-muted" />;
}

function HealthSparkline({
  values,
  trend,
}: {
  values: number[];
  trend: MissionHealth["trend"];
}) {
  const max = Math.max(...values, 1);

  return (
    <div className="flex h-6 items-end gap-0.5" aria-hidden>
      {values.map((value, index) => (
        <span
          key={`spark-${index}`}
          className={cn(
            "w-1 rounded-sm",
            trend === "up"
              ? "bg-status-aligned/70"
              : trend === "down"
                ? "bg-status-warning/70"
                : "bg-text-muted/50",
          )}
          style={{ height: `${Math.max(20, (value / max) * 100)}%` }}
        />
      ))}
    </div>
  );
}

export default function MissionHealthStrip({
  health,
  variant = "compact",
  className,
}: MissionHealthStripProps) {
  const styles = STATUS_STYLES[health.status];
  const isCompact = variant === "compact";
  const showRecommendation = variant === "inline" || variant === "panel";

  return (
    <div
      className={cn(
        "rounded-lg border",
        styles.border,
        styles.bg,
        isCompact ? "px-3 py-2.5" : "px-4 py-3",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Sparkles className={cn("h-3.5 w-3.5 shrink-0", styles.text)} />
        <span
          className={cn(
            "text-[10px] font-medium uppercase tracking-[0.16em]",
            styles.text,
          )}
        >
          {getMissionHealthLabel(health.status)}
        </span>
        <span
          className={cn(
            "rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.14em]",
            CONFIDENCE_STYLES[health.confidence],
          )}
        >
          {health.confidence}
        </span>
        <span className="font-mono text-[11px] text-text-muted">{health.score}</span>
        <div className="ml-auto flex items-center gap-1">
          <TrendIcon trend={health.trend} />
          <HealthSparkline values={health.sparkline} trend={health.trend} />
        </div>
      </div>

      <p
        className={cn(
          "mt-1.5 text-text-secondary",
          isCompact ? "text-xs leading-5 line-clamp-2" : "text-sm leading-6",
        )}
      >
        {health.insight}
      </p>

      {showRecommendation ? (
        <p className="mt-2 text-xs leading-5 text-text-muted">{health.recommendation}</p>
      ) : null}
    </div>
  );
}
