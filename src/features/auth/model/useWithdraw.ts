import { kakaoLogin } from "@/features/auth/api/auth-api";
import { withdraw } from "@/features/auth/api/auth-withdraw";
import { supabaseClient } from "@/shared/lib/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { App } from "antd";

export function useWithdraw() {
    const {message} = App.useApp()
    const supabase = supabaseClient()
    
    return useMutation({
        mutationFn: withdraw,
        onSuccess: async() => {
            await supabase.auth.signOut()
            message.success('탈퇴 성공, 저희 서비스를 이용해주셔서 감사했습니다.')
            window.location.href= '/'
        },
        onError: (error) => {
            if(error.message === 'token_expired'){
                message.error('카카오 인증이 만료되었습니다. 다시 로그인 후 탈퇴를 진행해주세요.')               
                supabase.auth.signOut()
                kakaoLogin()
            }else{
                console.error('탈퇴 실패 ap di', error.message)
                message.error('탈퇴실패')
                
            }
        }
    })
}