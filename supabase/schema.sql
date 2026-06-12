-- 광장체크 (Gwangjang Check) Database Schema
-- Supabase SQL Editor에서 실행하세요.
-- 인증: Supabase Auth 미사용, 카카오 OAuth 직접 구현 + JWT 세션

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- profiles (카카오 OAuth 사용자)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  kakao_id TEXT NOT NULL UNIQUE,
  nickname TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- events
DO $$ BEGIN
  CREATE TYPE public.event_status AS ENUM ('active', 'inactive', 'ended');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  radius INTEGER NOT NULL DEFAULT 500,
  status public.event_status NOT NULL DEFAULT 'inactive',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- attendance
CREATE TABLE IF NOT EXISTS public.attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  accuracy DOUBLE PRECISION,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 같은 사용자 + 같은 이벤트 + 같은 날짜(한국 시간) 중복 인증 방지
CREATE UNIQUE INDEX IF NOT EXISTS attendance_user_event_date_unique
  ON public.attendance (
    user_id,
    event_id,
    ((created_at AT TIME ZONE 'Asia/Seoul')::date)
  );

-- daily_stats
CREATE TABLE IF NOT EXISTS public.daily_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  stat_date DATE NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  UNIQUE (event_id, stat_date)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_profiles_kakao_id ON public.profiles(kakao_id);
CREATE INDEX IF NOT EXISTS idx_attendance_event_id ON public.attendance(event_id);
CREATE INDEX IF NOT EXISTS idx_attendance_user_id ON public.attendance(user_id);
CREATE INDEX IF NOT EXISTS idx_attendance_created_at ON public.attendance(created_at);
CREATE INDEX IF NOT EXISTS idx_events_status ON public.events(status);
CREATE INDEX IF NOT EXISTS idx_daily_stats_event_date ON public.daily_stats(event_id, stat_date);

-- attendance 생성 시 daily_stats 자동 갱신
CREATE OR REPLACE FUNCTION public.update_daily_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  kst_date DATE;
BEGIN
  kst_date := (NEW.created_at AT TIME ZONE 'Asia/Seoul')::date;

  INSERT INTO public.daily_stats (event_id, stat_date, count)
  VALUES (NEW.event_id, kst_date, 1)
  ON CONFLICT (event_id, stat_date)
  DO UPDATE SET count = daily_stats.count + 1;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_attendance_created ON public.attendance;
CREATE TRIGGER on_attendance_created
  AFTER INSERT ON public.attendance
  FOR EACH ROW
  EXECUTE FUNCTION public.update_daily_stats();

-- RLS (API는 service role 사용, 공개 데이터만 anon 허용)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_stats ENABLE ROW LEVEL SECURITY;

-- profiles, attendance: 직접 클라이언트 접근 차단 (정책 없음 = 거부)
-- events, daily_stats: 공개 읽기
DROP POLICY IF EXISTS "events_select_all" ON public.events;
CREATE POLICY "events_select_all" ON public.events
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "daily_stats_select_all" ON public.daily_stats;
CREATE POLICY "daily_stats_select_all" ON public.daily_stats
  FOR SELECT USING (true);

-- 시드 데이터: 잠실종합운동장 집회 (최초 1회만 삽입)
INSERT INTO public.events (title, latitude, longitude, radius, status)
SELECT '잠실종합운동장 집회', 37.5145, 127.0728, 500, 'active'
WHERE NOT EXISTS (
  SELECT 1 FROM public.events WHERE title = '잠실종합운동장 집회'
);
