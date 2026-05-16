import { cn } from "@/lib/cn";

interface ProgressMeterProps {
  value: number;
}

export default function ProgressMeter({ value }: ProgressMeterProps) {
  return (
    <div className="space-y-2">
      <div className="h-2 rounded-full bg-background/80">
        <div
          className={cn(
            "h-full rounded-full bg-accent transition-[width] duration-200",
            value >= 75 && "bg-status-aligned",
            value < 60 && "bg-status-warning",
          )}
          style={{ width: `${Math.max(6, Math.min(value, 100))}%` }}
        />
      </div>
      <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
        {value}% progress signal
      </p>
    </div>
  );
}
