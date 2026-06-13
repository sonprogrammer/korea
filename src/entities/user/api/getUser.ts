import { supabaseClient } from "@/shared/lib/supabase/client";

export const getUser = async()=> {
    const supabase = supabaseClient()

    const { data: {user}, error: authError} = await supabase.auth.getUser()

    if(authError || !user){
        console.error('로그인이 필요합니다')
        return null
    }

    const { data: profile, error} = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle()

    if(error){
        console.error('프로필 조회 실패',error)
        return null
    }

    return profile
}