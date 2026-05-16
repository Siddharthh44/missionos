"use client";

import { useState, type PropsWithChildren } from "react";
import MobileNav from "@/components/layout/mobile-nav";
import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/topbar";
import { getPreviewProfile, getQuarterLabel } from "@/data/shell-selectors";
import type { UserRole } from "@/types";

export default function AppShell({ children }: PropsWithChildren) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentRole: UserRole = "employee";
  const profile = getPreviewProfile(currentRole);
  const quarterLabel = getQuarterLabel();

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <div className="flex min-h-screen">
        <Sidebar
          collapsed={collapsed}
          profile={profile}
          onToggle={() => setCollapsed((value) => !value)}
        />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <Topbar
            currentRole={currentRole}
            onOpenMobileNav={() => setMobileOpen(true)}
            profile={profile}
            quarterLabel={quarterLabel}
          />
          <main className="shell-container flex-1 py-8">{children}</main>
        </div>
      </div>
      <MobileNav
        open={mobileOpen}
        profile={profile}
        onClose={() => setMobileOpen(false)}
      />
    </div>
  );
}
