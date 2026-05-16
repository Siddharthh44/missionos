import NavItem from "@/components/layout/nav-item";
import type { NavigationSectionDefinition } from "@/types";

interface NavSectionProps {
  section: NavigationSectionDefinition;
  collapsed?: boolean;
}

export default function NavSection({
  section,
  collapsed = false,
}: NavSectionProps) {
  return (
    <div className="space-y-2">
      {!collapsed ? (
        <p className="px-3 text-[11px] uppercase tracking-[0.22em] text-text-muted">
          {section.label}
        </p>
      ) : null}
      <div className="space-y-1">
        {section.items.map((item) => (
          <NavItem key={item.href} collapsed={collapsed} item={item} />
        ))}
      </div>
    </div>
  );
}
