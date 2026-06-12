'use client'

import { useGetTopRecord } from "@/entities/stats/model/useGetTopRecord";



export function StatsTopRecord() {
    const { data: topRecord, isPending } = useGetTopRecord()

    const displayDate = topRecord?.date || "-";
    const displayCount = topRecord && topRecord.count > 0
        ? `${topRecord.count.toLocaleString()}명`
        : "-";

    if (isPending) {
        return <div className="mt-6 h-21.5 animate-pulse bg-slate-50 rounded-2xl" />;
    }

    return (
        <div className="mt-6 grid grid-cols-2 gap-3 bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex flex-col gap-1 bg-white rounded-xl p-3 shadow-sm">
                <span className="text-[11px] font-semibold text-slate-400 tracking-tight flex items-center gap-1">
                    최고 참여일
                </span>
                <span className="text-[14px] font-bold text-slate-800">
                    {displayDate}
                </span>
            </div>

            <div className="flex flex-col gap-1 bg-rose-50/50 rounded-xl p-3 border border-rose-100/50">
                <span className="text-[11px] font-semibold text-rose-400 tracking-tight flex items-center gap-1">
                    최다 참가 인원
                </span>
                <span className="text-[14px] font-black text-rose-600">
                    {displayCount}
                </span>
            </div>
        </div>
    )
}