"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { message } from "antd";
import { useActiveEvent } from "@/entities/event/api/use-active-event";
import { useAttendanceCheck } from "@/features/attendance-check/lib/use-attendance-check";
import { useAttendanceStore } from "@/features/attendance-check/model/attendance-store";
import { useAuthStore } from "@/features/auth/model/auth-store";
import { AppLayout } from "@/widgets/app-layout/ui/app-layout";
import { AttendanceButton } from "@/widgets/attendance-button/ui/attendance-button";
import { EventInfoCard } from "@/widgets/event-info/ui/event-info-card";
import { TodayStatsSection } from "@/widgets/today-stats/ui/today-stats-section";
import { KaKaoMapView } from "@/widgets/map/ui/KaKaoMapView";
import { KakaoMapProvider } from "@/widgets/map/ui/KakaoMapProvider";

export function HomePage() {
  const searchParams = useSearchParams();
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const { data: event, isLoading: eventLoading } = useActiveEvent();
  const { executeCheck, isChecking } = useAttendanceCheck(event?.id);
  const hasPendingAttendance = useAttendanceStore((s) => s.hasPendingAttendance);
  const clearPendingAttendance = useAttendanceStore((s) => s.clearPendingAttendance);
  const autoExecutedRef = useRef(false)


  useEffect(() => {
    if (searchParams.get("login") === "required") {
      message.warning("로그인이 필요한 페이지입니다.");
    }
  }, [searchParams]);

  useEffect(() => {
    if (!isInitialized || autoExecutedRef.current) return;
    if (!hasPendingAttendance()) return;

    autoExecutedRef.current = true;
    clearPendingAttendance();
    void executeCheck();
  }, [isInitialized, hasPendingAttendance, clearPendingAttendance, executeCheck]);

  return (
    <AppLayout>
      <div className="flex flex-col gap-3">
        <TodayStatsSection />
        <KakaoMapProvider>
          <KaKaoMapView />
        </KakaoMapProvider>
        {/* <EventInfoCard event={event} isLoading={eventLoading} /> */}
      </div>
      <AttendanceButton
        onClick={() => void executeCheck()}
        loading={isChecking}
        disabled={!event}
      />
    </AppLayout>
  );
}
