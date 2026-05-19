export type ToastVariant = "success" | "info" | "warning" | "error";

export interface ToastInput {
  title: string;
  description?: string;
  variant?: ToastVariant;
  durationMs?: number;
}

export interface ToastRecord extends ToastInput {
  id: string;
  variant: ToastVariant;
  durationMs: number;
  createdAt: number;
}

export const TOAST_MAX_VISIBLE = 3;

export const TOAST_DURATION_MS: Record<ToastVariant, number> = {
  success: 3200,
  info: 3400,
  warning: 4000,
  error: 4500,
};
