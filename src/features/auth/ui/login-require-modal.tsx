'use client'

import { Button, Modal } from "antd"


interface LoginRequireModalProps {
    isOpen: boolean
    onClose: () => void
    onLogin: () => void
}

export function LoginRequireModal({ isOpen, onClose, onLogin }: LoginRequireModalProps) {
    return (
        <Modal
            title={<h1 className='text-center'>로그인이 필요한 서비스입니다.</h1>}
            open={isOpen}
            onCancel={onClose}
            centered
            className="max-w-100!"
            footer={[
                <div key='buttons' className="flex justify-center gap-2">
                    <Button key='back' onClick={onClose}>
                        취소
                    </Button>
                    <Button key='login' type="primary"
                        onClick={() => onLogin()}
                        className="bg-yellow-400! font-bold! text-neutral-900! shadow-none! hover:bg-[#FDD800]!"
                    >
                        카카오 로그인
                    </Button>
                </div>
            ]}

        >
            <p className="text-center">정확한 집계와 서비스 이용을 위해 로그인이 필요합니다.</p>

        </Modal>
    )
}