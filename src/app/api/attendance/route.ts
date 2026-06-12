import { NextResponse } from "next/server";
import { getSessionFromCookies } from "@/shared/lib/auth/session";
import { createAdminClient } from "@/shared/lib/supabase/admin";
import { isWithinRadius } from "@/shared/lib/haversine";
import type { AttendanceRequest, AttendanceResponse } from "@/shared/types/api";

export async function POST(request: Request) {
  // console.log('request', request)
  try {
    const user = await getSessionFromCookies();

    if (!user) {
      return NextResponse.json(
        { error: "로그인이 필요합니다.", code: "UNAUTHORIZED" },
        { status: 401 },
      );
    }

    const body = (await request.json()) as AttendanceRequest;
    const { eventId, latitude, longitude, accuracy } = body;

    if (!eventId || latitude == null || longitude == null) {
      return NextResponse.json(
        { error: "필수 정보가 누락되었습니다.", code: "INVALID_REQUEST" },
        { status: 400 },
      );
    }

    const supabase = createAdminClient();

    const { data: event, error: eventError } = await supabase
      .from("events")
      .select("*")
      .eq("id", eventId)
      .eq("status", "active")
      .maybeSingle();

    if (eventError || !event) {
      return NextResponse.json(
        { error: "유효하지 않은 운동.", code: "EVENT_NOT_FOUND" },
        { status: 404 },
      );
    }

    const withinRadius = isWithinRadius(
      latitude,
      longitude,
      event.latitude,
      event.longitude,
      event.radius,
    );

    if (!withinRadius) {
      return NextResponse.json(
        {
          error: "운동 위치 반경 내에서만 인증 가능합니다.",
          code: "OUT_OF_RADIUS",
        },
        { status: 400 },
      );
    }

    const { data: attendance, error: insertError } = await supabase
      .from("attendance")
      .insert({
        user_id: user.id,
        event_id: eventId,
        latitude,
        longitude,
        accuracy: accuracy ?? null,
      })
      .select("id")
      .single();

    if (insertError) {
      if (insertError.code === "23505") {
        return NextResponse.json(
          {
            error: "오늘은 이미 인증하셨습니다.",
            code: "ALREADY_CHECKED",
          },
          { status: 409 },
        );
      }
      return NextResponse.json(
        { error: insertError.message, code: "INSERT_FAILED" },
        { status: 500 },
      );
    }

    const response: AttendanceResponse = {
      success: true,
      message: "참여 인증이 완료되었습니다.",
      attendanceId: attendance.id,
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: "참여 인증 처리 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
