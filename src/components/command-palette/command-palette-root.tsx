"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import CommandPalette from "@/components/command-palette/command-palette";
import { buildCommandGroups } from "@/features/command-palette/build-commands";
import { flattenCommandGroups, filterCommandGroups } from "@/features/command-palette/filter-commands";
import type { CommandItem } from "@/features/command-palette/types";
import { useRoleContext } from "@/hooks/use-role-context";
import { useToast } from "@/hooks/use-toast";
import type { UserRole } from "@/types";

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

interface CommandPaletteRootProps {
  role: UserRole;
  onOpenChange?: (open: boolean) => void;
}

export default function CommandPaletteRoot({
  role,
  onOpenChange,
}: CommandPaletteRootProps) {
  const router = useRouter();
  const { setRole, isSubmitting } = useRoleContext();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const groups = useMemo(() => buildCommandGroups(role), [role]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
    onOpenChange?.(false);
  }, [onOpenChange]);

  const openPalette = useCallback(() => {
    setOpen(true);
    setQuery("");
    setActiveIndex(0);
    onOpenChange?.(true);
  }, [onOpenChange]);

  const execute = useCallback(
    async (item: CommandItem) => {
      if (item.disabled || isSubmitting) {
        return;
      }

      close();

      if (item.action.type === "navigate") {
        if (item.group === "actions" || item.group === "insights") {
          toast.info(item.label, "Opening operational workspace.");
        }
        router.push(item.action.href);
        return;
      }

      if (item.action.type === "role") {
        await setRole(item.action.role);
      }
    },
    [close, isSubmitting, router, setRole, toast],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const modifier = event.metaKey || event.ctrlKey;

      if (modifier && event.key.toLowerCase() === "k") {
        if (!open && isTypingTarget(event.target)) {
          return;
        }

        event.preventDefault();
        if (open) {
          close();
        } else {
          openPalette();
        }
        return;
      }

      if (!open) {
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close, open, openPalette]);

  useEffect(() => {
    const onOpenRequest = () => {
      if (!isTypingTarget(document.activeElement)) {
        openPalette();
      }
    };

    window.addEventListener("missionos:open-command-palette", onOpenRequest);
    return () =>
      window.removeEventListener("missionos:open-command-palette", onOpenRequest);
  }, [openPalette]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const flatCount = flattenCommandGroups(filterCommandGroups(groups, query)).length;

  return (
    <CommandPalette
      activeIndex={Math.min(activeIndex, Math.max(flatCount - 1, 0))}
      groups={groups}
      open={open}
      query={query}
      onActiveIndexChange={setActiveIndex}
      onClose={close}
      onQueryChange={setQuery}
      onSelect={(item) => void execute(item)}
    />
  );
}

export function openCommandPalette() {
  window.dispatchEvent(new Event("missionos:open-command-palette"));
}
