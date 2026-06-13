import { supabaseClient } from "@/shared/lib/supabase/client"


export const kakaoLogin = async() => {
  const supabase = supabaseClient()

  const {error} = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: `${window.location.origin}/api/auth/kakao`
    }
  })
  if(error){
    console.error('kakaologin error', error)
  }
}
