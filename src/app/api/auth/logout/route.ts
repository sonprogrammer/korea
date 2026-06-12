import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/shared/lib/auth/session";

export async function POST() {
  const response = NextResponse.json({ success: true });
  clearSessionCookie(response);
  return response;
}
