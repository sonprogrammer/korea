import { supabaseClient } from "@/shared/lib/supabase/client";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/"; // 로그인 완료 후 돌아갈 페이지 주소
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;

  // 1. 에러가 있거나 코드가 없으면 즉시 에러 페이지로 리다이렉트
  if (searchParams.get("error") || !code) {
    return NextResponse.redirect(`${appUrl}/?auth=error`);
  }

  try {
    const supabase = await supabaseClient();

    // 2. 💡 이 한 줄이 핵심! 코드를 세션으로 교환하면서 auth.users에 자동으로 유저를 생성/로그인시킴
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error || !data?.user) {
      throw new Error(error?.message || "Supabase 세션 교환 실패");
    }

    const supabaseUser = data.user;

    // 3. 💡 이제 auth.users에 생긴 진짜 UUID를 가져와서 형의 profiles 테이블에 upsert
    // 카카오가 던져준 닉네임과 이메일 정보는 user_metadata와 email 필드에서 꺼내다 꽂으면 끝!
    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({
        id: supabaseUser.id, // 👈 auth.users의 primary key (UUID)와 일치시킴
        email: supabaseUser.email ?? "",
        nickname: supabaseUser.user_metadata?.nickname || "유저",
        // 기존 profiles 테이블에 정의된 필드가 더 있다면 여기에 추가 가능
      });

    if (profileError) {
      console.error("Profiles 테이블 연동 실패:", profileError.message);
      // 프로필 저장 실패 시 후속 처리 (필요에 따라 에러 처리)
    }

    // 4. 모든 처리가 정상 완료되면 유저가 원했던 페이지(next)로 안전하게 복귀
    const redirectUrl = new URL(next, appUrl);
    return NextResponse.redirect(redirectUrl.toString());

  } catch (err) {
    console.error("인증 콜백 에러 발생:", err);
    return NextResponse.redirect(`${appUrl}/?auth=error`);
  }
}