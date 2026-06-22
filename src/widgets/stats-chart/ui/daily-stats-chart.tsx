"use client";

import { useEffect, useMemo, useState } from "react";
import { useDailyStats } from "@/entities/stats/api/use-daily-stats";
import { formatChartDate, getTodayKST } from "@/shared/lib/format";
import { DailyStatsLineChart } from "@/entities/stats/ui/DailyStatsLineChart";
import { addDays, format, subDays } from "date-fns";
import { TotalAndDailyNumber } from "@/entities/attendance/ui/TotalAndDailyNumber";
import { LoadingOutlined } from "@ant-design/icons";


export function DailyStatsChart() {
  const [isMounted, setIsMounted] = useState(false);
  const now = useMemo(() => {
    return new Date(getTodayKST().replace(/-/g, "/"));
  }, []);

  const [endDate, setEndDate] = useState<Date>(() => {
    return new Date(getTodayKST().replace(/-/g, "/"))
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const formattedEndDate = useMemo(() => {
    try {
      if (!endDate || isNaN(endDate.getTime())) {
        return getTodayKST();
      }
      const res = format(endDate, 'yyyy-MM-dd');
      return res
    } catch (e) {
      return getTodayKST();
    }
  }, [endDate]);

  const { data, isPending } = useDailyStats(formattedEndDate);

  const chartData = useMemo(
    () =>
      (data?.items ?? []).map((item) => ({
        date: formatChartDate(item.date),
        count: Number(item.count) || 0,
        cumulative: Number(item.cumulative) || 0,
      })),
    [data?.items],
  )



  const handlePrev = () => setEndDate(prev => subDays(prev, 7))
  const handleNext = () => setEndDate(prev => {
    const next = addDays(prev, 7)
    return next > now ? now : next
  })

  const isPrevDisabled = useMemo(() => {
    return !data || !data.hasPrev
  }, [data]);

  const isNextDisabled = useMemo(() => {
    return !data || !data.hasNext;

  }, [data])

  if (!isMounted) {
    return (
      <div className="flex flex-col h-full items-center justify-center gap-2">
        <LoadingOutlined className="text-white/40 text-xl" />
        <p className="text-sm text-white/30">통계 데이터를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <TotalAndDailyNumber />

      <div className="bg-white/5 border border-white/8 rounded-2xl p-5">
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-sm font-bold text-white m-0">최근 7일 기록</h5>
          <span className="text-xs text-white/30">(단위: 천 명)</span>
        </div>

        <div className={`transition-opacity ${isPending ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
          {isPending ? (
            <div className="flex h-48 items-center justify-center gap-2 text-white/30 text-sm">
              <LoadingOutlined />
              <p>데이터 불러오는 중...</p>
            </div>
          ) : chartData && chartData.length > 0 ? (
            <DailyStatsLineChart
              data={chartData}
              handleNext={handleNext}
              handlePrev={handlePrev}
              isNextDisabled={isNextDisabled}
              isPrevDisabled={isPrevDisabled}
            />
          ) : (
            <div className="flex h-48 items-center justify-center text-white/30 text-sm">
              기록된 인증 데이터가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
