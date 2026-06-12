export interface TodayStatsResponse {
  count: number;
  eventId: string | null;
}

export interface DailyStatItem {
  date: string;
  count: number;
  cumulative: number;
}

export interface DailyStatsResponse {
  items: DailyStatItem[];
  totalCumulative: number;
  period: string;
}

export interface AttendanceRequest {
  eventId: string;
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export interface AttendanceResponse {
  success: boolean;
  message: string;
  attendanceId?: string;
}

export interface MyAttendanceItem {
  id: string;
  date: string;
  time: string;
  eventTitle: string;
  status: "verified";
  latitude: number;
  longitude: number;
}

export interface MyAttendanceResponse {
  items: MyAttendanceItem[];
}

export interface ApiErrorResponse {
  error: string;
  code?: string;
}
