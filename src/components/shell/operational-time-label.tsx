import {
  formatOperationalDeadline,
  formatOperationalRelative,
} from "@/lib/operational-time";
import { cn } from "@/lib/cn";

interface OperationalTimeLabelProps {
  value: string | Date | null | undefined;
  mode?: "relative" | "deadline";
  className?: string;
  prefix?: string;
}

export default function OperationalTimeLabel({
  value,
  mode = "relative",
  className,
  prefix,
}: OperationalTimeLabelProps) {
  const formatted =
    mode === "deadline"
      ? formatOperationalDeadline(value)
      : formatOperationalRelative(value);

  return (
    <span
      className={cn("text-xs uppercase tracking-[0.18em] text-text-muted", className)}
      suppressHydrationWarning
    >
      {prefix ? `${prefix} ${formatted}` : formatted}
    </span>
  );
}
