"use client";

import type { UserRole } from "@/types";
import { cn } from "@/lib/cn";

interface RoleSwitcherProps {
  currentRole: UserRole;
  disabled?: boolean;
  onChange?: (role: UserRole) => void;
}

const ROLE_OPTIONS: UserRole[] = ["employee", "manager", "admin"];

export default function RoleSwitcher({
  currentRole,
  disabled = false,
  onChange,
}: RoleSwitcherProps) {
  return (
    <div className="inline-flex rounded-full border border-border bg-surface-2 p-1">
      {ROLE_OPTIONS.map((role) => (
        <button
          key={role}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.18em] transition-colors duration-150",
            role === currentRole
              ? "bg-accent text-white"
              : "text-text-secondary hover:text-text-primary",
            disabled && "cursor-default opacity-80",
          )}
          disabled={disabled}
          type="button"
          onClick={() => onChange?.(role)}
        >
          {role}
        </button>
      ))}
    </div>
  );
}
