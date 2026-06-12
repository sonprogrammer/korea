import { apiFetch } from "@/shared/api/fetcher";
import type {
  AttendanceRequest,
  AttendanceResponse,
  MyAttendanceResponse,
} from "@/shared/types/api";

export async function submitAttendance(
  data: AttendanceRequest,
): Promise<AttendanceResponse> {
  return apiFetch<AttendanceResponse>("/api/attendance", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function fetchMyAttendance(): Promise<MyAttendanceResponse> {
  return apiFetch<MyAttendanceResponse>("/api/my-attendance");
}
