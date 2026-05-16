import { NextRequest, NextResponse } from "next/server";
import {
  parseRoleOverride,
  resolveEffectiveRole,
} from "@/features/auth/effective-role";
import { resolveProfileFromUser } from "@/features/auth/resolve-profile";
import { getDefaultRoute, isRouteAllowed } from "@/features/shell/route-access";
import {
  DEMO_SESSION_COOKIE_NAME,
  ROLE_OVERRIDE_COOKIE_NAME,
} from "@/lib/auth/constants";
import { resolveDemoProfile } from "@/lib/auth/demo-session";
import { refreshSupabaseSession } from "@/lib/supabase/middleware";

function isPublicPath(pathname: string) {
  return pathname === "/login" || pathname.startsWith("/api/");
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const { response, user } = await refreshSupabaseSession(request);

  const realProfile =
    resolveProfileFromUser(user) ??
    resolveDemoProfile(request.cookies.get(DEMO_SESSION_COOKIE_NAME)?.value);

  const roleOverride = parseRoleOverride(
    request.cookies.get(ROLE_OVERRIDE_COOKIE_NAME)?.value,
  );
  const effectiveRole = realProfile
    ? resolveEffectiveRole(realProfile.role, roleOverride)
    : null;

  if (pathname === "/login" && effectiveRole) {
    return NextResponse.redirect(
      new URL(getDefaultRoute(effectiveRole), request.url),
    );
  }

  if (isPublicPath(pathname)) {
    return response;
  }

  if (!effectiveRole) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!isRouteAllowed(effectiveRole, pathname)) {
    return NextResponse.redirect(
      new URL(getDefaultRoute(effectiveRole), request.url),
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
