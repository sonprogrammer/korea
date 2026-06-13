export interface AuthUser {
  id: string;
  created_at: string;
  email: string
  nickname: string;
}

export interface SessionPayload {
  sub: string;
  kakaoId: string;
  nickname: string;
}
