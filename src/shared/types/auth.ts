export interface AuthUser {
  id: string;
  kakaoId: string;
  nickname: string;
}

export interface SessionPayload {
  sub: string;
  kakaoId: string;
  nickname: string;
}
