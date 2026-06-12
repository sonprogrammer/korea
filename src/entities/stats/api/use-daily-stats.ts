"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/config/constants";
import { fetchDailyStats } from "./stats-api";

export function useDailyStats(endDate: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.dailyStats, endDate],
    queryFn: () => fetchDailyStats(endDate),
    staleTime: 60_000,
  });
}
