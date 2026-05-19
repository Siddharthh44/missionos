"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useEffect, useId, useRef } from "react";
import {
  flattenCommandGroups,
  filterCommandGroups,
} from "@/features/command-palette/filter-commands";
import type { CommandGroup, CommandItem } from "@/features/command-palette/types";
import OperationalEmptyState from "@/components/shell/operational-empty-state";
import { operationalEmptyPresets } from "@/components/shell/operational-empty-presets";
import { cn } from "@/lib/cn";

interface CommandPaletteProps {
  open: boolean;
  query: string;
  groups: CommandGroup[];
  activeIndex: number;
  onQueryChange: (value: string) => void;
  onActiveIndexChange: (index: number) => void;
  onSelect: (item: CommandItem) => void;
  onClose: () => void;
}

export default function CommandPalette({
  open,
  query,
  groups,
  activeIndex,
  onQueryChange,
  onActiveIndexChange,
  onSelect,
  onClose,
}: CommandPaletteProps) {
  const titleId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const filteredGroups = filterCommandGroups(groups, query);
  const flatItems = flattenCommandGroups(filteredGroups);

  useEffect(() => {
    if (!open) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });

    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (activeIndex >= flatItems.length) {
      onActiveIndexChange(Math.max(flatItems.length - 1, 0));
    }
  }, [activeIndex, flatItems.length, onActiveIndexChange]);

  useEffect(() => {
    if (!open || !listRef.current) {
      return;
    }

    const active = listRef.current.querySelector<HTMLElement>(
      `[data-command-index="${activeIndex}"]`,
    );
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  let runningIndex = -1;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh] sm:px-6"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          role="presentation"
          transition={{ duration: 0.14, ease: "easeOut" }}
        >
          <button
            aria-label="Close command palette"
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            type="button"
            onClick={onClose}
          />

          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            aria-labelledby={titleId}
            aria-modal="true"
            className="relative z-[101] w-full max-w-xl overflow-hidden rounded-xl border border-border-strong/80 bg-surface-1 shadow-2xl"
            exit={{ opacity: 0, scale: 0.98 }}
            initial={{ opacity: 0, scale: 0.98 }}
            role="dialog"
            transition={{ duration: 0.14, ease: "easeOut" }}
          >
            <div className="border-b border-border px-3 py-2.5">
              <label className="sr-only" htmlFor="command-palette-input">
                Search commands
              </label>
              <motion.div className="flex items-center gap-2.5">
                <Search className="h-4 w-4 shrink-0 text-text-muted" />
                <input
                  ref={inputRef}
                  autoComplete="off"
                  autoCorrect="off"
                  className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
                  id="command-palette-input"
                  placeholder="Search missions, routes, actions…"
                  spellCheck={false}
                  type="text"
                  value={query}
                  onChange={(event) => onQueryChange(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      onActiveIndexChange(
                        Math.min(activeIndex + 1, Math.max(flatItems.length - 1, 0)),
                      );
                    }
                    if (event.key === "ArrowUp") {
                      event.preventDefault();
                      onActiveIndexChange(Math.max(activeIndex - 1, 0));
                    }
                    if (event.key === "Enter" && flatItems[activeIndex]) {
                      event.preventDefault();
                      onSelect(flatItems[activeIndex]);
                    }
                    if (event.key === "Escape") {
                      event.preventDefault();
                      onClose();
                    }
                  }}
                />
                <kbd className="hidden rounded border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-text-muted sm:inline">
                  esc
                </kbd>
              </motion.div>
              <p className="sr-only" id={titleId}>
                Command palette
              </p>
            </div>

            <div
              ref={listRef}
              className="max-h-[min(52vh,420px)] overflow-y-auto px-1 py-2"
            >
              {flatItems.length === 0 ? (
                <OperationalEmptyState
                  {...operationalEmptyPresets.commandNoMatch}
                  inline
                />
              ) : (
                filteredGroups.map((group) => (
                  <motion.div key={group.id} className="px-1 py-1">
                    <p className="px-2 py-1.5 text-[10px] uppercase tracking-[0.2em] text-text-muted">
                      {group.label}
                    </p>
                    <ul className="space-y-0.5">
                      {group.items.map((item) => {
                        runningIndex += 1;
                        const index = runningIndex;
                        const Icon = item.icon;
                        const isActive = index === activeIndex;

                        return (
                          <li key={item.id}>
                            <button
                              className={cn(
                                "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors duration-100",
                                isActive
                                  ? "bg-accent/12 text-text-primary"
                                  : "text-text-secondary hover:bg-surface-2 hover:text-text-primary",
                                item.disabled && "cursor-default opacity-50",
                              )}
                              data-command-index={index}
                              disabled={item.disabled}
                              type="button"
                              onClick={() => onSelect(item)}
                              onMouseEnter={() => onActiveIndexChange(index)}
                            >
                              {Icon ? (
                                <Icon
                                  className={cn(
                                    "h-4 w-4 shrink-0",
                                    isActive ? "text-accent" : "text-text-muted",
                                  )}
                                />
                              ) : (
                                <span className="h-4 w-4 shrink-0" />
                              )}
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm font-medium">
                                  {item.label}
                                </span>
                                {item.subtitle ? (
                                  <span className="block truncate text-xs text-text-muted">
                                    {item.subtitle}
                                  </span>
                                ) : null}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                ))
              )}
            </div>

            <div className="flex items-center justify-between border-t border-border px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-text-muted">
              <span>Navigate</span>
              <span className="flex items-center gap-2">
                <kbd className="rounded border border-border bg-surface-2 px-1 font-mono normal-case">
                  ↑↓
                </kbd>
                <kbd className="rounded border border-border bg-surface-2 px-1 font-mono normal-case">
                  enter
                </kbd>
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
