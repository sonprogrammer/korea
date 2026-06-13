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
            src="/done.PNG"
            alt="president"
            fill
            className="object-cover"
            priority
          />
        </div>


        <Title level={4} className="mb-2!">
          반국가 세력 척결을 위한 민주화운동
        </Title>
        <Text type="secondary" className="mb-6 block text-sm leading-relaxed!">
          입법, 행정을 넘어서 검창청을 폐지하여 사법권까지 장악했는데 선관위는 왜 해체 못시킬까요? <br />
          우리는 다 알고 있습니다. 지금은 그들이 저희를 개돼지로 보고 있지만<br />
          우리 모두 힘을 합쳐 반국가 세력을 척결을 위해 나서야 합니다. 멸공
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