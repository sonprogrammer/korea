"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/config/constants";
import { fetchTodayStats } from "./stats-api";

export function useTodayStats() {
  return useQuery({
    queryKey: QUERY_KEYS.todayStats,
    queryFn: fetchTodayStats,
    staleTime: 30_000,
  });
}
