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
        "flex items-center rounded-md transition-all duration-150",
        collapsed ? "justify-center px-0 py-2" : "gap-2.5 px-3 py-[7px]",
        isActive
          ? "bg-white/[0.08] text-[#F5F0EB]"
          : "text-[#9CA3AF] hover:bg-white/[0.05] hover:text-white/75",
      )}
      href={item.href}
      title={collapsed ? item.label : undefined}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {!collapsed && (
        <span className="text-[13px] font-normal transition-opacity duration-150">
          {item.label}
        </span>
      )}
    </Link>
  );
}
