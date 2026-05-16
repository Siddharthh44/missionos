import { NextRequest, NextResponse } from "next/server";
import { resolveEffectiveRole, isUserRole } from "@/features/auth/effective-role";
import { resolveProfileFromUser } from "@/features/auth/resolve-profile";
import { getDefaultRoute, isRouteAllowed } from "@/features/shell/route-access";
import {
  DEMO_SESSION_COOKIE_NAME,
  ROLE_OVERRIDE_COOKIE_NAME,
} from "@/lib/auth/constants";
import { resolveDemoProfile } from "@/lib/auth/demo-session";
import { createRouteHandlerSupabaseClient } from "@/lib/supabase/server";

function sanitizePathname(pathname: string | null | undefined) {
  if (!pathname || !pathname.startsWith("/")) {
    return "/";
  }

  return pathname;
}

function shouldUseSecureCookies(request: NextRequest) {
  return request.nextUrl.protocol === "https:";
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    | { pathname?: string; role?: string }
    | null;

  const requestedRole = body?.role ?? null;

  if (!isUserRole(requestedRole)) {
    return NextResponse.json(
      { error: "Invalid role selection." },
      { status: 400 },
    );
  }

  const pathname = sanitizePathname(body?.pathname);
  const response = NextResponse.json({});
  const supabase = createRouteHandlerSupabaseClient(request, response);

  let realProfile = null;

  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    realProfile = resolveProfileFromUser(user);
  }

  if (!realProfile) {
    realProfile = resolveDemoProfile(
      request.cookies.get(DEMO_SESSION_COOKIE_NAME)?.value,
    );
  }

  if (!realProfile) {
    return NextResponse.json(
      { error: "Sign in to switch roles." },
      { status: 401 },
    );
  }

  const roleOverride =
    requestedRole === realProfile.role ? null : requestedRole;
  const effectiveRole = resolveEffectiveRole(realProfile.role, roleOverride);
  const redirectTo = isRouteAllowed(effectiveRole, pathname)
    ? pathname
    : getDefaultRoute(effectiveRole);

  const finalResponse = new NextResponse(
    JSON.stringify({
      effectiveRole,
      redirectTo,
      roleOverride,
    }),
    {
      headers: response.headers,
      status: 200,
    },
  );
  finalResponse.headers.set("Content-Type", "application/json");

  if (roleOverride) {
    finalResponse.cookies.set(ROLE_OVERRIDE_COOKIE_NAME, roleOverride, {
      httpOnly: true,
      maxAge: 60 * 60 * 12,
      path: "/",
      sameSite: "lax",
      secure: shouldUseSecureCookies(request),
    });
  } else {
    finalResponse.cookies.delete(ROLE_OVERRIDE_COOKIE_NAME);
  }

  return finalResponse;
}
