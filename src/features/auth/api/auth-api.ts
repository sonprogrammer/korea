import { apiFetch } from "@/shared/api/fetcher";
import type { AuthUser } from "@/shared/types/auth";

export async function fetchAuthMe(): Promise<AuthUser | null> {
  const response = await fetch("/api/auth/me", { credentials: "include" });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error("인증 정보를 불러오지 못했습니다.");
  }

  return response.json() as Promise<AuthUser>;
}

export async function logout(): Promise<void> {
  await apiFetch<{ success: boolean }>("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
}
