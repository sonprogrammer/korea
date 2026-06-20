import { createAdminClient } from '@/shared/lib/supabase/admin';

import { supabaseServer } from '@/shared/lib/supabase/server';
import { NextResponse } from 'next/server';


export async function POST() {
    try {
        const supabaseAdmin = createAdminClient()

        const supabase = await supabaseServer()
        const { data: { session } } = await supabase.auth.getSession()
        // * 카카오 provider엑세슨토큰
        const providerToken = session?.provider_token

        if (!session?.user.id) {
            throw new Error('인증 세션이 없습니다.')
        }

        const userId = session.user.id

        if (!providerToken) {
            throw new Error('카카오 엑세스 토큰이 없습니다. 다시 로그인 해주세요')
        }

        //* 카카오 연결 끊기
        const kakaoRes = await fetch('https://kapi.kakao.com/v1/user/unlink', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${providerToken}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })



        if (!kakaoRes.ok) {
            const errorResult = await kakaoRes.json();
            console.error('카카오 연결 해제 실패:', errorResult);
            throw new Error('카카오 연결 해제 실패')
        }

        const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)
        if (error) throw error

        return NextResponse.json({ message: '탈퇴가 완료되었습니다.' }, { status: 200 })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : '알수없는 오류가 발생하였습니다'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}