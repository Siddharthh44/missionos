"use client";

import Link from "next/link";
import { X } from "lucide-react";
import UserSurface from "@/components/layout/user-surface";
import { NAVIGATION_SECTIONS } from "@/features/shell/navigation";
import type { Profile, UserRole } from "@/types";

interface MobileNavProps {
  effectiveRole: UserRole;
  isRoleOverrideActive: boolean;
  open: boolean;
  profile: Profile;
  onSignOut: () => Promise<void>;
  onClose: () => void;
}

export default function MobileNav({
  effectiveRole,
  isRoleOverrideActive,
  open,
  profile,
  onSignOut,
  onClose,
}: MobileNavProps) {
  if (!open) {
    return null;
  }

  const visibleSections = NAVIGATION_SECTIONS.map((section) => ({
    ...section,
    items: section.items.filter((item) => item.allowedRoles.includes(effectiveRole)),
  })).filter((section) => section.items.length > 0);

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        aria-label="Close navigation"
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        type="button"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 left-0 flex w-[92vw] max-w-sm flex-col gap-6 border-r border-border bg-background p-6 shadow-panel">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="font-display text-xl font-semibold text-text-primary">
              MissionOS
            </p>
            <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
              Navigation
            </p>
          </div>
          <button
            aria-label="Close navigation"
            className="rounded-lg border border-border bg-surface-2 p-2 text-text-secondary"
            type="button"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-6 overflow-y-auto">
          {visibleSections.map((section) => (
            <div key={section.label} className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.22em] text-text-muted">
                {section.label}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors duration-150 hover:bg-surface-2 hover:text-text-primary"
                    href={item.href}
                    onClick={onClose}
                  >
                    <item.icon className="h-[18px] w-[18px]" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <UserSurface
          effectiveRole={effectiveRole}
          isRoleOverrideActive={isRoleOverrideActive}
          profile={profile}
          onSignOut={onSignOut}
        />
      </div>
    </div>
  );
}
