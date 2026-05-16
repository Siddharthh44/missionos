import type { LucideIcon } from "lucide-react";

interface OperationalEmptyStateProps {
  icon: LucideIcon;
  title: string;
  body: string;
}

export default function OperationalEmptyState({
  icon: Icon,
  title,
  body,
}: OperationalEmptyStateProps) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-xl border border-dashed border-border-strong bg-surface-2/60 p-6">
      <div className="rounded-xl border border-border bg-background/60 p-3 text-text-muted">
        <Icon className="h-6 w-6" />
      </div>
      <div className="space-y-2">
        <h3 className="font-display text-xl font-semibold text-text-primary">
          {title}
        </h3>
        <p className="max-w-2xl text-sm leading-6 text-text-secondary">
          {body}
        </p>
      </div>
    </div>
  );
}
