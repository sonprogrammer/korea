import {
  KAKAO_AUTH_URL,
  KAKAO_TOKEN_URL,
  KAKAO_USER_URL,
} from "@/shared/config/constants";

const KAKAO_SCOPE = "profile_nickname";

interface KakaoTokenResponse {
  access_token: string;
  token_type: string;
  refresh_token?: string;
  expires_in: number;
}

interface KakaoUserResponse {
  id: number;
  properties?: {
    nickname?: string;
  };
}

function getKakaoConfig() {
  const clientId = process.env.KAKAO_REST_API_KEY;
  const redirectUri = process.env.KAKAO_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    throw new Error(
      "KAKAO_REST_API_KEY, KAKAO_REDIRECT_URI 환경 변수가 필요합니다.",
    );
  }

  return { clientId, redirectUri };
}

export function buildKakaoAuthorizeUrl(state: string): string {
  const { clientId, redirectUri } = getKakaoConfig();

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: KAKAO_SCOPE,
    state,
  });

  return `${KAKAO_AUTH_URL}?${params.toString()}`;
}

export async function exchangeKakaoCode(
  code: string,
): Promise<KakaoTokenResponse> {
  const { clientId, redirectUri } = getKakaoConfig();
  const clientSecret = process.env.KAKAO_CLIENT_SECRET;

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: clientId,
    redirect_uri: redirectUri,
    code,
  });

  if (clientSecret) {
    body.set("client_secret", clientSecret);
  }

  const response = await fetch(KAKAO_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`카카오 토큰 발급 실패: ${errorText}`);
  }

  return response.json() as Promise<KakaoTokenResponse>;
}

export async function fetchKakaoUser(
  accessToken: string,
): Promise<{ kakaoId: string; nickname: string }> {
  const response = await fetch(KAKAO_USER_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`카카오 사용자 정보 조회 실패: ${errorText}`);
  }

  const data = (await response.json()) as KakaoUserResponse;
  const nickname = data.properties?.nickname?.trim();

  if (!nickname) {
    throw new Error("카카오 닉네임을 가져올 수 없습니다.");
  }

  return {
    kakaoId: String(data.id),
    nickname,
  };
}
