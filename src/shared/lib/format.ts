import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { KOREA_TIMEZONE } from "@/shared/config/constants";

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatTodayDate(): string {
  return dayjs().tz(KOREA_TIMEZONE).format("YYYY년 M월 D일 (ddd)");
}

export function formatNumber(num: number): string {
  return num.toLocaleString("ko-KR");
}

export function formatDateKST(isoString: string): string {
  return dayjs(isoString).tz(KOREA_TIMEZONE).format("YYYY-MM-DD");
}

export function formatTimeKST(isoString: string): string {
  return dayjs(isoString).tz(KOREA_TIMEZONE).format("HH:mm:ss");
}

export function formatChartDate(dateStr: string): string {
  return dayjs(dateStr).format("M/D");
}

export function getTodayKST(): string {
  return dayjs().tz(KOREA_TIMEZONE).format("YYYY-MM-DD");
}
