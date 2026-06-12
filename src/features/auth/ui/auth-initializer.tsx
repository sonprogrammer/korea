"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/model/auth-store";

export function AuthInitializer() {
  const initialize = useAuthStore((s) => s.initialize);

  useEffect(() => {
    void initialize();
  }, [initialize]);

  return null;
}
