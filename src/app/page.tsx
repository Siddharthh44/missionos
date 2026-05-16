export default function Home() {
  return (
    <main className="shell-container flex min-h-screen items-center justify-center py-16">
      <section className="panel-surface grid w-full max-w-5xl gap-10 overflow-hidden border-border/80 p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-10">
        <div className="flex flex-col justify-between gap-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-soft px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-accent">
              Foundation Checkpoint
            </div>
            <div className="space-y-4">
              <h1 className="max-w-xl font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
                MissionOS is taking shape as an operational shell, not a
                template.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
                The foundation is now aligned to the approved visual system,
                typography contract, and dark-first product tone that future
                phases will inherit.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-surface-2 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-text-muted">
                Theme
              </p>
              <p className="mt-3 font-mono text-2xl font-semibold text-text-primary">
                Dark-first
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface-2 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-text-muted">
                Typeface
              </p>
              <p className="mt-3 font-mono text-2xl font-semibold text-text-primary">
                Syne + DM Sans
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface-2 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-text-muted">
                Shell Status
              </p>
              <p className="mt-3 font-mono text-2xl font-semibold text-status-aligned">
                In Progress
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-[radial-gradient(circle_at_top,#1f355f,transparent_55%),linear-gradient(180deg,#181b22_0%,#111318_100%)] p-6">
          <div className="flex h-full flex-col justify-between gap-6 rounded-xl border border-white/5 bg-background/55 p-6 backdrop-blur-sm">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.22em] text-text-muted">
                MissionOS
              </p>
              <div className="space-y-2">
                <p className="font-display text-2xl font-semibold text-text-primary">
                  Where teams align, execute, and accelerate.
                </p>
                <p className="text-sm leading-6 text-text-secondary">
                  Checkpoint 1 is focused on foundation integrity so the shell
                  can scale cleanly through role-aware navigation, protected
                  routes, and believable operational surfaces.
                </p>
              </div>
            </div>

            <div className="space-y-3 rounded-xl border border-border bg-surface-2/70 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">
                  Build discipline
                </span>
                <span className="font-mono text-sm text-text-primary">
                  Phase 0
                </span>
              </div>
              <div className="h-2 rounded-full bg-surface-3">
                <div className="h-2 w-2/5 rounded-full bg-accent" />
              </div>
              <p className="text-sm text-text-secondary">
                Foundation first. Shell next. Workflow depth stays deferred.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
