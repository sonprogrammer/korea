"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, Col, Row, Spin, Typography } from "antd";
import { useDailyStats } from "@/entities/stats/api/use-daily-stats";
import { formatChartDate, formatNumber, getTodayKST } from "@/shared/lib/format";
import { DailyStatsLineChart } from "@/entities/stats/ui/DailyStatsLineChart";
import { addDays, format, subDays } from "date-fns";

const { Title } = Typography;

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
    return res;
  } catch (e) {
    return getTodayKST();
  }
}, [endDate]);

  const { data, isFetching } = useDailyStats(formattedEndDate);

  const chartData = useMemo(
    () =>
      (data?.items ?? []).map((item) => ({
        date: formatChartDate(item.date),
        count: Number(item.count) || 0,
        cumulative: Number(item.cumulative) || 0,
      })),
    [data?.items],
  );



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

  const todayCount =
    data?.items.find((item) => item.date === getTodayKST())?.count ?? 0;

  if (!isMounted || isFetching) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spin size="large" tip="통계 데이터를 불러오는 중..." />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="rounded-2xl! border-0! shadow-sm!" styles={{ body: { padding: 20 } }}>
        <Title level={5} className="mb-1!">
          일별 인증 현황
        </Title>

        <Row gutter={[12, 12]} className="mt-4">
          <Col span={12}>
            <div className="rounded-xl bg-blue-50 px-4 py-3">
              <p className="text-xs text-slate-500">
                최근 7일 누적
              </p>

              <p className="mt-1 text-2xl font-black text-blue-600">
                {formatNumber(data?.totalCumulative ?? 0)}
                <span className="ml-1 text-sm font-medium">
                  명
                </span>
              </p>
            </div>
          </Col>
          <Col span={12}>
            <div className="rounded-xl bg-slate-50 px-4 py-3">
              <p className="text-xs text-slate-500">
                금일 인증 수
              </p>

              <p className="mt-1 text-2xl font-black text-slate-900">
                {formatNumber(todayCount)}
                <span className="ml-1 text-sm font-medium">
                  명
                </span>
              </p>
            </div>
          </Col>
        </Row>
      </Card>

      <Card className="rounded-2xl! border-0! shadow-sm!" styles={{ body: { padding: 20 } }}>
        <div className="flex justify-between items-center mb-4">
          <Title level={5} className="m-0!">최근 7일 기록</Title>
          <span className="text-xs text-slate-400 font-medium">(단위: 천 명)</span>
        </div>

        <div className={`transition-opacity ${isFetching ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>

          {chartData && chartData.length > 0 ? (
            <DailyStatsLineChart
              data={chartData}
              handleNext={handleNext}
              handlePrev={handlePrev}
              isNextDisabled={isNextDisabled}
              isPrevDisabled={isPrevDisabled}
            />
          ) : (
            <div className="flex h-48 items-center justify-center text-slate-400 text-sm">
              인증 기록 데이터를 불러오는 중입니다...
            </div>
          )}
        </div>
      </Card>

    </div >
  );
}
