"use client";

import Link from "next/link";
import { Button, Layout, Typography } from "antd";
import { useAuthStore } from "@/features/auth/model/auth-store";
import { useMyAttendance } from "@/entities/attendance/api/use-my-attendance";
import Image from 'next/image'
import { JSX } from "react";
import { UserMenu } from "@/widgets/header/UserMenu";
import { kakaoLogin } from "@/features/auth/api/auth-api";

const { Header } = Layout;
const { Text } = Typography;

interface AppHeaderProps {
  onOpenWithdraw: () => void
}

export function AppHeader({ onOpenWithdraw }: AppHeaderProps) {
  const user = useAuthStore((s) => s.user)
  const signOut = useAuthStore((s) => s.signOut)
  const { data } = useMyAttendance();


  const badge: JSX.Element | undefined = data && data.items.length ? <Image src='/korea.png' alt="badge" width={30} height={30} className="w-auto h-4 object-contain" /> : undefined


  return (
    <header className="sticky top-0 z-50 flex h-auto flex-col gap-3 px-4 py-3 bg-[#111118] border-b border-white/6">
      <div className="flex w-full items-center justify-between">
        <Link href="/">
          <span className="uppercase text-2xl font-black bg-linear-to-r from-red-500 via-white to-blue-500 bg-clip-text text-transparent tracking-tight">
            korea
          </span>
        </Link>

        {user ? (
          <div className="flex items-center gap-2">
            {badge}
            <span className="text-xs font-bold text-white/60">
              {user.nickname || "유저"}
            </span>
            <UserMenu
              onLogout={() => void signOut()}
              onWithdraw={onOpenWithdraw}
            />
          </div>
        ) : (
          <button
            onClick={kakaoLogin}
            title="로그인 하고 서비스를 이용하세요"
            className="flex items-center gap-1.5 rounded-full bg-[#FEE500] px-3 py-1.5 text-xs font-bold text-neutral-900 hover:bg-[#FDD800] transition-colors"
          >
            카카오 로그인
          </button>
        )}
      </div>
    </header>
    // <Header className="sticky! top-0! z-50! flex! h-auto! flex-col! gap-3! bg-white! px-4! py-3! leading-normal! shadow-sm">
    //   <div className="flex w-full items-center justify-between">
    //     <Link href="/">
    //       <Text
    //         strong
    //         className="uppercase! text-3xl! font-black! bg-linear-to-r! from-red-500! via-white/40! to-blue-500! bg-clip-text! text-transparent!"
    //       >
    //         korea
    //       </Text>
    //     </Link>
    //     {user ? (
    //       <div className="flex items-center gap-1">
    //         {badge}
    //         <Text type="secondary" className="text-xs! font-bold!">
    //           {user.nickname || "유저"}
    //         </Text>
    //         <UserMenu 
    //           onLogout={() => void signOut()}
    //           onWithdraw={onOpenWithdraw}
    //         />
    //       </div>
    //     ) : 
    //     <Button
    //       type="primary" 
    //       onClick={kakaoLogin}
    //       className="rounded-full! font-bold! bg-yellow-500!"
    //       title='로그인 하고 서비스를 이용하세요'
    //     >
    //       카카오 로그인
    //     </Button>
    //     }
    //   </div>

    // </Header>
  );
}
