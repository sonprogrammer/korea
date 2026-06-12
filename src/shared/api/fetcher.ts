import type { ApiErrorResponse } from "@/shared/types/api";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(url, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    let errorBody: ApiErrorResponse = { error: "요청 처리 중 오류가 발생했습니다." };
    try {
      errorBody = (await response.json()) as ApiErrorResponse;
    } catch {

    }
    throw new ApiError(
      errorBody.error,
      response.status,
      errorBody.code,
    );
  }

  return response.json() as Promise<T>;
}
