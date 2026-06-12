'use client'

import { BarChartOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { App, Button } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { href: "/", label: "홈", icon: <HomeOutlined /> },
    { href: "/stats", label: "통계", icon: <BarChartOutlined />, disabled: true },
    { href: "/my-attendance", label: "내 참여 기록", icon: <UserOutlined />, disabled: true },
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
        <div className="sticky! bottom-0 left-0 right-0! z-50 flex! border-t bg-white shadow-lg justify-center!">
            <nav className=" flex max-w-120 gap-3 px-2 py-5">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    if (item.disabled) {
                        return (
                            <Button
                                key={item.href}
                                icon={item.icon}
                                block
                                size="middle"
                                type="default"
                                onClick={developing}
                                className="text-xs! sm:text-sm!"
                            >
                                {item.label}
                            </Button>
                        );
                    }

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