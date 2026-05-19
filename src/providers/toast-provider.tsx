"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import ToastViewport from "@/components/toast/toast-viewport";
import {
  TOAST_DURATION_MS,
  TOAST_MAX_VISIBLE,
  type ToastInput,
  type ToastRecord,
  type ToastVariant,
} from "@/features/toast/types";

interface ToastContextValue {
  toast: (input: ToastInput) => string;
  dismiss: (id: string) => void;
  success: (title: string, description?: string) => string;
  info: (title: string, description?: string) => string;
  warning: (title: string, description?: string) => string;
  error: (title: string, description?: string) => string;
}

const ToastContext = createContext<ToastContextValue | null>(null);

function createToastRecord(input: ToastInput): ToastRecord {
  const variant = input.variant ?? "info";
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: input.title,
    description: input.description,
    variant,
    durationMs: input.durationMs ?? TOAST_DURATION_MS[variant],
    createdAt: Date.now(),
  };
}

export default function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }

    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(
    (input: ToastInput) => {
      const record = createToastRecord(input);

      setToasts((current) => {
        const next = [...current, record];
        if (next.length <= TOAST_MAX_VISIBLE) {
          return next;
        }
        const overflow = next.length - TOAST_MAX_VISIBLE;
        const removed = next.slice(0, overflow);
        for (const removedToast of removed) {
          const timer = timersRef.current.get(removedToast.id);
          if (timer) {
            clearTimeout(timer);
            timersRef.current.delete(removedToast.id);
          }
        }
        return next.slice(overflow);
      });

      const timer = setTimeout(() => dismiss(record.id), record.durationMs);
      timersRef.current.set(record.id, timer);

      return record.id;
    },
    [dismiss],
  );

  const variantToast = useCallback(
    (variant: ToastVariant, title: string, description?: string) =>
      toast({ variant, title, description }),
    [toast],
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      toast,
      dismiss,
      success: (title, description) => variantToast("success", title, description),
      info: (title, description) => variantToast("info", title, description),
      warning: (title, description) => variantToast("warning", title, description),
      error: (title, description) => variantToast("error", title, description),
    }),
    [dismiss, toast, variantToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider.");
  }

  return context;
}
