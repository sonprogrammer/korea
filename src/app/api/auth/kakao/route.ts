import { NextResponse } from "next/server";
import { buildKakaoAuthorizeUrl } from "@/shared/lib/auth/kakao";
import {
  createOAuthState,
  setOAuthStateCookie,
} from "@/shared/lib/auth/session";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const next = searchParams.get("next") ?? "/";
  const state = createOAuthState();

  const authorizeUrl = buildKakaoAuthorizeUrl(state);
  const response = NextResponse.redirect(authorizeUrl);

  setOAuthStateCookie(response, `${state}:${encodeURIComponent(next)}`);
  return response;
}
