"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowUpRight,
  Brain,
  Lightbulb,
  Minus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import SectionLabel from "@/components/shell/section-label";
import ShellCard from "@/components/shell/shell-card";
import { getExecutiveBriefing } from "@/features/briefing/executive-briefing";
import { cn } from "@/lib/cn";
import type { ExecutiveBriefingRisk, Mission, MissionHealthConfidence } from "@/types";

interface ExecutiveBriefingSurfaceProps {
  missions: Mission[];
  className?: string;
  compact?: boolean;
}

const CONFIDENCE_STYLES: Record<
  MissionHealthConfidence,
  { bg: string; text: string; label: string }
> = {
  high: {
    bg: "bg-status-achieved/10",
    text: "text-status-achieved",
    label: "High confidence",
  },
  medium: {
    bg: "bg-accent/10",
    text: "text-accent",
    label: "Medium confidence",
  },
  low: {
    bg: "bg-status-warning/10",
    text: "text-status-warning",
    label: "Low confidence",
  },
};

const RISK_SEVERITY_STYLES: Record<
  ExecutiveBriefingRisk["severity"],
  { border: string; bg: string; text: string }
> = {
  low: {
    border: "border-border",
    bg: "bg-surface-2",
    text: "text-text-secondary",
  },
  medium: {
    border: "border-status-warning/20",
    bg: "bg-status-warning/10",
    text: "text-status-warning",
  },
  high: {
    border: "border-status-revision/25",
    bg: "bg-status-revision/10",
    text: "text-status-revision",
  },
};

const revealVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0 },
};

function MomentumTrendIcon({ trend }: { trend: "up" | "down" | "neutral" }) {
  if (trend === "up") {
    return <TrendingUp className="h-4 w-4 text-status-achieved" />;
  }
  if (trend === "down") {
    return <TrendingDown className="h-4 w-4 text-status-warning" />;
  }
  return <Minus className="h-4 w-4 text-text-muted" />;
}

export default function ExecutiveBriefingSurface({
  missions,
  className,
  compact = false,
}: ExecutiveBriefingSurfaceProps) {
  const briefing = getExecutiveBriefing(missions);
  const confidenceStyle = CONFIDENCE_STYLES[briefing.confidence];
  const deltaPositive = briefing.momentum.deltaPercent > 0;
  const deltaNegative = briefing.momentum.deltaPercent < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <ShellCard
        className={cn(
          "relative overflow-hidden border-border-strong/60 bg-gradient-to-br from-surface-1 via-surface-1 to-surface-2/40",
          className,
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/5 blur-3xl"
        />

        <motion.div
          className="relative space-y-5"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          <motion.div
            className="flex flex-wrap items-start justify-between gap-4"
            variants={revealVariants}
          >
            <motion.div className="space-y-2" variants={revealVariants}>
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-accent" />
                <SectionLabel label="Today's Operational Briefing" />
              </div>
              <h2
                className={cn(
                  "max-w-3xl font-display font-semibold leading-tight text-text-primary",
                  compact ? "text-xl" : "text-2xl",
                )}
              >
                {briefing.headline}
              </h2>
            </motion.div>

            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em]",
                  confidenceStyle.bg,
                  confidenceStyle.text,
                )}
              >
                {confidenceStyle.label}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-text-muted">
                Deterministic intelligence
              </span>
            </div>
          </motion.div>

          <motion.p
            className="max-w-4xl text-sm leading-7 text-text-secondary"
            variants={revealVariants}
          >
            {briefing.summary}
          </motion.p>

          <motion.div
            className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
            variants={revealVariants}
          >
            <motion.div
              className="rounded-lg border border-border bg-background/50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.12, duration: 0.25 }}
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
                Fleet momentum
              </p>
              <motion.div className="mt-2 flex items-end justify-between gap-3">
                <div>
                  <p className="font-mono text-3xl font-semibold text-text-primary">
                    {briefing.momentum.score}
                  </p>
                  <p className="mt-1 text-xs text-text-secondary">
                    {briefing.momentum.label}
                  </p>
                </div>
                <MomentumTrendIcon trend={briefing.momentum.trend} />
              </motion.div>
            </motion.div>

            <motion.div
              className="rounded-lg border border-border bg-background/50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.16, duration: 0.25 }}
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
                Momentum delta
              </p>
              <div className="mt-2 flex items-center gap-2">
                {deltaPositive ? (
                  <TrendingUp className="h-4 w-4 text-status-achieved" />
                ) : deltaNegative ? (
                  <TrendingDown className="h-4 w-4 text-status-warning" />
                ) : (
                  <Minus className="h-4 w-4 text-text-muted" />
                )}
                <p
                  className={cn(
                    "font-mono text-2xl font-semibold",
                    deltaPositive
                      ? "text-status-achieved"
                      : deltaNegative
                        ? "text-status-warning"
                        : "text-text-primary",
                  )}
                >
                  {briefing.momentum.deltaPercent > 0 ? "+" : ""}
                  {briefing.momentum.deltaPercent}%
                </p>
              </div>
              <p className="mt-1 text-xs text-text-muted">Week-over-week</p>
            </motion.div>

            <motion.div
              className={cn(
                "rounded-lg border border-border bg-background/50 p-4",
                compact ? "sm:col-span-2" : "xl:col-span-2",
              )}
              variants={revealVariants}
            >
              <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-text-muted">
                Active risk signals
              </p>
              <motion.div className="flex flex-wrap gap-2">
                {briefing.risks.map((risk) => {
                  const style = RISK_SEVERITY_STYLES[risk.severity];
                  return (
                    <span
                      key={risk.label}
                      className={cn(
                        "inline-flex max-w-full items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] leading-5",
                        style.border,
                        style.bg,
                        style.text,
                      )}
                    >
                      {risk.severity !== "low" ? (
                        <AlertTriangle className="h-3 w-3 shrink-0" />
                      ) : null}
                      {risk.label}
                    </span>
                  );
                })}
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className={cn(
              "grid gap-4",
              compact ? "lg:grid-cols-1" : "lg:grid-cols-[1.1fr_0.9fr]",
            )}
            variants={revealVariants}
          >
            <div className="space-y-3 rounded-lg border border-border bg-surface-2/50 p-4">
              <div className="flex items-center gap-2">
                <ArrowUpRight className="h-4 w-4 text-accent" />
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-text-secondary">
                  Operational highlights
                </p>
              </div>
              <ul className="space-y-2.5">
                {briefing.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-2 text-sm leading-6 text-text-secondary"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <motion.div className="space-y-3 rounded-lg border border-accent/15 bg-accent/5 p-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-accent" />
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-text-secondary">
                  Executive recommendations
                </p>
              </div>
              <ul className="space-y-2.5">
                {briefing.recommendations.map((recommendation) => (
                  <li
                    key={recommendation}
                    className="text-sm leading-6 text-text-secondary"
                  >
                    {recommendation}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>
      </ShellCard>
    </motion.div>
  );
}
