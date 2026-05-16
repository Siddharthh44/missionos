"use client";

import { Menu } from "lucide-react";
import QuarterChip from "@/components/layout/quarter-chip";
import RoleSwitcher from "@/components/layout/role-switcher";
import { resolveRouteMeta } from "@/features/shell/route-meta";
import type { Profile, UserRole } from "@/types";
import { usePathname } from "next/navigation";

interface TopbarProps {
  currentRole: UserRole;
  profile: Profile;
  quarterLabel: string;
  onOpenMobileNav: () => void;
}

export default function Topbar({
  currentRole,
  profile,
  quarterLabel,
  onOpenMobileNav,
}: TopbarProps) {
  const pathname = usePathname();
  const meta = resolveRouteMeta(pathname);

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
          <div className="min-w-0">
            <p className="truncate font-display text-lg font-semibold text-text-primary">
              {meta.title}
            </p>
            <p className="hidden truncate text-sm text-text-secondary sm:block">
              {meta.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <QuarterChip label={quarterLabel} />
          <div className="hidden xl:block">
            <RoleSwitcher currentRole={currentRole} disabled />
          </div>
          <div className="hidden rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-text-muted md:block">
            {profile.department}
          </div>
        </div>
      </div>
    </header>
  );
}
