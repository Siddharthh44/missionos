import { Orbit } from "lucide-react";
import LoginForm from "@/features/auth/login-form";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";

export default function LoginPage() {
  return (
    <main className="shell-container flex min-h-screen items-center justify-center py-16">
      <section className="panel-surface grid w-full max-w-5xl overflow-hidden lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden flex-col justify-between bg-[radial-gradient(circle_at_top,#213760,transparent_58%),#111318] p-10 lg:flex">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-soft px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
              MissionOS
            </div>
            <h1 className="max-w-md font-display text-4xl font-bold leading-tight text-text-primary">
              A premium operational layer for mission alignment and momentum.
            </h1>
            <p className="max-w-md text-sm leading-7 text-text-secondary">
              The auth boundary is now wired for a lightweight real session
              layer, protected routes, and demo-safe role switching.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-background/45 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
                Session Layer
              </p>
              <p className="mt-2 font-mono text-2xl font-semibold text-text-primary">
                Supabase ready
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background/45 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
                Demo Flow
              </p>
              <p className="mt-2 font-mono text-2xl font-semibold text-text-primary">
                Role switch enabled
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-8 p-8 lg:p-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-border bg-surface-2 p-3 text-accent">
                <Orbit className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-2xl font-semibold text-text-primary">
                  {APP_NAME}
                </p>
                <p className="text-sm text-text-secondary">{APP_TAGLINE}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-display text-3xl font-bold text-text-primary">
                Sign in to your workspace
              </h2>
              <p className="max-w-md text-sm leading-7 text-text-secondary">
                Use a real Supabase account when the environment is configured,
                or the seeded demo identities for a zero-friction local review.
              </p>
            </div>
          </div>

          <LoginForm />
        </div>
      </section>
    </main>
  );
}
