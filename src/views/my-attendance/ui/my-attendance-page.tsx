"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import { useAuthStore } from "@/features/auth/model/auth-store";
import { AppLayout } from "@/widgets/app-layout/ui/app-layout";
import { AttendanceHistoryList } from "@/widgets/attendance-list/ui/attendance-history-list";

export function MyAttendancePage() {
  const router = useRouter();
  const { user, isInitialized } = useAuthStore();

  useEffect(() => {
    if (isInitialized && !user) {
      router.replace("/?login=required");
    }
  }, [isInitialized, user, router]);

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
