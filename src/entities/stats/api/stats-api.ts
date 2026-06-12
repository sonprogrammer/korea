import { apiFetch } from "@/shared/api/fetcher";
import type {
  DailyStatsResponse,
  TodayStatsResponse,
} from "@/shared/types/api";

export async function fetchTodayStats(): Promise<TodayStatsResponse> {
  return apiFetch<TodayStatsResponse>("/api/stats/today");
}

export async function fetchDailyStats(): Promise<DailyStatsResponse> {
  return apiFetch<DailyStatsResponse>("/api/stats/daily");
}
