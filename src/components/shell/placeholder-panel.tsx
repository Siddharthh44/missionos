import SectionLabel from "@/components/shell/section-label";
import ShellCard from "@/components/shell/shell-card";
import type { ShellStat } from "@/types";

interface PlaceholderPanelProps {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  metrics: ShellStat[];
  sideTitle: string;
  sideBody: string;
  sideHighlights: string[];
}

export default function PlaceholderPanel({
  eyebrow,
  title,
  description,
  points,
  metrics,
  sideTitle,
  sideBody,
  sideHighlights,
}: PlaceholderPanelProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
      <ShellCard className="space-y-6">
        <div className="space-y-3">
          <SectionLabel label={eyebrow} />
          <div className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-text-primary">
              {title}
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-text-secondary">
              {description}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-border bg-surface-2 p-4"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
                {metric.label}
              </p>
              <p className="mt-3 font-mono text-2xl font-semibold text-text-primary">
                {metric.value}
              </p>
              {metric.detail ? (
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  {metric.detail}
                </p>
              ) : null}
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <SectionLabel label="Shell Readiness" />
          <ul className="grid gap-3 text-sm leading-6 text-text-secondary">
            {points.map((point) => (
              <li
                key={point}
                className="rounded-lg border border-border bg-surface-2/70 px-4 py-3"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      </ShellCard>

      <ShellCard className="space-y-5 bg-[radial-gradient(circle_at_top,#23365f,transparent_58%),#111318]">
        <SectionLabel label="Secondary Context" />
        <div className="space-y-3">
          <h3 className="font-display text-xl font-semibold text-text-primary">
            {sideTitle}
          </h3>
          <p className="text-sm leading-7 text-text-secondary">{sideBody}</p>
        </div>

        <div className="space-y-3 rounded-xl border border-border bg-background/45 p-4">
          {sideHighlights.map((highlight) => (
            <div
              key={highlight}
              className="rounded-lg border border-border bg-surface-2/70 px-4 py-3 text-sm leading-6 text-text-secondary"
            >
              {highlight}
            </div>
          ))}
        </div>
      </ShellCard>
    </div>
  );
}
