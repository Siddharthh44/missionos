"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react";
import type { ToastRecord, ToastVariant } from "@/features/toast/types";
import { cn } from "@/lib/cn";

interface ToastViewportProps {
  toasts: ToastRecord[];
  onDismiss: (id: string) => void;
}

const VARIANT_STYLES: Record<
  ToastVariant,
  { border: string; bg: string; icon: string; Icon: typeof Info }
> = {
  success: {
    border: "border-status-achieved/25",
    bg: "bg-surface-1/95",
    icon: "text-status-achieved",
    Icon: CheckCircle2,
  },
  info: {
    border: "border-accent/20",
    bg: "bg-surface-1/95",
    icon: "text-accent",
    Icon: Info,
  },
  warning: {
    border: "border-status-warning/25",
    bg: "bg-surface-1/95",
    icon: "text-status-warning",
    Icon: AlertTriangle,
  },
  error: {
    border: "border-status-revision/25",
    bg: "bg-surface-1/95",
    icon: "text-status-revision",
    Icon: XCircle,
  },
};

export default function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  return (
    <motion.div
      aria-live="polite"
      aria-relevant="additions"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[110] flex flex-col items-center gap-2 p-4 sm:items-end sm:p-5"
      role="region"
      aria-label="Notifications"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => {
          const style = VARIANT_STYLES[toast.variant];
          const Icon = style.Icon;

          return (
            <motion.div
              key={toast.id}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="pointer-events-auto w-full max-w-sm"
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              layout
              transition={{ duration: 0.16, ease: "easeOut" }}
            >
              <div
                className={cn(
                  "flex items-start gap-3 rounded-xl border px-3.5 py-3 shadow-panel backdrop-blur-md",
                  style.border,
                  style.bg,
                )}
              >
                <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", style.icon)} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-text-primary">{toast.title}</p>
                  {toast.description ? (
                    <p className="mt-0.5 text-xs leading-5 text-text-secondary">
                      {toast.description}
                    </p>
                  ) : null}
                </div>
                <button
                  aria-label="Dismiss notification"
                  className="shrink-0 rounded-md p-1 text-text-muted transition-colors hover:bg-surface-2 hover:text-text-primary"
                  type="button"
                  onClick={() => onDismiss(toast.id)}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}
