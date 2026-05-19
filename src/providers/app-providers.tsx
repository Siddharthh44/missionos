"use client";

import type { PropsWithChildren } from "react";
import RoleProvider from "@/providers/role-provider";
import ToastProvider from "@/providers/toast-provider";
import type { AuthSnapshot } from "@/types";

interface AppProvidersProps extends PropsWithChildren {
  initialAuthState: AuthSnapshot;
}

export default function AppProviders({
  children,
  initialAuthState,
}: AppProvidersProps) {
  return (
    <ToastProvider>
      <RoleProvider initialState={initialAuthState}>{children}</RoleProvider>
    </ToastProvider>
  );
}
