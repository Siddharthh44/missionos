"use client";

import { Sparkles, Target } from "lucide-react";
import ActivityFeed from "@/components/dashboard/activity-feed";
import PageHeader from "@/components/layout/page-header";
import OperationalEmptyState from "@/components/shell/operational-empty-state";
import SectionLabel from "@/components/shell/section-label";
import ShellCard from "@/components/shell/shell-card";
import StatsStrip from "@/components/shell/stats-strip";
import { getRoleActivity, getRoleStats } from "@/features/shell/shell-data";
import { ROUTE_META } from "@/features/shell/route-meta";
import { useRoleContext } from "@/hooks/use-role-context";

const ROLE_COPY = {
  employee: {
    emptyBody:
      "Live mission objects, sync progress, and manager interactions will plug into this shell once the business workflow phase begins.",
    emptyTitle: "Mission-ready surfaces are staged for the next phase.",
    insightTitle: "A believable AI destination already has room to land.",
    overviewBody:
      "This first role surface already establishes the density, hierarchy, and momentum posture that future phases will inherit without redesign.",
    overviewTitle: "The Mission Control shell is ready for live operational work.",
  },
  manager: {
    emptyBody:
      "Review queues, at-risk signals, and coaching prompts can attach here without changing the shell or dragging the product into table-heavy behavior.",
    emptyTitle: "Manager-facing surfaces are ready for live oversight workflows.",
    insightTitle:
      "Team-level intelligence can slot in without disturbing the shell rhythm.",
    overviewBody:
      "The same Mission Control canvas now shifts toward team momentum, queue pressure, and review posture without splintering into a second dashboard.",
    overviewTitle: "Manager mode already feels tuned for coaching and triage.",
  },
  admin: {
    emptyBody:
      "Audit visibility, shared mission controls, and organization framing can mount here while preserving the calm layout density.",
    emptyTitle: "Org-level operational surfaces are staged for the next phase.",
    insightTitle:
      "Strategic visibility already has a premium command surface reserved.",
    overviewBody:
      "The shell already supports a broader operational lens for governance, shared mission posture, and organization-wide completion framing.",
    overviewTitle:
      "Admin mode carries the right level of organizational authority.",
  },
} as const;

export default function MissionControlPage() {
  const { effectiveRole } = useRoleContext();
  const currentRole = effectiveRole ?? "employee";
  const copy = ROLE_COPY[currentRole];
  const meta = ROUTE_META["/"];
  const stats = getRoleStats(currentRole);
  const activity = getRoleActivity(currentRole);

  return (
    <div className="space-y-8">
      <PageHeader subtitle={meta.subtitle} title={meta.title} />
      <StatsStrip stats={stats} />

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <ShellCard className="space-y-5">
          <SectionLabel label="Mission Outlook" />
          <div className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-text-primary">
              {copy.overviewTitle}
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-text-secondary">
              {copy.overviewBody}
            </p>
          </div>
          <OperationalEmptyState
            body={copy.emptyBody}
            icon={Target}
            title={copy.emptyTitle}
          />
        </ShellCard>

        <ShellCard className="space-y-5 bg-[radial-gradient(circle_at_top,#1f355f,transparent_55%),#111318]">
          <SectionLabel label="Momentum Intelligence" />
          <div className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-text-primary">
              {copy.insightTitle}
            </h2>
            <p className="text-sm leading-7 text-text-secondary">
              The shell treats insights as part of the product rhythm, not an
              isolated gimmick surface.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-background/55 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-border bg-surface-2 p-2 text-accent">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">
                  Insight architecture reserved
                </p>
                <p className="text-sm text-text-secondary">
                  Summary, score, and signals will mount here in a later phase.
                </p>
              </div>
            </div>
          </div>
        </ShellCard>
      </div>

      <ActivityFeed items={activity} />
    </div>
  );
}
