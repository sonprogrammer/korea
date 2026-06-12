import { NextResponse, type NextRequest } from "next/server";
import { getSessionFromRequest } from "@/shared/lib/auth/session";

export async function updateSession(request: NextRequest) {
  const user = await getSessionFromRequest(request);

  if (!user && request.nextUrl.pathname.startsWith("/my-attendance")) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("login", "required");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
