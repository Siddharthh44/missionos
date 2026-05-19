"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import SectionLabel from "@/components/shell/section-label";
import ShellCard from "@/components/shell/shell-card";
import { cn } from "@/lib/cn";

export interface OperationalEmptyAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface OperationalEmptyStateProps {
  icon: LucideIcon;
  title: string;
  body: string;
  guidance?: string;
  label?: string;
  action?: OperationalEmptyAction;
  compact?: boolean;
  inline?: boolean;
  className?: string;
}

function EmptyAction({ action }: { action: OperationalEmptyAction }) {
  const className =
    "inline-flex items-center rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover";

  if (action.href) {
    return (
      <Link href={action.href} className={className}>
        {action.label}
      </Link>
    );
  }

  return (
    <button type="button" onClick={action.onClick} className={className}>
      {action.label}
    </button>
  );
}

export default function OperationalEmptyState({
  icon: Icon,
  title,
  body,
  guidance,
  label,
  action,
  compact = false,
  inline = false,
  className,
}: OperationalEmptyStateProps) {
  const content = (
    <div
      className={cn(
        inline
          ? "flex items-start gap-3 px-3 py-6"
          : compact
            ? "flex flex-col gap-3 p-4"
            : "flex flex-col items-start gap-4 p-6",
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className={cn(
          "shrink-0 rounded-lg border border-border bg-surface-2/80 text-text-muted",
          inline ? "p-2" : compact ? "p-2.5" : "p-3",
        )}
      >
        <Icon className={cn(inline ? "h-4 w-4" : compact ? "h-5 w-5" : "h-5 w-5")} />
      </motion.div>

      <div className={cn("min-w-0 space-y-2", inline && "flex-1")}>
        {label ? <SectionLabel label={label} /> : null}
        <h3
          className={cn(
            "font-display font-semibold text-text-primary",
            inline ? "text-sm" : compact ? "text-base" : "text-lg",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "text-text-secondary",
            inline ? "text-sm leading-5" : "text-sm leading-6",
          )}
        >
          {body}
        </p>
        {guidance ? (
          <p className="text-xs leading-5 text-text-muted">{guidance}</p>
        ) : null}
        {action ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.18, delay: 0.04, ease: "easeOut" }}
            className={cn(!inline && "pt-1")}
          >
            <EmptyAction action={action} />
          </motion.div>
        ) : null}
      </div>
    </div>
  );

  if (inline) {
    return content;
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface-1/80",
        !compact && "border-dashed border-border-strong bg-surface-2/40",
        className,
      )}
    >
      {content}
    </div>
  );
}

interface OperationalEmptyPanelProps extends OperationalEmptyStateProps {
  shell?: boolean;
}

export function OperationalEmptyPanel({
  shell = true,
  ...props
}: OperationalEmptyPanelProps) {
  const state = <OperationalEmptyState {...props} compact />;

  if (!shell) {
    return state;
  }

  return <ShellCard className="overflow-hidden p-0">{state}</ShellCard>;
}
