"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/config/constants";
import { fetchDailyStats } from "./stats-api";

export function useDailyStats() {
  return useQuery({
    queryKey: QUERY_KEYS.dailyStats,
    queryFn: fetchDailyStats,
    staleTime: 60_000,
  });
}
