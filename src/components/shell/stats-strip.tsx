import StatCard from "@/components/shell/stat-card";
import type { ShellStat } from "@/types";

interface StatsStripProps {
  stats: ShellStat[];
}

export default function StatsStrip({ stats }: StatsStripProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} stat={stat} />
      ))}
    </div>
  );
}
