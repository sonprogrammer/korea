"use client";

import { AppLayout } from "@/widgets/app-layout/ui/app-layout";
import { DailyStatsChart } from "@/widgets/stats-chart/ui/daily-stats-chart";

export function StatsPage() {
  return (
    <AppLayout>
      <DailyStatsChart />
    </AppLayout>
  );
}
