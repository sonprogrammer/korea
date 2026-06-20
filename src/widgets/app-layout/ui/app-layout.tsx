"use client";

import { Layout } from "antd";
import { AppHeader } from "@/widgets/header/ui/app-header";
import { AppNavbar } from "@/widgets/nav/ui/app-navbar";
import { useState } from "react";
import { WithdrawModal } from "@/features/auth/ui/WithdrawModal";

const { Content, Footer } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false)
  return (
    <div className="h-screen w-full flex justify-center">
      <Layout className="h-full! max-w-120! flex! flex-col!  bg-[#f5f7fa]">
          <AppHeader onOpenWithdraw={() => setIsWithdrawOpen(true)}/>
          <Content className="mx-auto! w-full! flex-1! px-4! py-4! overflow-y-auto! scrollbar-none!">
            {children}
          </Content>
          <AppNavbar />

          {/* //* 이용 약관 같은 거 적어두 기 */}
          {/* <Footer className="bg-transparent!  px-4! py-6! ">
            <p className="text-xs text-gray-400">
              {"본 수치는 GPS 위치 인증을 통과한 사용자의 자발적 참여 인증 수입니다."}
            </p>
          </Footer> */}

          <WithdrawModal 
            isOpen={isWithdrawOpen}
            onClose={() => setIsWithdrawOpen(false)}
          />

      </Layout>
    </div>
  )
}
