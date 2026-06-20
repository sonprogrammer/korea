'use client'

import { MenuOutlined } from "@ant-design/icons"
import { Button, Dropdown, MenuProps } from "antd"


interface UserMenuProps{
    onLogout: () => void
    onWithdraw: () => void
}

export function UserMenu({onLogout, onWithdraw}: UserMenuProps) {
    const menus: MenuProps['items'] = [
        {
            key: '1',
            label: <span onClick={onLogout}>로그아웃</span>
        },
        {
            key:'2',
            danger: true,
            label: <span onClick={onWithdraw}>회원 탈퇴</span>
        }
    ]
    
    
  return (
    <Dropdown menu={{ items: menus}} trigger={['click']} placement="bottomRight">
      <Button type="text" icon={<MenuOutlined />}/>
    </Dropdown>
  )
}