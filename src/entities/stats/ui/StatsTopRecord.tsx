'use client'

import { useGetTopRecord } from "@/entities/stats/model/useGetTopRecord";



export function StatsTopRecord() {
    const { data: topRecord, isPending } = useGetTopRecord()

    const displayDate = topRecord?.date || "-";
    const displayCount = topRecord && topRecord.count > 0
        ? `${topRecord.count.toLocaleString()}명`
        : "-";

    if (isPending) {
        return <div className="mt-6 h-21 animate-pulse bg-white/5 rounded-2xl" />
    }

    return (
        <div className="mt-6 grid grid-cols-2 gap-3 bg-white/5 rounded-2xl p-4 border border-white/8">
            <div className="flex flex-col gap-1 bg-white/5 rounded-xl p-3">
                <span className="text-[11px] font-semibold text-white/30 tracking-tight">
                    최고 참여일
                </span>
                <span className="text-[14px] font-bold text-white">
                    {displayDate}
                </span>
            </div>

            <div className="flex flex-col gap-1 bg-red-500/10 rounded-xl p-3 border border-red-500/15">
                <span className="text-[11px] font-semibold text-red-400/70 tracking-tight">
                    최다 참가 인원
                </span>
                <span className="text-[14px] font-black text-red-400">
                    {displayCount}
                </span>
            </div>
        </div>

    )
}