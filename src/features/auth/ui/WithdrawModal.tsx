'use client'

import { useWithdraw } from "@/features/auth/model/useWithdraw"
import { Modal } from "antd"

interface WithdrawModalProps {
    isOpen: boolean
    onClose: () => void
}

export function WithdrawModal({ isOpen, onClose }: WithdrawModalProps) {
    const { mutate: withdraw, isPending } = useWithdraw()



    return (
        <Modal
            title={<h1 className="text-center">정말 탈퇴하시겠습니까?</h1>}
            centered
            open={isOpen}
            onOk={() => withdraw()}
            onCancel={onClose}
        >
            {/* //TODO 여기서 ui 이쁘게 수정 */}
            {isPending ?
                <div>
                    <p>탈퇴 처리중...</p>
                </div>
                :
                <div className="text-center text-red-600 font-semibold">
                    <p>귀하의 정보는 즉시 일괄 삭제 처리되어 데이터를 복구할 수 없습니다.</p>
                    <p>정말 탈퇴하시겠습니까?</p>
                </div>
            }
        </Modal>
    )
}