import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { upsertProfileByKakao } from "@/features/auth/lib/upsert-profile";
import { OAUTH_STATE_COOKIE_NAME } from "@/shared/config/constants";
import {
  exchangeKakaoCode,
  fetchKakaoUser,
} from "@/shared/lib/auth/kakao";
import {
  clearOAuthStateCookie,
  createSessionToken,
  setSessionCookie,
} from "@/shared/lib/auth/session";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;

  if (error || !code || !state) {
    return NextResponse.redirect(`${appUrl}/?auth=error`);
  }

  const cookieStore = await cookies();
  const storedState = cookieStore.get(OAUTH_STATE_COOKIE_NAME)?.value;

  if (!storedState) {
    return NextResponse.redirect(`${appUrl}/?auth=error`);
  }

  const [savedState, encodedNext] = storedState.split(":");
  const next = encodedNext ? decodeURIComponent(encodedNext) : "/";

  if (savedState !== state) {
    const response = NextResponse.redirect(`${appUrl}/?auth=error`);
    clearOAuthStateCookie(response);
    return response;
  }

  try {
    const tokenData = await exchangeKakaoCode(code);
    const kakaoUser = await fetchKakaoUser(tokenData.access_token);
    const user = await upsertProfileByKakao(
      kakaoUser.kakaoId,
      kakaoUser.nickname,
    );
    const sessionToken = await createSessionToken(user);

    const redirectUrl = new URL(next, appUrl);
    const response = NextResponse.redirect(redirectUrl.toString());

    clearOAuthStateCookie(response);
    setSessionCookie(response, sessionToken);
    return response;
  } catch {
    const response = NextResponse.redirect(`${appUrl}/?auth=error`);
    clearOAuthStateCookie(response);
    return response;
  }
}
