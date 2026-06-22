"use client";

import { AppLayout } from "@/widgets/app-layout/ui/app-layout";
import { LoadingOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";


const DailyStatsChartClient = dynamic(
  () => import("@/widgets/stats-chart/ui/daily-stats-chart").then((mod) => mod.DailyStatsChart),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col h-full items-center justify-center gap-2">
        <LoadingOutlined className="text-white/40 text-xl" />
        <p className="text-sm text-white/30">통계 데이터를 불러오는 중...</p>
      </div>
    ),
  }
);

export function StatsPage() {
  return (
    <AppLayout>
      <DailyStatsChartClient />
    </AppLayout>
  );
}
