import {
  differenceInCalendarDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";

/** Demo reference "now" — keeps relative labels aligned with seeded mission data. */
export const OPERATIONAL_NOW = new Date("2026-05-19T12:00:00Z");

const UTC_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export function parseOperationalDate(
  value: string | Date | null | undefined,
): Date | null {
  if (!value) {
    return null;
  }

  const parsed = value instanceof Date ? value : new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function utcDayIndex(date: Date): number {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

function formatUtcShort(date: Date): string {
  return `${UTC_MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}`;
}

function formatFutureRelative(date: Date, now: Date): string {
  const minutes = differenceInMinutes(date, now);
  if (minutes < 60) {
    return `in ${Math.max(minutes, 1)}m`;
  }

  const hours = differenceInHours(date, now);
  if (hours < 24 && utcDayIndex(date) === utcDayIndex(now)) {
    return `in ${hours}h`;
  }

  const days = differenceInCalendarDays(
    new Date(utcDayIndex(date)),
    new Date(utcDayIndex(now)),
  );

  if (days === 1) {
    return "Tomorrow";
  }
  if (days > 1 && days <= 14) {
    return `in ${days}d`;
  }

  return formatUtcShort(date);
}

/**
 * Compact operational relative time: "2m ago", "3h ago", "Yesterday", "5d ago".
 */
export function formatOperationalRelative(
  value: string | Date | null | undefined,
  now: Date = OPERATIONAL_NOW,
): string {
  const date = parseOperationalDate(value);
  if (!date) {
    return "—";
  }

  if (date.getTime() > now.getTime()) {
    return formatFutureRelative(date, now);
  }

  const minutes = differenceInMinutes(now, date);
  if (minutes < 1) {
    return "Just now";
  }
  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = differenceInHours(now, date);
  const dayGap = differenceInCalendarDays(
    new Date(utcDayIndex(now)),
    new Date(utcDayIndex(date)),
  );

  if (dayGap === 0) {
    return `${hours}h ago`;
  }
  if (dayGap === 1) {
    return "Yesterday";
  }
  if (dayGap < 7) {
    return `${dayGap}d ago`;
  }

  return formatUtcShort(date);
}

/**
 * Future deadlines and due dates — absolute when far out, compact when near.
 */
export function formatOperationalDeadline(
  value: string | Date | null | undefined,
  now: Date = OPERATIONAL_NOW,
): string {
  const date = parseOperationalDate(value);
  if (!date) {
    return "Not set";
  }

  const daysUntil = differenceInCalendarDays(
    new Date(utcDayIndex(date)),
    new Date(utcDayIndex(now)),
  );

  if (daysUntil < 0) {
    return `Overdue · ${formatUtcShort(date)}`;
  }
  if (daysUntil === 0) {
    return "Due today";
  }
  if (daysUntil === 1) {
    return "Due tomorrow";
  }
  if (daysUntil <= 14) {
    return `Due in ${daysUntil}d`;
  }

  return formatUtcShort(date);
}

/**
 * Short sync / review label prefix: "Submitted 3h ago"
 */
export function formatOperationalLabeled(
  label: string,
  value: string | Date | null | undefined,
  now?: Date,
): string {
  return `${label} ${formatOperationalRelative(value, now)}`;
}
