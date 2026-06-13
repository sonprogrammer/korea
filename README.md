# 광장체크 (Gwangjang Check)

행사 현장에서 GPS 위치 인증을 통해 참여 인증을 수행하는 서비스입니다.

> **중요**: 실제 인원 수가 아닌, **GPS 위치 인증을 통과한 참여 인증 수**만 집계합니다.

## 기술 스택

- Next.js 15 (App Router)
- TypeScript
- Ant Design + TailwindCSS
- Supabase
- 카카오 OAuth
- TanStack Query (React Query)
- Zustand
- date-fns



## 인증 흐름

```
[로그인 클릭]
  → GET /api/auth/kakao
  → 카카오 로그인
  → GET /api/auth/kakao (code → access_token → 사용자 정보)
  → profiles 테이블에 kakao_id + nickname 저장/갱신
  → 원래 페이지로 리다이렉트
```

## 페이지

| 경로 | 설명 | 인증 |
|------|------|------|
| `/` | 메인 - 실시간 인증 현황, 참여 인증 | 선택 |
| `/stats` | 일별 통계 차트 | 불필요 |
| `/my-attendance` | 내 인증 기록 | 필수 |

## API

| Method | Path | 설명 |
|--------|------|------|
| GET | `/api/auth/kakao` | 카카오 OAuth 시작 |
| GET | `/api/auth/kakao/callback` | 카카오 OAuth 콜백 |
| GET | `/api/auth/me` | 현재 로그인 사용자 |
| POST | `/api/auth/logout` | 로그아웃 |
| GET | `/api/stats/today` | 오늘 인증 인원 |
| GET | `/api/stats/daily` | 최근 7일 일별 통계 |
| POST | `/api/attendance` | 참여 인증 |
| GET | `/api/my-attendance` | 내 인증 기록 |

## 폴더 구조 (FSD)

```
src/
├── app/              # Next.js App Router
├── views/            # 페이지 컴포지션 (FSD pages layer)
├── widgets/          # UI 위젯
├── features/         # 비즈니스 기능 (auth, attendance-check)
├── entities/         # 도메인 엔티티 (event, attendance, stats)
└── shared/           # 공통 유틸, 타입, 설정
```

## 위치 인증

- 클라이언트: `navigator.geolocation`으로 GPS 좌표 획득
- 서버: Haversine 공식으로 거리 재검증 (필수)
- 기본 운동: 잠실종합운동장 (37.5145, 127.0728, 반경 500m)

## 중복 인증 방지

DB Unique Index: `(user_id, event_id, DATE(created_at KST))`

## 기존 DB 마이그레이션

Supabase Auth 기반으로 이미 스키마를 적용했다면 `supabase/migrations/002_kakao_oauth_direct.sql`을 실행하세요.
