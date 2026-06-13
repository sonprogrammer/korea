import { supabaseServer } from "@/shared/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest){
  const { searchParams, origin} = new URL(req.url)
  const code = searchParams.get('code')
  const next =searchParams.get('next') ?? '/'
  
  if(code){ 
    const res = NextResponse.redirect(`${origin}${next}`)
    const supabase = await supabaseServer()

    const { error} = await supabase.auth.exchangeCodeForSession(code)

    if(!error){
      return res
    }

    return NextResponse.redirect(`${origin}/`)
  }
  
}