import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { supabaseServer } from "@/shared/lib/supabase/server";
import type { DailyStatsResponse } from "@/shared/types/api";
import { format, subDays } from "date-fns";

dayjs.extend(utc);
dayjs.extend(timezone);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const EndDate = searchParams.get('endDate')


    const now = new Date()
    const kstOffset = 9 * 60 * 60 * 1000
    const todayKST = new Date(now.getTime() + kstOffset)
    const todayStr = format(todayKST, 'yyyy-MM-dd')

    const baseDate = EndDate || format(todayKST, 'yyyy-MM-dd')

    const supabase = await supabaseServer()

    const { data: activeEvent } = await supabase
      .from("events")
      .select("id")
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

      console.log('activeenvetn', activeEvent)
    if (!activeEvent) {
      const response: DailyStatsResponse = {
        items: [],
        totalCumulative: 0,
        hasPrev: false,
        hasNext: false
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

    const { data: prevCheck } = await supabase
      .from("daily_stats")
      .select("stat_date")
      .lt("stat_date", startDate)
      .eq("event_id", activeEvent.id)
      .limit(1)
      .maybeSingle();

    const { data: nextCheck } = await supabase
      .from("daily_stats")
      .select("stat_date")
      .gt("stat_date", endDate)
      .eq("event_id", activeEvent.id)
      .limit(1)
      .maybeSingle();

    //* 7일동안 토탈 누적 
    const statsMap = new Map(stats?.map(s => [s.stat_date, s.count]) || []);

    const items = [];
    let cumulative = 0;
    for (let i = 6; i >= 0; i--) {
      const date = format(subDays(new Date(endDate), i), 'yyyy-MM-dd');
      const count = statsMap.get(date) || 0; // 데이터 없으면 0
      cumulative += count;

      items.push({
        date,
        count,
        cumulative
      });
    }

    const response: DailyStatsResponse = {
      items,
      totalCumulative: cumulative,
      hasPrev: !!prevCheck,
      hasNext: endDate < todayStr,
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: "일별 통계를 불러오지 못했습니다." },
      { status: 500 },
    );
  }
}
