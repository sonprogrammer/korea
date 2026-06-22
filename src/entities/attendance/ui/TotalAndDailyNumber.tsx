import { useTodayStats } from "@/entities/stats/api/use-today-stats";
import { formatNumber } from "@/shared/lib/format";


export function TotalAndDailyNumber() {
    // * 여기에 오늘 누적, 토탈 누적 이 다 들어있음. todayCount: 0, totalCount: 1521 이런식으로
    const { data, isPending } = useTodayStats();
    return (
        <div className="bg-white/5 border border-white/8 rounded-2xl p-5">
            <h5 className="text-sm font-bold text-white mb-4">일별 인증 현황</h5>

            <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/5 px-4 py-3">
                    <p className="text-xs text-white/40">누적 인증 수</p>
                    {isPending ? (
                        <div className="mt-1 h-8 w-20 animate-pulse rounded-lg bg-white/10" />
                    ) : (
                        <p className="mt-1 text-2xl font-black text-white">
                            {formatNumber(data?.totalCount ?? 0)}
                            <span className="ml-1 text-sm font-medium text-white/40">명</span>
                        </p>
                    )}
                </div>

                <div className="rounded-xl bg-white/5 px-4 py-3">
                    <p className="text-xs text-white/40">금일 인증 수</p>
                    {isPending ? (
                        <div className="mt-1 h-8 w-20 animate-pulse rounded-lg bg-white/10" />
                    ) : (
                        <p className="mt-1 text-2xl font-black text-white">
                            {formatNumber(data?.todayCount ?? 0)}
                            <span className="ml-1 text-sm font-medium text-white/40">명</span>
                        </p>
                    )}
                </div>
            </div>
        </div>

    )
}