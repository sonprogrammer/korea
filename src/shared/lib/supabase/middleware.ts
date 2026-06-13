import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(req: NextRequest) {
  let res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet){
                    cookiesToSet.forEach(({name, value}) => {
                        req.cookies.set(name, value)
                    })

                    res = NextResponse.next({
                        request: {headers: req.headers}
                    })

                    cookiesToSet.forEach(({name, value, options})=>{
                        res.cookies.set(name, value, {
                            ...options,
                            path: '/'
                        })
                    })
                }
      },
    }
  );

  // const { data: { user } } = await supabase.auth.getUser();
  // console.log('user', user)

  // if (!user && req.nextUrl.pathname.startsWith("/my-attendance")) {
  //   const url = req.nextUrl.clone();
  //   url.pathname = "/";
  //   url.searchParams.set("login", "required");
  //   return NextResponse.redirect(url);
  // }

  await supabase.auth.getUser()

  return res;
}