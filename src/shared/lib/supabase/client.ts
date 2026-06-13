import { createBrowserClient } from "@supabase/ssr";


/** 브라우저 공개 데이터 조회용 anon 클라이언트 */
export function supabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
