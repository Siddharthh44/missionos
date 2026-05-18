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
      {!collapsed && (
        <p className="px-3 text-[10px] font-medium uppercase tracking-[0.08em] text-[#4B5563]">
          {section.label}
        </p>
      )}
      <div className="space-y-1">
        {section.items.map((item) => (
          <NavItem key={item.href} collapsed={collapsed} item={item} />
        ))}
      </div>
    </div>
  );
}
