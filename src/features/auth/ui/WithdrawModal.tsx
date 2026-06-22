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
            open={isOpen}
            onCancel={onClose}
            centered
            footer={null}
            closable={false}
            className="[&_.ant-modal-content]:bg-[#111118]! [&_.ant-modal-content]:border! [&_.ant-modal-content]:border-white/8! [&_.ant-modal-content]:rounded-[20px]! [&_.ant-modal-content]:p-0!"
            styles={{
                body: { padding: "28px 20px 20px 20px" },
                mask: { backdropFilter: "blur(4px)", background: "rgba(0,0,0,0.6)" },
            }}
        >
            <div className="flex flex-col items-center text-center gap-3">
                <p className="text-base font-bold text-white">정말 탈퇴하시겠습니까?</p>

                {isPending ? (
                    <p className="text-sm text-white/40">탈퇴 처리중...</p>
                ) : (
                    <p className="text-sm text-red-400/80 leading-relaxed">
                        귀하의 정보는 즉시 일괄 삭제 처리되어 데이터를 복구할 수 없습니다.
                    </p>
                )}

                <div className="flex w-full gap-2 mt-2">
                    <button
                        onClick={onClose}
                        className="flex-1 h-11 rounded-xl bg-white/8 border border-white/10 text-sm text-white/50 hover:text-white/80 hover:bg-white/12 transition-colors"
                    >
                        취소
                    </button>
                    <button
                        onClick={() => withdraw()}
                        disabled={isPending}
                        className="flex-1 h-11 rounded-xl bg-red-500/20 border border-red-500/30 text-sm font-bold text-red-400 hover:bg-red-500/30 transition-colors disabled:opacity-40"
                    >
                        탈퇴하기
                    </button>
                </div>
            </div>
        </Modal>
        // <Modal
        //     title={<h1 className="text-center">정말 탈퇴하시겠습니까?</h1>}
        //     centered
        //     open={isOpen}
        //     onOk={() => withdraw()}
        //     onCancel={onClose}
        // >
        //     {/* //TODO 여기서 ui 이쁘게 수정 */}
        //     {isPending ?
        //         <div>
        //             <p>탈퇴 처리중...</p>
        //         </div>
        //         :
        //         <div className="text-center text-red-600 font-semibold">
        //             <p>귀하의 정보는 즉시 일괄 삭제 처리되어 데이터를 복구할 수 없습니다.</p>
        //             <p>정말 탈퇴하시겠습니까?</p>
        //         </div>
        //     }
        // </Modal>
    )
}