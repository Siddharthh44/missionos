"use client";

import { startTransition, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LoaderCircle, LockKeyhole } from "lucide-react";
import { previewProfiles } from "@/data/seed";
import { DEMO_PASSWORD } from "@/lib/auth/constants";

const DEMO_ACCOUNTS = Object.values(previewProfiles);

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(previewProfiles.employee.email);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextPath = searchParams.get("next") ?? "/";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          next: nextPath,
          password,
        }),
      });

      const payload = (await response.json()) as {
        error?: string;
        redirectTo?: string;
      };

      if (!response.ok || !payload.redirectTo) {
        setError(payload.error ?? "Sign in failed. Try again.");
        return;
      }

      startTransition(() => {
        router.replace(payload.redirectTo ?? "/");
        router.refresh();
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <label className="block space-y-2">
          <span className="text-sm text-text-secondary">Work email</span>
          <input
            className="w-full rounded-lg border border-border bg-surface-2 px-4 py-3 text-text-primary outline-none transition-colors duration-150 focus:border-accent"
            placeholder="priya@demo.missionos.app"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm text-text-secondary">Password</span>
          <input
            className="w-full rounded-lg border border-border bg-surface-2 px-4 py-3 text-text-primary outline-none transition-colors duration-150 focus:border-accent"
            placeholder="........"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>

      <div className="space-y-3 rounded-2xl border border-border bg-surface-2/55 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
          Demo Accounts
        </p>
        <div className="grid gap-2">
          {DEMO_ACCOUNTS.map((profile) => (
            <button
              key={profile.id}
              className="flex items-center justify-between rounded-xl border border-border px-3 py-3 text-left transition-colors duration-150 hover:border-accent/30 hover:bg-background/50"
              type="button"
              onClick={() => {
                setEmail(profile.email);
                setPassword(DEMO_PASSWORD);
              }}
            >
              <div>
                <p className="text-sm font-medium text-text-primary">
                  {profile.name}
                </p>
                <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
                  {profile.role}
                </p>
              </div>
              <p className="text-xs text-text-secondary">{profile.email}</p>
            </button>
          ))}
        </div>
        <p className="text-sm text-text-secondary">
          Shared demo password:{" "}
          <span className="font-mono text-text-primary">{DEMO_PASSWORD}</span>
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
          {error}
        </div>
      ) : null}

      <button
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-80"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? (
          <LoaderCircle className="h-4 w-4 animate-spin" />
        ) : (
          <LockKeyhole className="h-4 w-4" />
        )}
        Continue to workspace
      </button>
    </form>
  );
}
