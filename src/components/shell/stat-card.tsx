import type { ShellStat } from "@/types";
import { cn } from "@/lib/cn";
import ShellCard from "@/components/shell/shell-card";

interface StatCardProps {
  stat: ShellStat;
}

export default function StatCard({ stat }: StatCardProps) {
  return (
    <ShellCard className="flex min-h-32 flex-col justify-between gap-4 bg-surface-1/95">
      <p className="text-xs uppercase tracking-[0.22em] text-text-muted">
        {stat.label}
      </p>
      <div className="space-y-2">
        <span
          className={cn("block font-mono text-3xl font-semibold text-text-primary", {
            "text-accent": stat.tone === "accent",
            "text-status-aligned": stat.tone === "success",
            "text-status-warning": stat.tone === "warning",
          })}
        >
          {stat.value}
        </span>
        {stat.detail ? (
          <p className="text-sm leading-6 text-text-secondary">{stat.detail}</p>
        ) : null}
      </div>
    </ShellCard>
  );
}
