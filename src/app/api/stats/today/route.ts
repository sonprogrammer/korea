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
        todayCount: 0,
        eventId: null,
        totalCount: 0
      };
      return NextResponse.json(response);
    }

    // * 오늘 누적
    const { data: todayStats } = await supabase.rpc('get_today_stats')

    //*전체 누적
    const { data: totalData } = await supabase.rpc('get_total_cumulative_count');

    

    const todayCount = Array.isArray(todayStats) ? todayStats[0].count : todayStats?.count
    const totalCount = totalData ?? 0


    const response: TodayStatsResponse = {
      todayCount: Number(todayCount) ?? 0,
      eventId: activeEvent.id,
      totalCount: Number(totalCount)
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: "오늘 인증 현황을 불러오지 못했습니다." },
      { status: 500 },
    );
  }
}
