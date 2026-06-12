export type EventStatus = "active" | "inactive" | "ended";

export interface Profile {
  id: string;
  kakao_id: string;
  nickname: string | null;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
  radius: number;
  status: EventStatus;
  created_at: string;
}

export interface Attendance {
  id: string;
  user_id: string;
  event_id: string;
  latitude: number;
  longitude: number;
  accuracy: number | null;
  created_at: string;
}

export interface DailyStat {
  id: string;
  event_id: string;
  stat_date: string;
  count: number;
}

export interface AttendanceWithEvent extends Attendance {
  events: Pick<Event, "title"> | null;
}
