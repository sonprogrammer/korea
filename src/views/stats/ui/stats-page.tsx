"use client";

import { AppLayout } from "@/widgets/app-layout/ui/app-layout";
import { Spin } from "antd";
import dynamic from "next/dynamic";


const DailyStatsChartClient = dynamic(
  () => import("@/widgets/stats-chart/ui/daily-stats-chart").then((mod) => mod.DailyStatsChart), 
  {
    ssr: false,
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
