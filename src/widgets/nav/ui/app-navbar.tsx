'use client'

import { BarChartOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { href: "/", label: "홈", icon: <HomeOutlined /> },
    { href: "/stats", label: "통계", icon: <BarChartOutlined /> },
    { href: "/my-attendance", label: "내 참여 기록", icon: <UserOutlined /> },
];

export function AppNavbar() {
    const pathname = usePathname()
    //  <Header className="sticky! top-0! z-50! flex! h-auto! flex-col! gap-3! bg-white! px-4! py-3! leading-normal! shadow-sm">
    //   <div className="flex w-full items-center justify-between"></div>
    return (
        <div className="sticky! bottom-0 left-0 right-0! z-50 flex! border-t bg-white shadow-lg justify-center!">
            <nav className=" flex max-w-120 gap-3 px-2 py-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href} className="flex-1">
                            <Button
                                type={isActive ? "primary" : "default"}
                                icon={item.icon}
                                block
                                size="middle"
                                className="text-xs! sm:text-sm!"
                            >
                                {item.label}
                            </Button>
                        </Link>
                    );
                })}
            </nav>
        </div>
    )
}