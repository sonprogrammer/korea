'use client'

import { format } from "date-fns";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ko } from "date-fns/locale";
import { StatsTopRecord } from "@/entities/stats/ui/StatsTopRecord";

interface DailyStatsData {
    date: string;
    count: number;
}

interface DailyStatsLineChartProps {
    data: DailyStatsData[]
    handleNext: () => void
    handlePrev: () => void
    isNextDisabled: boolean
    isPrevDisabled: boolean
}


export function DailyStatsLineChart({ data, handleNext, handlePrev, isNextDisabled, isPrevDisabled }: DailyStatsLineChartProps) {


    return (
        <>
            <ResponsiveContainer width='100%' height={260}>
                <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <XAxis
                        dataKey='date'
                        tick={{ fontSize: 12, fill: "#64748b" }}
                        // axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => format(new Date(v), 'MM.dd')}
                        interval="preserveStartEnd"
                    />
                    <YAxis
                        yAxisId='count'
                        tick={{ fontSize: 12, fill: "#94a3b8" }}
                        tickLine={false}
                        tickFormatter={(v) => (v / 1000).toLocaleString()}
                        allowDecimals={false}
                        width={60}
                    />
                    <Tooltip
                        content={({ active, payload, label }) => {
                            if (active && payload && payload.length && label) {
                                const rawValue = Number(payload[0].value);
                                const formattedValue = `${(rawValue / 1000).toLocaleString(undefined, { minimumFractionDigits: 3 })}명`;
                                const formattedDate = format(new Date(label), 'M월 d일', { locale: ko });
                                const dataName = payload[0].name;

                                return (
                                    <div className="rounded-lg border border-slate-100 bg-white p-2 shadow-md">
                                        <p className="text-xs font-semibold text-slate-700">{formattedDate}</p>
                                        <p className="text-xs text-rose-500 mt-1">
                                            <span className="font-medium">{dataName}: </span>
                                            <span className="font-bold">{formattedValue}</span>
                                        </p>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Bar
                        yAxisId='count'
                        dataKey="count"
                        name="일별 참여 인원"
                        fill="#ef4444"
                        radius={[6, 6, 0, 0]}
                        barSize={18}

                    />
                </BarChart>
            </ResponsiveContainer>

            <div className="flex gap-2 justify-end mt-2">
                <button 
                    onClick={handlePrev} 
                    disabled={isPrevDisabled}
                    className={`flex items-center justify-center px-3 py-1 text-xs rounded-full border ${
                        isPrevDisabled 
                        ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed' 
                        : 'bg-white text-gray-600 border-gray-200 cursor-pointer hover:bg-gray-50'
                    }`}
                >
                    이전
                </button>
                
                <button 
                    onClick={handleNext} 
                    disabled={isNextDisabled} 
                    className={`flex items-center justify-center px-3 py-1 text-xs rounded-full border ${
                        isNextDisabled 
                        ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed' 
                        : 'bg-white text-gray-600 border-gray-200 cursor-pointer hover:bg-gray-50'
                    }`}
                >
                    다음
                </button>
            </div>

            <StatsTopRecord 

            />


        </>
    )
}