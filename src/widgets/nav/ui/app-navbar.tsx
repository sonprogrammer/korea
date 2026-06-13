'use client'

import { BarChartOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { App } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { href: "/", label: "홈", icon: <HomeOutlined /> },
    { href: "/stats", label: "통계", icon: <BarChartOutlined /> },
    { href: "/my-attendance", label: "내 참여 기록", icon: <UserOutlined /> },
];

export function AppNavbar() {
    const pathname = usePathname()
    const { message } = App.useApp()

    const developing = () => {
        message.error({
            key: 'developing',
            content: '빠른 시일내에 개발 완료 하겠습니다.'
        })
    }

    return (
        <div className="sticky bottom-0 z-50 border-t bg-white">
            <nav className="flex h-16">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;

                    const content = (
                        <div
                            className={`flex flex-1 flex-col items-center h-full justify-center gap-1 transition-colors hover:bg-red-100 ${isActive
                                    ? "text-red-500"
                                    : "text-slate-500"
                                }`}
                        >
                            <span className="text-lg">
                                {item.icon}
                            </span>

                            <span className="text-[11px] font-medium">
                                {item.label}
                            </span>
                        </div>
                    )


                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex-1"
                        >
                            {content}
                        </Link>
                    );
                })}
            </nav>
        </div>
    )
}