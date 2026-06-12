import { createClient } from "@supabase/supabase-js";

/** 공개 데이터(events, daily_stats) 조회용 anon 클라이언트 */
export function createAnonClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
