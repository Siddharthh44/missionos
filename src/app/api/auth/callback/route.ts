import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { origin, searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  let nextPath = searchParams.get("next") ?? "/";

  if (!nextPath.startsWith("/")) {
    nextPath = "/";
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/login`);
  }

  // Create response object first so Supabase can set cookies on it
  const response = NextResponse.redirect(`${origin}${nextPath}`);
  const supabase = createRouteHandlerSupabaseClient(request, response);

  if (!supabase) {
    return NextResponse.redirect(`${origin}/login`);
  }

  // Exchange code for session - this sets cookies on the response object
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}/login`);
  }

  // Add cache control headers to prevent caching of the redirect
  // This ensures subsequent requests see the fresh session cookie
  response.headers.set("Cache-Control", "private, no-store, max-age=0");

  return response;
}
