import type { CommandGroup, CommandItem } from "@/features/command-palette/types";

function matchesQuery(item: CommandItem, query: string): boolean {
  const haystack = [item.label, item.subtitle, ...(item.keywords ?? [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

export function filterCommandGroups(
  groups: CommandGroup[],
  query: string,
): CommandGroup[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return groups;
  }

  return groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => matchesQuery(item, normalized)),
    }))
    .filter((group) => group.items.length > 0);
}

export function flattenCommandGroups(groups: CommandGroup[]): CommandItem[] {
  return groups.flatMap((group) => group.items);
}
