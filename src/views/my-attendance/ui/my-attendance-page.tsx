"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { App, Spin } from "antd";
import { useAuthStore } from "@/features/auth/model/auth-store";
import { AppLayout } from "@/widgets/app-layout/ui/app-layout";
import { AttendanceHistoryList } from "@/widgets/attendance-list/ui/attendance-history-list";
import { kakaoLogin } from "@/features/auth/api/auth-api";
import { LoginRequireModal } from "@/features/auth/ui/login-require-modal";

export function MyAttendancePage() {
  const router = useRouter();
  const { user, isInitialized } = useAuthStore();
  const [requireLogin, setRequireLogin] = useState(false)

  const {message} = App.useApp()
  
  useEffect(() => {
    if (isInitialized && !user) {
      setRequireLogin(true)
    }
  }, [isInitialized, user, router, message]);

  if (!isInitialized) {
    return (
      <AppLayout>
        <div className="flex h-full items-center justify-center">
          <Spin size="large" />
        </div>
      </AppLayout>
    );
  }


  return (
    <AppLayout>
      <AttendanceHistoryList />
      <LoginRequireModal 
        isOpen={requireLogin}
        onClose={() => {
            setRequireLogin(false)
            router.replace('/')
        }}
        onLogin={kakaoLogin}
      />
    </AppLayout>
  );
}
