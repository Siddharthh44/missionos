"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import NavSection from "@/components/layout/nav-section";
import UserSurface from "@/components/layout/user-surface";
import { NAVIGATION_SECTIONS } from "@/features/shell/navigation";
import type { Profile, UserRole } from "@/types";
import { cn } from "@/lib/cn";

interface SidebarProps {
  collapsed: boolean;
  effectiveRole: UserRole;
  isRoleOverrideActive: boolean;
  profile: Profile;
  onSignOut: () => Promise<void>;
  onToggle: () => void;
}

export default function Sidebar({
  collapsed,
  effectiveRole,
  isRoleOverrideActive,
  profile,
  onSignOut,
  onToggle,
}: SidebarProps) {
  const visibleSections = NAVIGATION_SECTIONS.map((section) => ({
    ...section,
    items: section.items.filter((item) => item.allowedRoles.includes(effectiveRole)),
  })).filter((section) => section.items.length > 0);

  return (
    <aside
      className={cn(
        "hidden h-screen shrink-0 flex-col border-r border-border bg-surface-1/95 px-4 py-5 transition-all duration-300 ease-in-out lg:flex",
        collapsed ? "w-20" : "w-64",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        {!collapsed ? (
          <div className="space-y-1">
            <p className="font-display text-xl font-semibold text-text-primary">
              MissionOS
            </p>
            <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
              Operational shell
            </p>
          </div>
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-2 font-display text-lg font-semibold text-text-primary">
            M
          </div>
        )}

        <button
          className="rounded-lg border border-border bg-surface-2 p-2 text-text-secondary transition-colors duration-150 hover:text-text-primary"
          type="button"
          onClick={onToggle}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="mt-8 flex-1 space-y-6 overflow-y-auto">
        {visibleSections.map((section) => (
          <NavSection
            key={section.label}
            collapsed={collapsed}
            section={section}
          />
        ))}
      </div>

      <div className="mt-6">
        <UserSurface
          collapsed={collapsed}
          effectiveRole={effectiveRole}
          isRoleOverrideActive={isRoleOverrideActive}
          profile={profile}
          onSignOut={onSignOut}
        />
      </div>
    </aside>
  );
}
