import { formatOperationalRelative } from "@/lib/operational-time";
import type { LocalDraftMeta } from "@/hooks/use-local-draft";
import { cn } from "@/lib/cn";

interface DraftPersistenceHintProps {
  meta: LocalDraftMeta;
  className?: string;
}

export default function DraftPersistenceHint({
  meta,
  className,
}: DraftPersistenceHintProps) {
  if (!meta.updatedAt && !meta.restored) {
    return null;
  }

  let label: string;
  if (meta.restored && meta.updatedAt) {
    label = `Draft restored · ${formatOperationalRelative(new Date(meta.updatedAt))}`;
  } else if (meta.updatedAt) {
    label = `Saved locally · ${formatOperationalRelative(new Date(meta.updatedAt))}`;
  } else {
    label = "Draft restored";
  }

  return (
    <p
      className={cn("text-xs leading-5 text-text-muted", className)}
      aria-live="polite"
    >
      {label}
    </p>
  );
}
