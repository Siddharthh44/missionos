"use client";

import { Menu } from "lucide-react";
import QuarterChip from "@/components/layout/quarter-chip";
import RoleSwitcher from "@/components/layout/role-switcher";
import type { UserRole } from "@/types";

interface TopbarProps {
  currentRole: UserRole;
  isRoleOverrideActive: boolean;
  onRoleChange: (role: UserRole) => Promise<void>;
  onSignOut: () => Promise<void>;
  quarterLabel: string;
  onOpenMobileNav: () => void;
}

export default function Topbar({
  currentRole,
  isRoleOverrideActive,
  quarterLabel,
  onRoleChange,
  onSignOut,
  onOpenMobileNav,
}: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-sm">
      <div className="shell-container flex h-16 items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <button
            aria-label="Open navigation"
            className="rounded-lg border border-border bg-surface-2 p-2 text-text-secondary lg:hidden"
            type="button"
            onClick={onOpenMobileNav}
          >
            <Menu className="h-4 w-4" />
          </button>

          {/* Quarter Window moved to left side */}
          <div className="hidden lg:block">
            <QuarterChip label={quarterLabel} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden xl:block">
            <RoleSwitcher
              currentRole={currentRole}
              onChange={(role) => void onRoleChange(role)}
            />
          </div>

          {isRoleOverrideActive ? (
            <div className="hidden rounded-full border border-accent/25 bg-accent-soft px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-accent lg:block">
              Demo view: {currentRole}
            </div>
          ) : null}

          <button
            className="hidden rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-text-secondary transition-colors duration-150 hover:text-text-primary lg:block"
            type="button"
            onClick={() => void onSignOut()}
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}