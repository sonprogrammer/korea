import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { createAnonClient } from "@/shared/lib/supabase/server";
import { KOREA_TIMEZONE } from "@/shared/config/constants";
import type { DailyStatsResponse } from "@/shared/types/api";
import { format, subDays } from "date-fns";
import { ko } from "date-fns/locale";

dayjs.extend(utc);
dayjs.extend(timezone);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const EndDate = searchParams.get('endDate')

    const now = new Date()
    const kstOffset = 9 * 60 * 60 * 1000
    const todayKST = new Date(now.getTime() + kstOffset)

    const baseDate = EndDate || format(todayKST, 'yyyy-MM-dd')

    const supabase = createAnonClient();

    const { data: activeEvent } = await supabase
      .from("events")
      .select("id")
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!activeEvent) {
      const response: DailyStatsResponse = {
        items: [],
        totalCumulative: 0,
      };
      return NextResponse.json(response);
    }

    const endDate = baseDate
    const startDate = format(subDays(new Date(baseDate), 6), 'yyyy-MM-dd')

    const { data: stats, error } = await supabase
      .from("daily_stats")
      .select("stat_date, count")
      .gte("stat_date", startDate)
      .lte("stat_date", endDate)
      .eq("event_id", activeEvent.id)
      .order("stat_date", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    //* 7일동안 토탈 누적 
    let cumulative = 0;
    const items = (stats ?? []).map((stat) => {
      cumulative += stat.count;
      return {
        date: stat.stat_date,
        count: stat.count,  //당일 인증수
        cumulative, //오늘까지 누적 인증수
      };
    });

    const response: DailyStatsResponse = {
      items,
      totalCumulative: cumulative,
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: "일별 통계를 불러오지 못했습니다." },
      { status: 500 },
    );
  }
}
