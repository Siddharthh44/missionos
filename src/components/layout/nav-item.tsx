"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavigationItemDefinition } from "@/types";
import { cn } from "@/lib/cn";

interface NavItemProps {
  item: NavigationItemDefinition;
  collapsed?: boolean;
}

export default function NavItem({ item, collapsed = false }: NavItemProps) {
  const pathname = usePathname();
  const isActive =
    pathname === item.href ||
    (item.href !== "/" && pathname.startsWith(item.href));
  const Icon = item.icon;

  return (
    <Link
      className={cn(
        "flex items-center gap-3 rounded-lg border border-transparent px-3 py-2 text-sm transition-all duration-150",
        isActive
          ? "border-accent/30 bg-accent-soft text-accent"
          : "text-text-secondary hover:bg-surface-2 hover:text-text-primary",
        collapsed && "justify-center px-2",
      )}
      href={item.href}
      title={collapsed ? item.label : undefined}
    >
      <Icon className="h-[18px] w-[18px] shrink-0" />
      {!collapsed ? <span>{item.label}</span> : null}
    </Link>
  );
}
