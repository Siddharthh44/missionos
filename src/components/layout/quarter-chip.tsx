interface QuarterChipProps {
  label: string;
}

export default function QuarterChip({ label }: QuarterChipProps) {
  return (
    <div className="hidden items-center gap-2 rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-text-secondary lg:inline-flex">
      <span className="h-2 w-2 rounded-full bg-status-aligned" />
      <span>{label}</span>
    </div>
  );
}
