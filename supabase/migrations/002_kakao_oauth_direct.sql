-- 기존 Supabase Auth 기반 스키마에서 카카오 OAuth 직접 구현으로 마이그레이션
-- 주의: 기존 profiles/attendance 데이터가 있다면 백업 후 실행하세요.

-- auth.users 트리거 제거
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 기존 RLS 정책 제거
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
DROP POLICY IF EXISTS "attendance_select_own" ON public.attendance;
DROP POLICY IF EXISTS "attendance_insert_own" ON public.attendance;

-- profiles 테이블 재구성 (기존 데이터 없을 때)
-- 기존 테이블이 auth.users FK를 사용 중이면 DROP 후 재생성 필요
DROP TABLE IF EXISTS public.attendance CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  kakao_id TEXT NOT NULL UNIQUE,
  nickname TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  accuracy DOUBLE PRECISION,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX attendance_user_event_date_unique
  ON public.attendance (
    user_id,
    event_id,
    ((created_at AT TIME ZONE 'Asia/Seoul')::date)
  );

CREATE INDEX idx_profiles_kakao_id ON public.profiles(kakao_id);
CREATE INDEX idx_attendance_user_id ON public.attendance(user_id);

-- attendance 트리거 재생성
DROP TRIGGER IF EXISTS on_attendance_created ON public.attendance;
CREATE TRIGGER on_attendance_created
  AFTER INSERT ON public.attendance
  FOR EACH ROW
  EXECUTE FUNCTION public.update_daily_stats();

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
