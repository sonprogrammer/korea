"use client";

import { memo, useCallback } from "react";
import { Button, Card} from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useTodayStats } from "@/entities/stats/api/use-today-stats";
import { formatNumber } from "@/shared/lib/format";
import { format } from "date-fns";
import { ko } from "date-fns/locale"


export const TodayStatsSection = memo(function TodayStatsSection() {
  // * 여기에 오늘 누적, 토탈 누적 이 다 들어있음. todayCount: 0, totalCount: 1521 이런식으로
  const { data, isLoading, isFetching, refetch, dataUpdatedAt } = useTodayStats();
// console.log('data', data)
  const now = new Date()


  const handleRefresh = useCallback(async () => {
    await refetch();
    message.success({
      key: 'refresh',
      content: "최신 집계 현황으로 갱신되었습니다."
    })
  }, [refetch]);

  return (
    <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-medium tracking-widest uppercase text-white/40">
          실시간 인증 현황
        </p>

        {isLoading ? (
          <>
            <div className="mt-2 h-10 w-32 animate-pulse rounded-lg bg-white/10" />
            <div className="mt-2 h-4 w-20 animate-pulse rounded bg-white/10" />
          </>
        ) : (
          <>
            <p className="mt-1 text-4xl font-black tracking-tight text-white">
              {formatNumber(data?.todayCount ?? 0)}
              <span className="ml-1 text-xl font-semibold text-white/50">명</span>
            </p>
            <p className="mt-1 text-xs text-white/30">
              오늘 인증된 참여자 수
            </p>
          </>
        )}
      </div>

      <div className="flex flex-col items-end gap-1">
        <span className="text-xs text-white/30">
          {format(now, 'yyyy년 MM월 dd일(eee)', { locale: ko })}
        </span>
        <span className="text-[11px] text-white/50">
          갱신 {format(dataUpdatedAt, 'HH:mm:ss', { locale: ko })}
        </span>
        <button
          onClick={handleRefresh}
          className="mt-1 w-8 h-8 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/12 transition-colors"
        >
          <ReloadOutlined spin={isFetching} />
        </button>
      </div>
    </div>

    <div className="mt-4 rounded-xl bg-white/4 border border-white/5 px-3 py-2">
      <p className="text-xs leading-relaxed text-white/30">
        실제 인원 수가 아닌 GPS 위치 인증을 통과한 참여 인증 수입니다.
        <br />
        1인당 하루 1회만 인증 가능합니다.
      </p>
    </div>
  </div>

  );
});
