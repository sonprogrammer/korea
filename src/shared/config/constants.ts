
export const APP_NAME = "대한민국";

export const QUERY_KEYS = {
  todayStats: ["stats", "today"] as const,
  dailyStats: ["stats", "daily"] as const,
  myAttendance: ["attendance", "my"] as const,
  activeEvent: ["event", "active"] as const,
  authMe: ["auth", "me"] as const,
};

export const PENDING_ATTENDANCE_KEY = "gwangjang_pending_attendance";

export const KOREA_TIMEZONE = "Asia/Seoul";

export const SESSION_COOKIE_NAME = "gwangjang_session";
export const OAUTH_STATE_COOKIE_NAME = "kakao_oauth_state";

export const KAKAO_AUTH_URL = "https://kauth.kakao.com/oauth/authorize";
export const KAKAO_TOKEN_URL = "https://kauth.kakao.com/oauth/token";
export const KAKAO_USER_URL = "https://kapi.kakao.com/v2/user/me";


// *잠실 종합운동장
export const TargetCoords = {
  lat: 37.5150,
  lng: 127.0728
}
