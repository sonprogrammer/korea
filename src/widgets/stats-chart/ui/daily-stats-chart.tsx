"use client";

import { useMemo } from "react";
import { Card, Col, Row, Spin, Statistic, Typography } from "antd";
import { Line } from "@ant-design/charts";
import { useDailyStats } from "@/entities/stats/api/use-daily-stats";
import { formatChartDate, formatNumber, getTodayKST } from "@/shared/lib/format";

const { Text, Title } = Typography;

export function DailyStatsChart() {
  const { data, isLoading } = useDailyStats();

  const chartData = useMemo(
    () =>
      (data?.items ?? []).map((item) => ({
        date: formatChartDate(item.date),
        count: item.count,
        cumulative: item.cumulative,
      })),
    [data?.items],
  );

  const config = useMemo(
    () => ({
      data: chartData,
      xField: "date",
      yField: "count",
      smooth: true,
      height: 240,
      color: "#1a56db",
      point: { size: 4, shape: "circle" },
      axis: {
        x: { labelAutoRotate: false },
        y: { labelFormatter: (v: number) => formatNumber(v) },
      },
      tooltip: {
        title: (d: { date: string }) => d.date,
        items: [{ field: "count", name: "인증 수", valueFormatter: (v: number) => `${formatNumber(v)}명` }],
      },
    }),
    [chartData],
  );

  const todayCount =
    data?.items.find((item) => item.date === getTodayKST())?.count ?? 0;

  return (
    <div className="flex flex-col gap-4">
      <Card className="!rounded-2xl !border-0 !shadow-sm" styles={{ body: { padding: 20 } }}>
        <Title level={5} className="!mb-1">
          일별 인증 현황
        </Title>
        {/* <Text type="secondary" className="!text-xs">
          {DISCLAIMER}
        </Text> */}

        <Row gutter={[12, 12]} className="mt-4">
          <Col span={12}>
            <Statistic
              title="최근 7일 누적"
              value={data?.totalCumulative ?? 0}
              suffix="명"
              valueStyle={{ fontSize: 22, color: "#1a56db" }}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="금일 인증 수"
              value={todayCount}
              suffix="명"
              valueStyle={{ fontSize: 22 }}
            />
          </Col>
        </Row>
      </Card>

      <Card className="!rounded-2xl !border-0 !shadow-sm" styles={{ body: { padding: 16 } }}>
        <Title level={5} className="!mb-3">
          최근 7일 추이
        </Title>
        <Spin spinning={isLoading}>
          {chartData.length > 0 ? (
            <Line {...config} />
          ) : (
            <div className="flex h-[240px] items-center justify-center text-gray-400">
              통계 데이터가 없습니다.
            </div>
          )}
        </Spin>
      </Card>

      {data?.items && data.items.length > 0 && (
        <Card className="!rounded-2xl !border-0 !shadow-sm" styles={{ body: { padding: 16 } }}>
          <Title level={5} className="!mb-3">
            일별 상세
          </Title>
          <div className="flex flex-col gap-2">
            {data.items.map((item) => (
              <div
                key={item.date}
                className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
              >
                <Text>{formatChartDate(item.date)}</Text>
                <div className="text-right">
                  <Text strong>{formatNumber(item.count)}명</Text>
                  <Text type="secondary" className="!ml-2 !text-xs">
                    누적 {formatNumber(item.cumulative)}명
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
