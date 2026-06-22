'use client'

import { MenuOutlined } from "@ant-design/icons"
import { Button, Dropdown, MenuProps } from "antd"


interface UserMenuProps {
  onLogout: () => void
  onWithdraw: () => void
}

export function UserMenu({ onLogout, onWithdraw }: UserMenuProps) {
  const menus: MenuProps['items'] = [
    {
      key: '1',
      label: <span onClick={onLogout}>로그아웃</span>
    },
    {
      key: '2',
      danger: true,
      label: <span onClick={onWithdraw}>회원 탈퇴</span>
    }
  ]


  return (
    <Dropdown
      menu={{ items: menus }}
      trigger={['click']}
      placement="bottomRight"
      className="[&_.ant-dropdown-menu]:bg-[#1a1a24]! [&_.ant-dropdown-menu]:border! [&_.ant-dropdown-menu]:border-white/8! [&_.ant-dropdown-menu]:rounded-xl! [&_.ant-dropdown-menu-item]:text-white/60! [&_.ant-dropdown-menu-item:hover]:bg-white/8! [&_.ant-dropdown-menu-item:hover]:text-white!"
    >
      <button className="w-7 h-7 flex items-center justify-center rounded-full bg-white/8 border border-white/10 text-white/40 hover:text-white/80 hover:bg-white/12 transition-colors">
        <MenuOutlined />
      </button>
    </Dropdown>

  )
}