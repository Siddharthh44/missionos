"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { motion } from "framer-motion";
import ActivityFeed from "@/components/dashboard/activity-feed";
import StatsStrip from "@/components/shell/stats-strip";
import {
  HeroSurface,
  SurfaceBlockCard,
} from "@/components/shell/operational-route-page";
import ShellCard from "@/components/shell/shell-card";
import SectionLabel from "@/components/shell/section-label";
import MissionHealthStrip from "@/components/shell/mission-health-strip";
import { getMissionHealth } from "@/features/missions/mission-health";
import { cn } from "@/lib/cn";
import type { Mission, OperationalRouteSurface } from "@/types";

interface MissionInlineDetailSurfaceProps {
  mission: Mission;
  onClose: () => void;
  surface: OperationalRouteSurface;
}

export default function MissionInlineDetailSurface({
  mission,
  onClose,
  surface,
}: MissionInlineDetailSurfaceProps) {
  const health = getMissionHealth(mission);
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="col-span-full rounded-2xl border border-border-strong bg-surface-1 p-4 sm:p-6"
    >
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
        <div className="min-w-0 space-y-1">
          <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
            Operational detail
          </p>
          <h3 className="font-display text-xl font-semibold text-text-primary">
            {mission.title}
          </h3>
          <p className="text-sm text-text-secondary">
            {surface.hero.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/missions/${mission.id}`}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-text-secondary transition-colors hover:text-text-primary"
          >
            Open record
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close mission detail"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-2 text-text-secondary transition-colors hover:text-text-primary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-5">
        <MissionHealthStrip health={health} variant="panel" />
        <StatsStrip stats={surface.stats} />
        <HeroSurface compact surface={surface} />

        <div className="grid gap-4 lg:grid-cols-2">
          <SurfaceBlockCard block={surface.primary} compact />
          <SurfaceBlockCard block={surface.secondary} compact />
        </div>

        <ActivityFeed items={surface.activity ?? []} />

        <div
          className={cn("grid gap-4", {
            "md:grid-cols-2": surface.support.length <= 2,
          })}
        >
          {surface.support.map((panel) => (
            <ShellCard key={panel.title} className="space-y-4">
              <div className="space-y-2">
                <SectionLabel label={panel.label} />
                <h4 className="font-display text-lg font-semibold text-text-primary">
                  {panel.title}
                </h4>
                <p className="text-sm leading-6 text-text-secondary">{panel.body}</p>
              </div>
              <div className="space-y-2">
                {panel.highlights.map((entry) => (
                  <div
                    key={entry}
                    className="rounded-lg border border-border bg-surface-2/75 px-3 py-2.5 text-sm leading-6 text-text-secondary"
                  >
                    {entry}
                  </div>
                ))}
              </div>
            </ShellCard>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
