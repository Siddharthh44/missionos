import { cn } from "@/lib/cn";
import type { OperationalBadge } from "@/types";

interface StatusPillProps {
  badge: OperationalBadge;
}

export default function StatusPill({ badge }: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.18em]",
        {
          "border-border bg-surface-2 text-text-secondary":
            !badge.tone || badge.tone === "default",
          "border-accent/25 bg-accent-soft text-accent":
            badge.tone === "accent",
          "border-status-aligned/20 bg-status-aligned/10 text-status-aligned":
            badge.tone === "success",
          "border-status-warning/20 bg-status-warning/10 text-status-warning":
            badge.tone === "warning",
        },
      )}
    >
      {badge.label}
    </span>
  );
}
