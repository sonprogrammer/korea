"use client";

import { memo, useCallback } from "react";
import { Button, Card} from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useTodayStats } from "@/entities/stats/api/use-today-stats";
import { formatNumber, formatTodayDate } from "@/shared/lib/format";
// import { Clock } from "@/entities/clock/ui/Clock";
import { format } from "date-fns";
import { ko } from "date-fns/locale"


export const TodayStatsSection = memo(function TodayStatsSection() {
  const { data, isLoading, isFetching, refetch, dataUpdatedAt } = useTodayStats();



  const handleRefresh = useCallback(async () => {
    await refetch();
    message.success({
      key: 'refresh',
      content: "최신 집계 현황으로 갱신되었습니다."
    })
  }, [refetch]);

  return (
    <Card className="overflow-hidden rounded-2xl! border-0! shadow-sm!">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">
            실시간 인증 현황
          </p>

          {isLoading ? (
            <>
              <div className="mt-2 h-10 w-32 animate-pulse rounded-lg bg-slate-200" />
              <div className="mt-2 h-4 w-20 animate-pulse rounded bg-slate-200" />
            </>
          ) : (
            <>
              <p className="mt-1 text-4xl font-black tracking-tight text-blue-600">
                {formatNumber(data?.count ?? 0)}
                <span className="ml-1 text-xl font-semibold">명</span>
              </p>

              <p className="mt-1 text-xs text-slate-500">
                오늘 인증된 참여자 수
              </p>
            </>
          )}
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="text-xs text-slate-400">
            {formatTodayDate()}
          </span>
          <span className="text-[11px] text-slate-700 text-semibold">
            갱신 {format(dataUpdatedAt, 'HH:mm:ss', {locale: ko})}
          </span>

          <Button
            shape="circle"
            icon={<ReloadOutlined spin={isFetching} />}
            onClick={handleRefresh}
          />
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-slate-50 px-3 py-2">
        <p className="text-xs leading-relaxed text-slate-500">
          실제 인원 수가 아닌 GPS 위치 인증을 통과한 참여 인증 수입니다.
          <br />
          1인당 하루 1회만 인증 가능합니다.
        </p>
      </div>
    </Card>
  );
});
