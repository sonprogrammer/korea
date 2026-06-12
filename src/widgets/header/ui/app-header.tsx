"use client";

import Link from "next/link";
import { Button, Layout, Typography } from "antd";
import { useAuthStore } from "@/features/auth/model/auth-store";

const { Header } = Layout;
const { Text } = Typography;

export function AppHeader() {
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);

  return (
    <Header className="sticky! top-0! z-50! flex! h-auto! flex-col! gap-3! bg-white! px-4! py-3! leading-normal! shadow-sm">
      <div className="flex w-full items-center justify-between">
        <Link href="/">
          <Text
            strong
            className="text-3xl! font-black! bg-linear-to-r! from-red-500! via-white/40! to-blue-500! bg-clip-text! text-transparent!"
          >
            대한민국
          </Text>
        </Link>
        {user ? (
          <div className="flex items-center gap-1">
            <Text type="secondary" className="text-xs!">
              {user.nickname}
            </Text>
            <Button type="link" size="small" onClick={() => void signOut()}>
              로그아웃
            </Button>
          </div>
        ) : null}
      </div>
      
    </Header>
  );
}
