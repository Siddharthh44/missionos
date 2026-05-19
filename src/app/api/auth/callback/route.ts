import { NextRequest, NextResponse } from "next/server";
import { resolvePostAuthRedirect } from "@/features/auth/redirect-target";
import { resolveProfileFromUser } from "@/features/auth/resolve-profile";
import { getDefaultRoute } from "@/features/shell/route-access";
import { createRouteHandlerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { origin, searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const requestedNext = searchParams.get("next");

  if (!code) {
    return NextResponse.redirect(`${origin}/login`);
  }

  const provisionalResponse = NextResponse.next();
  const supabase = createRouteHandlerSupabaseClient(request, provisionalResponse);

  if (!supabase) {
    return NextResponse.redirect(`${origin}/login`);
  }

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    return NextResponse.redirect(`${origin}/login`);
  }

  const profile = resolveProfileFromUser(data.user);
  const redirectPath = profile
    ? resolvePostAuthRedirect(profile.role, requestedNext)
    : getDefaultRoute("employee");

  const response = NextResponse.redirect(`${origin}${redirectPath}`);

  provisionalResponse.cookies.getAll().forEach((cookie) => {
    response.cookies.set(cookie);
  });

  response.headers.set("Cache-Control", "private, no-store, max-age=0");

  return response;
}
