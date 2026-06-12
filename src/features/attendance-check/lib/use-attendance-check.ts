"use client";

import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { submitAttendance } from "@/entities/attendance/api/attendance-api";
import { useAttendanceStore } from "@/features/attendance-check/model/attendance-store";
import { useAuthStore } from "@/features/auth/model/auth-store";
import { ApiError } from "@/shared/api/fetcher";
import { QUERY_KEYS } from "@/shared/config/constants";
import { GeolocationError, getCurrentPosition } from "@/shared/lib/geolocation";

export function useAttendanceCheck(eventId: string | undefined) {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);
  const signInWithKakao = useAuthStore((s) => s.signInWithKakao);
  const { isChecking, setChecking, markPendingAttendance, clearPendingAttendance } =
    useAttendanceStore();

  const executeCheck = useCallback(async () => {
    if (!eventId) {
      message.error("현재 진행 중인 집회가 없습니다.");
      return;
    }

    if (!user) {
      markPendingAttendance();
      signInWithKakao("/");
      return;
    }

    setChecking(true);

    try {
      const position = await getCurrentPosition();

      await submitAttendance({
        eventId,
        latitude: position.latitude,
        longitude: position.longitude,
        accuracy: position.accuracy,
      });

      clearPendingAttendance();
      message.success("참여 인증이 완료되었습니다.");
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todayStats });
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myAttendance });
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dailyStats });
    } catch (error) {
      if (error instanceof GeolocationError) {
        if (error.code === "PERMISSION_DENIED") {
          message.error("위치 권한을 허용해주세요.");
        } else {
          message.error(error.message);
        }
        return;
      }

      if (error instanceof ApiError) {
        switch (error.code) {
          case "ALREADY_CHECKED":
            message.warning("오늘은 이미 인증하셨습니다.");
            break;
          case "OUT_OF_RADIUS":
            message.error("집회 위치 반경 내에서만 인증 가능합니다.");
            break;
          default:
            message.error(error.message);
        }
        return;
      }

      message.error("참여 인증 중 오류가 발생했습니다.");
    } finally {
      setChecking(false);
    }
  }, [
    eventId,
    user,
    signInWithKakao,
    markPendingAttendance,
    clearPendingAttendance,
    setChecking,
    queryClient,
  ]);

  return { executeCheck, isChecking };
}
