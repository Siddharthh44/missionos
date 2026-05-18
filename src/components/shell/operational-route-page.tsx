"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import PageHeader from "@/components/layout/page-header";
import ActivityFeed from "@/components/dashboard/activity-feed";
import ProgressMeter from "@/components/shell/progress-meter";
import SectionLabel from "@/components/shell/section-label";
import ShellCard from "@/components/shell/shell-card";
import StatsStrip from "@/components/shell/stats-strip";
import StatusPill from "@/components/shell/status-pill";
import { getOperationalSurface } from "@/features/shell/shell-data";
import { ROUTE_META } from "@/features/shell/route-meta";
import { useRoleContext } from "@/hooks/use-role-context";
import { cn } from "@/lib/cn";
import type {
  OperationalRouteSurface,
  OperationalSurfaceBlock,
  OperationalSurfaceItem,
} from "@/types";

interface OperationalRoutePageProps {
  path: keyof typeof ROUTE_META | "/missions/[id]";
  missionId?: string;
}

const HEADER_ACTIONS: Partial<
  Record<
    keyof typeof ROUTE_META | "/missions/[id]",
    { href: string; label: string; tone?: "primary" | "secondary" }
  >
> = {
  "/": { href: "/missions/new", label: "Create Mission", tone: "primary" },
  "/missions": { href: "/missions/new", label: "Create Mission", tone: "primary" },
  "/missions/new": { href: "/missions", label: "Back to Board", tone: "secondary" },
  "/missions/[id]": { href: "/missions", label: "Back to Board", tone: "secondary" },
  "/admin": { href: "/admin/audit", label: "View Audit", tone: "secondary" },
  "/admin/shared-missions": {
    href: "/admin",
    label: "Admin Overview",
    tone: "secondary",
  },
};

function HeaderAction({
  href,
  label,
  tone = "primary",
}: {
  href: string;
  label: string;
  tone?: "primary" | "secondary";
}) {
  return (
    <Link
      className={cn(
        "inline-flex min-h-10 items-center justify-center rounded-full border px-4 text-xs uppercase tracking-[0.18em] transition-colors duration-150",
        tone === "primary"
          ? "border-accent/20 bg-accent text-white hover:bg-accent-hover"
          : "border-border bg-surface-2 text-text-secondary hover:text-text-primary",
      )}
      href={href}
    >
      {label}
    </Link>
  );
}

function ItemCard({
  item,
  layout = "stack",
}: {
  item: OperationalSurfaceItem;
  layout?: OperationalSurfaceBlock["layout"];
}) {
  const content = (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg font-semibold text-text-primary">
              {item.title}
            </h3>
            {item.href ? (
              <ChevronRight className="h-4 w-4 text-text-muted transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-text-secondary" />
            ) : null}
          </div>
          <p className="max-w-3xl text-sm leading-6 text-text-secondary">
            {item.description}
          </p>
        </div>
        {item.badges?.length ? (
          <div className="flex flex-wrap gap-2">
            {item.badges.map((badge) => (
              <StatusPill key={`${item.id}-${badge.label}`} badge={badge} />
            ))}
          </div>
        ) : null}
      </div>

      {item.detail ? (
        <p className="rounded-lg border border-border bg-background/70 px-3 py-2 text-sm leading-6 text-text-secondary">
          {item.detail}
        </p>
      ) : null}

      {item.progress !== undefined ? <ProgressMeter value={item.progress} /> : null}

      {item.meta?.length ? (
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-text-muted">
          {item.meta.map((entry) => (
            <span key={`${item.id}-${entry}`}>{entry}</span>
          ))}
        </div>
      ) : null}
    </div>
  );

  const className = cn(
    "group rounded-xl border border-border bg-surface-2/80 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lg",
    item.href && "block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
    layout === "timeline" && "border-l-2 border-l-accent/50",
  );

  if (item.href) {
    return (
      <Link className={className} href={item.href}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}

function SurfaceBlockCard({ block }: { block: OperationalSurfaceBlock }) {
  return (
    <ShellCard className="space-y-5">
      <div className="space-y-3">
        <SectionLabel label={block.label} />
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-semibold text-text-primary">
            {block.title}
          </h2>
          <p className="text-sm leading-7 text-text-secondary">
            {block.description}
          </p>
        </div>
      </div>

      <div
        className={cn("grid gap-4", {
          "sm:grid-cols-2": block.layout === "grid",
          "grid-cols-1": block.layout !== "grid",
        })}
      >
        {block.items.map((entry) => (
          <ItemCard key={entry.id} item={entry} layout={block.layout} />
        ))}
      </div>
    </ShellCard>
  );
}

function HeroSurface({ surface }: { surface: OperationalRouteSurface }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.18fr_0.82fr]">
      <ShellCard className="space-y-6">
        <div className="space-y-3">
          <SectionLabel label={surface.hero.label} />
          <div className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-text-primary">
              {surface.hero.title}
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-text-secondary">
              {surface.hero.description}
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {surface.hero.highlights.map((highlight) => (
            <div
              key={highlight.label}
              className="rounded-xl border border-border bg-surface-2/80 p-4 transition-all duration-200 hover:border-border-strong hover:shadow-md hover:-translate-y-0.5"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
                {highlight.label}
              </p>
              <p className="mt-3 font-mono text-2xl font-semibold text-text-primary">
                {highlight.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                {highlight.detail}
              </p>
            </div>
          ))}
        </div>
      </ShellCard>

      <ShellCard className="space-y-5 bg-[radial-gradient(circle_at_top,#223a63,transparent_56%),#111318]">
        <SectionLabel label="Operational Note" />
        <div className="space-y-3">
          <h3 className="font-display text-xl font-semibold text-text-primary">
            {surface.hero.noteTitle}
          </h3>
          <p className="text-sm leading-7 text-text-secondary">
            {surface.hero.noteBody}
          </p>
        </div>
        <div className="space-y-2">
          {surface.hero.noteHighlights.map((entry) => (
            <div
              key={entry}
              className="rounded-xl border border-border/70 bg-surface-2/40 px-4 py-4 text-sm leading-7 text-text-secondary transition-colors duration-200 hover:border-border hover:bg-surface-2/65"
            >
              {entry}
            </div>
          ))}
        </div>
      </ShellCard>
    </div>
  );
}

export default function OperationalRoutePage({
  path,
  missionId,
}: OperationalRoutePageProps) {
  const { effectiveRole } = useRoleContext();
  const role = effectiveRole ?? "employee";
  const surface = getOperationalSurface(path, role, missionId);
  const meta = ROUTE_META[path];
  const action = HEADER_ACTIONS[path];

  return (
    <div className="space-y-8">
      <PageHeader
        subtitle={meta.subtitle}
        title={meta.title}
        trailing={
          action ? (
            <HeaderAction
              href={action.href}
              label={action.label}
              tone={action.tone}
            />
          ) : undefined
        }
      />

      <StatsStrip stats={surface.stats} />
      <HeroSurface surface={surface} />

      <div className="grid gap-4 xl:grid-cols-[1.12fr_0.88fr]">
        <SurfaceBlockCard block={surface.primary} />
        <SurfaceBlockCard block={surface.secondary} />
      </div>

      {surface.activity?.length ? <ActivityFeed items={surface.activity} /> : null}

      <div
        className={cn("grid gap-4", {
          "xl:grid-cols-2": surface.support.length <= 2,
          "xl:grid-cols-3": surface.support.length >= 3,
        })}
      >
        {surface.support.map((panel) => (
          <ShellCard key={panel.title} className="space-y-5">
            <div className="space-y-3">
              <SectionLabel label={panel.label} />
              <div className="space-y-2">
                <h2 className="font-display text-xl font-semibold text-text-primary">
                  {panel.title}
                </h2>
                <p className="text-sm leading-7 text-text-secondary">
                  {panel.body}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {panel.highlights.map((entry) => (
                <div
                  key={entry}
                  className="rounded-lg border border-border bg-surface-2/75 px-4 py-3 text-sm leading-6 text-text-secondary"
                >
                  {entry}
                </div>
              ))}
            </div>
          </ShellCard>
        ))}
      </div>

      {path === "/missions/[id]" ? (
        <div className="flex justify-start">
          <Link
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-4 py-2 text-xs uppercase tracking-[0.18em] text-text-secondary transition-colors duration-150 hover:text-text-primary"
            href="/missions"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Mission Board
          </Link>
        </div>
      ) : null}

      {path === "/" ? (
        <div className="flex justify-end">
          <Link
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-4 py-2 text-xs uppercase tracking-[0.18em] text-text-secondary transition-colors duration-150 hover:text-text-primary"
            href="/insights"
          >
            Open Momentum Insights
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
