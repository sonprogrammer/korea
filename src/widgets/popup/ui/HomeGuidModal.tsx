'use client'

import { Button, Checkbox, Modal } from "antd"
import Title from "antd/es/typography/Title"
import Text from "antd/es/typography/Text"
import Image from 'next/image'
import { useState } from "react"

interface HomeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HomeGuidModal({ isOpen, onClose }: HomeGuideModalProps) {
    const [dontShowAgain, setDontShowAgain] = useState(false);

    const handleClose = () => {
        if(dontShowAgain){
            localStorage.setItem('hide_home_guide', 'true')
        }
        onClose()
    }

    
  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      centered
      destroyOnHidden
      styles={{ body: { padding: "24px 16px 12px 16px" } }}
      className="max-w-100!"
    >
      <div className="flex flex-col items-center text-center">

        <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl bg-gray-100">
          <Image
            src="/flag.PNG"
            alt="president"
            fill
            className="object-cover"
            priority
          />
        </div>


        <Title level={4} className="mb-2!">
          잠실 자유민주화운동
        </Title>
        <Text type="secondary" className="mb-6 block text-sm leading-relaxed!">
          대한민국의 한 국민으로써 참정권이 박탈당하였습니다.<br />
          대한민국의 국민으로써 기본권리를 행사하기 위해 잠실에 모이신 여러분의 뜻을 모아 국민의 주권을 회복하고 <br />
          앞서 자유 민주주의로 가기 위해 많은 참여 부탁드립니다.
        </Text>

        <div className="mt-2 flex w-full items-center justify-between border-t border-gray-100 pt-4">
          <Checkbox
            checked={dontShowAgain}
            onChange={(e) => setDontShowAgain(e.target.checked)}
          >
            <span className="text-xs text-gray-400">다시 보지 않기</span>
          </Checkbox>
          <Button type="primary" onClick={handleClose} className="rounded-lg!">
            확인
          </Button>
        </div>
      </div>
    </Modal>
  )
}