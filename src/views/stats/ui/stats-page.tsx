"use client";

import { AppLayout } from "@/widgets/app-layout/ui/app-layout";
import { DailyStatsChart } from "@/widgets/stats-chart/ui/daily-stats-chart";
import { Spin } from "antd";
import dynamic from "next/dynamic";


const DailyStatsChartClient = dynamic(
  () => import("@/widgets/stats-chart/ui/daily-stats-chart").then((mod) => mod.DailyStatsChart), 
  {
    ssr: false, // 뼈대만 서버에서 만들고 알맹이는 폰에서만 그리게 설정!
    loading: () => (
      <div className="flex h-64 items-center justify-center">
        <Spin size="large" />
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
