import { NextResponse } from "next/server";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { createAnonClient } from "@/shared/lib/supabase/server";
import { KOREA_TIMEZONE } from "@/shared/config/constants";
import type { DailyStatsResponse } from "@/shared/types/api";

dayjs.extend(utc);
dayjs.extend(timezone);

export async function GET() {
  try {
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
        period: "최근 7일",
      };
      return NextResponse.json(response);
    }

    const endDate = dayjs().tz(KOREA_TIMEZONE).format("YYYY-MM-DD");
    const startDate = dayjs()
      .tz(KOREA_TIMEZONE)
      .subtract(6, "day")
      .format("YYYY-MM-DD");

    const { data: stats, error } = await supabase
      .from("daily_stats")
      .select("stat_date, count")
      .eq("event_id", activeEvent.id)
      .gte("stat_date", startDate)
      .lte("stat_date", endDate)
      .order("stat_date", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    let cumulative = 0;
    const items = (stats ?? []).map((stat) => {
      cumulative += stat.count;
      return {
        date: stat.stat_date,
        count: stat.count,
        cumulative,
      };
    });

    const response: DailyStatsResponse = {
      items,
      totalCumulative: cumulative,
      period: "최근 7일",
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: "일별 통계를 불러오지 못했습니다." },
      { status: 500 },
    );
  }
}
