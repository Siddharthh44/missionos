import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  trailing?: ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  trailing,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-border pb-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-2">
        <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary">
          {title}
        </h1>
        <p className="max-w-3xl text-sm leading-6 text-text-secondary">
          {subtitle}
        </p>
      </div>

      {trailing ? <div className="shrink-0">{trailing}</div> : null}
    </div>
  );
}
