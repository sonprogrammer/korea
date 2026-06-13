"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/config/constants";
import { fetchDailyStats } from "./stats-api";
import { useMemo } from "react";
import { getTodayKST } from "@/shared/lib/format";

export function useDailyStats(endDate: string) {
  const safeEndDate = useMemo(() => {
    if (!endDate || endDate.includes("NaN") || endDate === "undefined" || endDate === "null") {
      return getTodayKST();
    }
    return endDate;
  }, [endDate]);
  
  return useQuery({
    queryKey: [...QUERY_KEYS.dailyStats, safeEndDate],
    queryFn: () => fetchDailyStats(safeEndDate),
    staleTime: 60_000,
  });
}
