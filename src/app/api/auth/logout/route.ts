import { NextRequest, NextResponse } from "next/server";
import {
  DEMO_SESSION_COOKIE_NAME,
  ROLE_OVERRIDE_COOKIE_NAME,
} from "@/lib/auth/constants";
import { createRouteHandlerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ ok: true });
  const supabase = createRouteHandlerSupabaseClient(request, response);

  if (supabase) {
    await supabase.auth.signOut();
  }

  response.cookies.delete(DEMO_SESSION_COOKIE_NAME);
  response.cookies.delete(ROLE_OVERRIDE_COOKIE_NAME);

  return response;
}
