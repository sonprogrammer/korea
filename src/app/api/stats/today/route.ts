import { NextResponse } from "next/server";
import { supabaseServer } from "@/shared/lib/supabase/server";
import { getTodayKST } from "@/shared/lib/format";
import type { TodayStatsResponse } from "@/shared/types/api";

export async function GET() {
  try {
    const supabase = await supabaseServer();
    const today = getTodayKST();

    const { data: activeEvent } = await supabase
      .from("events")
      .select("id")
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!activeEvent) {
      const response: TodayStatsResponse = {
        count: 0,
        eventId: null,
      };
      return NextResponse.json(response);
    }

    const { data: dailyStat } = await supabase
      .from("daily_stats")
      .select("count")
      .eq("event_id", activeEvent.id)
      .eq("stat_date", today)
      .maybeSingle();

    const response: TodayStatsResponse = {
      count: dailyStat?.count ?? 0,
      eventId: activeEvent.id,
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: "오늘 인증 현황을 불러오지 못했습니다." },
      { status: 500 },
    );
  }
}
