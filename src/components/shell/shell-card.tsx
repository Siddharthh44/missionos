import type { PropsWithChildren } from "react";
import { cn } from "@/lib/cn";

interface ShellCardProps extends PropsWithChildren {
  className?: string;
}

export default function ShellCard({ children, className }: ShellCardProps) {
  return (
    <section
      className={cn(
        "rounded-xl border border-border bg-surface-1 p-6 shadow-panel transition-all duration-150 hover:-translate-y-0.5 hover:border-border-strong",
        className,
      )}
    >
      {children}
    </section>
  );
}
