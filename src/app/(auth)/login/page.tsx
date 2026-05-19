"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { readRedirectSearchParam } from "@/features/auth/redirect-target";
import { cn } from "@/lib/cn";
import Image from "next/image";


// Demo account data
const DEMO_ACCOUNTS = [
  {
    name: "Priya Sharma",
    role: "Employee",
    email: "priya@demo.missionos.app",
    password: "missionos-demo",
  },
  {
    name: "Arjun Nair",
    role: "Manager",
    email: "arjun@demo.missionos.app",
    password: "missionos-demo",
  },
  {
    name: "Neha Mehta",
    role: "Admin",
    email: "neha@demo.missionos.app",
    password: "missionos-demo",
  },
] as const;

export default function LoginPage() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);

  const redirectTarget = readRedirectSearchParam(searchParams.get("next"));
  const loading = isSubmitting;

  // Preserve existing Supabase auth logic
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

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
          password,
          ...(redirectTarget ? { next: redirectTarget } : {}),
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

      // Allow auth cookies to persist before navigation
      await new Promise((resolve) => setTimeout(resolve, 250));

      // Full document navigation prevents App Router auth race condition
      window.location.href = payload.redirectTo;
    } catch (error) {
      console.error(error);

      setError("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function fillDemo(account: (typeof DEMO_ACCOUNTS)[number]) {
    setEmail(account.email);
    setPassword(account.password);
    setError(null);
    setSelectedDemo(account.email);
  }

  return (
    <main className="min-h-screen bg-[#09090b] flex items-center justify-center p-6">
      <div className="max-w-sm w-full flex flex-col items-center">
        {/* Logo row (above card) */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06] border border-white/[0.04]">
            <Image
              src="/logo-mark.svg"
              alt="MissionOS"
              width={30}
              height={30}
              className="object-contain"
              priority
            />
          </div>

          <span className="text-[15px] font-semibold tracking-[0.04em] text-white">
            MissionOS
          </span>
        </div>

        {/* Card */}
        <div className="w-full bg-[#111113] border border-white/[0.06] rounded-2xl p-8 shadow-2xl">
          {/* Heading */}
          <h1 className="text-[22px] font-semibold text-white tracking-tight">
            Sign in to your workspace
          </h1>
          <p className="text-[13px] text-white/40 mt-1 mb-5">
            Enter credentials or pick a demo account below
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* Work email */}
            <label htmlFor="login-email" className="text-[13px] text-white/60 mb-1.5">
              Work email
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="h-10 w-full bg-[#1a1a1e] border border-white/8 rounded-lg text-sm text-white placeholder:text-white/25 px-3 outline-none focus:border-[#5b6ef5] transition-colors"
            />

            {/* Password */}
            <label
              htmlFor="login-password"
              className="text-[13px] text-white/60 mb-1.5 mt-3"
            >
              Password
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="h-10 w-full bg-[#1a1a1e] border border-white/8 rounded-lg text-sm text-white placeholder:text-white/25 px-3 outline-none focus:border-[#5b6ef5] transition-colors"
            />

            {/* Sign In button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full h-10 bg-[#5b6ef5] hover:bg-[#6b7ef8] text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                </>
              ) : null}
              {loading ? "Signing in…" : "Sign In"}
            </button>

            {/* Error message */}
            {error ? (
              <p className="text-[12px] text-red-400 mt-2">{error}</p>
            ) : null}

            {/* Divider */}
            <div className="relative mt-5 mb-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/[0.06]" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#111113] px-3 text-[10px] tracking-[0.15em] text-white/25">
                  DEMO ACCOUNTS
                </span>
              </div>
            </div>

            {/* Demo accounts list */}
            <div className="flex flex-col gap-1">
              {DEMO_ACCOUNTS.map((account) => {
                const isSelected = selectedDemo === account.email;

                return (
                  <button
                    key={account.email}
                    type="button"
                    onClick={() => fillDemo(account)}
                    className={cn(
                      "group relative overflow-hidden rounded-xl transition-all duration-200",
                      "flex items-center justify-between px-3 py-3",
                      isSelected
                        ? "bg-white/[0.06]"
                        : "hover:bg-white/[0.03]"
                    )}
                  >
                    {/* Left active indicator */}
                    <div
                      className={cn(
                        "absolute left-0 top-1/2 h-[70%] -translate-y-1/2 rounded-r-full transition-all duration-200",
                        isSelected
                          ? "bg-white/80 opacity-100"
                          : "opacity-0"
                      )}
                    />

                    {/* Content */}
                    <div className="flex items-center justify-between w-full pl-2">
                      <span
                        className={cn(
                          "text-[13px] font-medium transition-colors",
                          isSelected
                            ? "text-white"
                            : "text-white/70"
                        )}
                      >
                        {account.name}
                      </span>

                      <span
                        className={cn(
                          "rounded-full px-1.5 py-0.5 text-[9px] uppercase tracking-widest transition-colors",
                          isSelected
                            ? "bg-white/[0.08] text-white/70"
                            : "bg-white/[0.04] text-white/35"
                        )}
                      >
                        {account.role}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
