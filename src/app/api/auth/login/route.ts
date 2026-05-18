import { NextRequest, NextResponse } from "next/server";
import { getDefaultRoute, isRouteAllowed } from "@/features/shell/route-access";
import {
  DEMO_PASSWORD,
  DEMO_SESSION_COOKIE_NAME,
  ROLE_OVERRIDE_COOKIE_NAME,
} from "@/lib/auth/constants";
import {
  createDemoSessionValue,
  isValidDemoPassword,
  resolveDemoProfile,
} from "@/lib/auth/demo-session";
import { resolveProfileFromUser } from "@/features/auth/resolve-profile";
import { createRouteHandlerSupabaseClient } from "@/lib/supabase/server";

function sanitizeRedirect(pathname: string | null | undefined) {
  if (!pathname || !pathname.startsWith("/")) {
    return "/mission-control";
  }

  return pathname;
}

function shouldUseSecureCookies(request: NextRequest) {
  return request.nextUrl.protocol === "https:";
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    | { email?: string; next?: string; password?: string }
    | null;

  const email = body?.email?.trim().toLowerCase() ?? "";
  const password = body?.password ?? "";
  const nextPath = sanitizeRedirect(body?.next);

  if (!email || !password) {
    return NextResponse.json(
      {
        error: "Enter your email and password to continue.",
      },
      { status: 400 },
    );
  }

  let response = NextResponse.json({
  redirectTo: "/mission-control",
  });

  const supabase = createRouteHandlerSupabaseClient(request, response);

  if (supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      return NextResponse.json(
        {
          error: "Sign in failed. Check the workspace credentials and try again.",
        },
        { status: 401 },
      );
    }

    const realProfile = resolveProfileFromUser(data.user);
    const defaultRoute = getDefaultRoute(realProfile?.role ?? "employee");
    const redirectTo =
      realProfile && isRouteAllowed(realProfile.role, nextPath)
        ? nextPath
        : defaultRoute;

    const finalResponse = new NextResponse(JSON.stringify({ redirectTo }), {
      headers: response.headers,
      status: 200,
    });
    finalResponse.headers.set("Content-Type", "application/json");
    finalResponse.cookies.delete(DEMO_SESSION_COOKIE_NAME);
    finalResponse.cookies.delete(ROLE_OVERRIDE_COOKIE_NAME);

    return finalResponse;
  }

  const demoProfile = resolveDemoProfile(email);

  if (!demoProfile || !isValidDemoPassword(password)) {
    return NextResponse.json(
      {
        error: `Use one of the seeded demo accounts and the shared password "${DEMO_PASSWORD}".`,
      },
      { status: 401 },
    );
  }

  const redirectTo = isRouteAllowed(demoProfile.role, nextPath)
    ? nextPath
    : getDefaultRoute(demoProfile.role);

  response = NextResponse.json({ redirectTo });
  response.cookies.set(
    DEMO_SESSION_COOKIE_NAME,
    createDemoSessionValue(demoProfile),
    {
      httpOnly: true,
      maxAge: 60 * 60 * 12,
      path: "/",
      sameSite: "lax",
      secure: shouldUseSecureCookies(request),
    },
  );
  response.cookies.delete(ROLE_OVERRIDE_COOKIE_NAME);

  return response;
}
