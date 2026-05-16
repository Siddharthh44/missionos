import { createServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseEnv } from "@/lib/supabase/env";

export async function refreshSupabaseSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const env = getSupabaseEnv();

  if (!env) {
    return {
      response,
      user: null as User | null,
    };
  }

  const supabase = createServerClient(env.url, env.key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(
        cookiesToSet: { name: string; options: CookieOptions; value: string }[],
      ) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        response = NextResponse.next({
          request,
        });

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  response.headers.set("Cache-Control", "private, no-store");

  return {
    response,
    user,
  };
}
