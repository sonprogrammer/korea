'use client'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
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
          tick={{ fontSize: 12, fill: "rgba(255,255,255,0.3)" }}
          tickLine={false}
          tickFormatter={(v) => v.replace(/\//g, '.')}
          interval="preserveStartEnd"
        />
        <YAxis
          yAxisId='count'
          tick={{ fontSize: 12, fill: "rgba(255,255,255,0.3)" }}
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
              const safeLabel = String(label);
              const [month, day] = safeLabel.split('/')
              const formattedDate = month && day ? `${month}월 ${day}일` : label;
              const dataName = payload[0].name;

              return (
                <div className="rounded-xl border border-white/10 bg-[#1a1a24] p-2.5 shadow-lg">
                  <p className="text-xs font-semibold text-white/60">{formattedDate}</p>
                  <p className="text-xs text-red-400 mt-1">
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
          fill="rgba(239,68,68,0.7)"
          radius={[6, 6, 0, 0]}
          barSize={18}
        />
      </BarChart>
    </ResponsiveContainer>

    <div className="flex gap-2 justify-end mt-2">
      <button
        onClick={handlePrev}
        disabled={isPrevDisabled}
        className={`px-3 py-1 text-xs rounded-full border transition-colors ${isPrevDisabled
          ? 'bg-white/4 text-white/20 border-white/5 cursor-not-allowed'
          : 'bg-white/8 text-white/50 border-white/10 hover:bg-white/12 hover:text-white/80'
        }`}
      >
        이전
      </button>
      <button
        onClick={handleNext}
        disabled={isNextDisabled}
        className={`px-3 py-1 text-xs rounded-full border transition-colors ${isNextDisabled
          ? 'bg-white/4 text-white/20 border-white/5 cursor-not-allowed'
          : 'bg-white/8 text-white/50 border-white/10 hover:bg-white/12 hover:text-white/80'
        }`}
      >
        다음
      </button>
    </div>

    <StatsTopRecord />
  </>
 
    )
}