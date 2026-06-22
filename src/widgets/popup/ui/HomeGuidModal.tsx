'use client'

import { Checkbox, Modal } from "antd"

import Image from 'next/image'
import { useState } from "react"

interface HomeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HomeGuidModal({ isOpen, onClose }: HomeGuideModalProps) {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleClose = () => {
    if (dontShowAgain) {
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
      className="max-w-100! [&_.ant-modal-content]:bg-[#111118]! [&_.ant-modal-content]:border! [&_.ant-modal-content]:border-white/8! [&_.ant-modal-content]:rounded-[20px]! [&_.ant-modal-content]:p-0!"
      styles={{
        body: { padding: "24px 16px 16px 16px" },
        mask: { backdropFilter: "blur(4px)", background: "rgba(0,0,0,0.6)" },
      }}
    >
      <div className="flex flex-col items-center text-center">

        <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl bg-white/5">
          <Image
            src="/flag.PNG"
            alt="president"
            fill
            className="object-cover"
            priority
          />
        </div>

        <h4 className="mb-2 text-base font-bold text-white">
          자유민주화운동
        </h4>
        <p className="mb-6 text-sm leading-relaxed text-white/50">
          대한민국의 한 국민으로써 참정권이 박탈당하였습니다.<br />
          대한민국의 국민으로써 기본권리를 행사하기 위해 올림픽공원에 모이신 여러분의 뜻을 모아 국민의 주권을 회복하고 <br />
          앞서 자유 민주주의로 가기 위해 많은 참여 부탁드립니다.
        </p>

        <div className="flex w-full items-center justify-between border-t border-white/8 pt-4">
          <Checkbox
            checked={dontShowAgain}
            onChange={(e) => setDontShowAgain(e.target.checked)}
            className="[&_.ant-checkbox-inner]:bg-transparent! [&_.ant-checkbox-inner]:border-white/30!"
          >
            <span className="text-xs text-white/30">다시 보지 않기</span>
          </Checkbox>
          <button
            onClick={handleClose}
            className="rounded-lg bg-white px-4 py-1.5 text-sm font-semibold text-[#111118] hover:bg-white/90 transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </Modal>
  )
}