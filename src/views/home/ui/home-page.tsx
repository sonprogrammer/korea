"use client";

import { useEffect, useRef, useState } from "react";
import { useActiveEvent } from "@/entities/event/api/use-active-event";
import { useAttendanceCheck } from "@/features/attendance-check/lib/use-attendance-check";
import { useAttendanceStore } from "@/features/attendance-check/model/attendance-store";
import { useAuthStore } from "@/features/auth/model/auth-store";
import { AppLayout } from "@/widgets/app-layout/ui/app-layout";
import { AttendanceButton } from "@/widgets/attendance-button/ui/attendance-button";
// import { EventInfoCard } from "@/widgets/event-info/ui/event-info-card";
import { TodayStatsSection } from "@/widgets/today-stats/ui/today-stats-section";
import { KaKaoMapView } from "@/widgets/map/ui/KaKaoMapView";
import { KakaoMapProvider } from "@/widgets/map/ui/KakaoMapProvider";
import { HomeGuidModal } from "@/widgets/popup/ui/HomeGuidModal";


export function HomePage() {
  const [popup, setPopup] = useState(false)
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const { data: event, isLoading: eventLoading } = useActiveEvent();
  const { executeCheck, isChecking, user } = useAttendanceCheck(event?.id);
  const hasPendingAttendance = useAttendanceStore((s) => s.hasPendingAttendance);
  const clearPendingAttendance = useAttendanceStore((s) => s.clearPendingAttendance);
  const autoExecutedRef = useRef(false)

  useEffect(() => {
    const isHidden = localStorage.getItem('hide_home_guide')
    if(!isHidden){
      setPopup(true)
    }
  },[])

  useEffect(() => {
    if (!isInitialized || autoExecutedRef.current) return;
    if (!hasPendingAttendance()) return;

    autoExecutedRef.current = true;
    clearPendingAttendance();
    void executeCheck();
  }, [isInitialized, hasPendingAttendance, clearPendingAttendance, executeCheck, user]);

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

      <HomeGuidModal 
        isOpen={popup} 
        onClose={() => setPopup(false)} 
      />
    </AppLayout>
  );
}
