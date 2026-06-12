import { NextResponse } from "next/server";
import { getSessionFromCookies } from "@/shared/lib/auth/session";
import { formatDateKST, formatTimeKST } from "@/shared/lib/format";
import { createAdminClient } from "@/shared/lib/supabase/admin";
import type { MyAttendanceResponse } from "@/shared/types/api";

export async function GET() {
  try {
    const user = await getSessionFromCookies();

    if (!user) {
      return NextResponse.json(
        { error: "로그인이 필요합니다.", code: "UNAUTHORIZED" },
        { status: 401 },
      );
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("attendance")
      .select(
        `
        id,
        latitude,
        longitude,
        created_at,
        events ( title )
      `,
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const items = (data ?? []).map((record) => {
      const eventTitle =
        record.events &&
        typeof record.events === "object" &&
        "title" in record.events
          ? (record.events as { title: string }).title
          : "운동";

      return {
        id: record.id,
        date: formatDateKST(record.created_at),
        time: formatTimeKST(record.created_at),
        eventTitle,
        status: "verified" as const,
        latitude: record.latitude,
        longitude: record.longitude,
      };
    });

    const response: MyAttendanceResponse = { items };
    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: "인증 기록을 불러오지 못했습니다." },
      { status: 500 },
    );
  }
}
