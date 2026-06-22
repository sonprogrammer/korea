'use client'

import { Modal } from "antd"
import { MessageFilled } from "@ant-design/icons"

interface LoginRequireModalProps {
    isOpen: boolean
    onClose: () => void
    onLogin: () => void
}

export function LoginRequireModal({ isOpen, onClose, onLogin }: LoginRequireModalProps) {
    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            centered
            className="max-w-100! [&_.ant-modal-content]:bg-[#111118]! [&_.ant-modal-content]:border! [&_.ant-modal-content]:border-white/8! [&_.ant-modal-content]:rounded-[20px]! [&_.ant-modal-content]:p-0!"
            footer={null}
            closable={false}
            styles={{
                body: { padding: "28px 20px 20px 20px" },
                mask: { backdropFilter: "blur(4px)", background: "rgba(0,0,0,0.6)" },
            }}
        >
            <div className="flex flex-col items-center text-center gap-3">
                <p className="text-base font-bold text-white">로그인이 필요한 서비스입니다.</p>
                <p className="text-sm text-white/40">정확한 집계와 서비스 이용을 위해 로그인이 필요합니다.</p>

                <div className="flex w-full gap-2 mt-2">
                    <button
                        onClick={onClose}
                        className="flex-1 h-11 rounded-xl bg-white/8 border border-white/10 text-sm text-white/50 hover:text-white/80 hover:bg-white/12 transition-colors"
                    >
                        취소
                    </button>
                    <button
                        onClick={onLogin}
                        className="flex-1 h-11 rounded-xl bg-[#FEE500] text-sm font-bold text-neutral-900 hover:bg-[#FDD800] transition-colors flex items-center justify-center gap-1.5"
                    >
                        <MessageFilled className="text-neutral-900 text-base" />
                        카카오 로그인d
                    </button>
                </div>
            </div>
        </Modal>

    )
}