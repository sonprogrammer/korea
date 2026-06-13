import { apiFetch } from "@/shared/api/fetcher";
import { getTodayKST } from "@/shared/lib/format";
import type {
  DailyStatsResponse,
  TodayStatsResponse,
} from "@/shared/types/api";

export async function fetchTodayStats(): Promise<TodayStatsResponse> {
  return apiFetch<TodayStatsResponse>("/api/stats/today");
}

export async function fetchDailyStats(endDate: string): Promise<DailyStatsResponse> {
  const finalEndDate = !endDate || endDate.includes("NaN") ? getTodayKST() : endDate;
  return apiFetch<DailyStatsResponse>(`/api/stats/daily?endDate=${finalEndDate}`);
}
