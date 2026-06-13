"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { App, Spin } from "antd";
import { useAuthStore } from "@/features/auth/model/auth-store";
import { AppLayout } from "@/widgets/app-layout/ui/app-layout";
import { AttendanceHistoryList } from "@/widgets/attendance-list/ui/attendance-history-list";

export function MyAttendancePage() {
  const router = useRouter();
  const { user, isInitialized } = useAuthStore();

  const {message} = App.useApp()
  
  useEffect(() => {
    if (isInitialized && !user) {
      message.error('로그인이 필요한 서비스 입니다.')
      router.replace('/')
    }
  }, [isInitialized, user, router, message]);

  if (!isInitialized || !user) {
    return (
      <AppLayout>
        <div className="flex h-64 items-center justify-center">
          <Spin size="large" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <AttendanceHistoryList />
    </AppLayout>
  );
}
