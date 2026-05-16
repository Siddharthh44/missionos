import ShellCard from "@/components/shell/shell-card";
import type { ActivityItem } from "@/types";

interface ActivityFeedProps {
  items: ActivityItem[];
}

export default function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <ShellCard className="space-y-5">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.22em] text-text-muted">
          Activity Feed
        </p>
        <h2 className="font-display text-xl font-semibold text-text-primary">
          Recent movement across the workspace
        </h2>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 rounded-xl border border-border bg-surface-2/70 p-4"
          >
            <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-text-primary">
                {item.title}
              </p>
              <p className="text-sm leading-6 text-text-secondary">
                {item.description}
              </p>
              <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
                {item.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ShellCard>
  );
}
