interface SectionLabelProps {
  label: string;
}

export default function SectionLabel({ label }: SectionLabelProps) {
  return (
    <p className="text-xs uppercase tracking-[0.22em] text-text-muted">
      {label}
    </p>
  );
}
