"use client";

import { memo, useCallback } from "react";
import { Button, Card, Spin, Statistic, Typography } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useTodayStats } from "@/entities/stats/api/use-today-stats";
import { formatNumber, formatTodayDate } from "@/shared/lib/format";
import { Clock } from "@/entities/clock/ui/Clock";

const { Text, Title } = Typography;

export const TodayStatsSection = memo(function TodayStatsSection() {
  const { data, isLoading, isFetching, refetch } = useTodayStats();



  const handleRefresh = useCallback(async () => {
    await refetch();
    message.success({
      key: 'refresh',
      content: "최신 집계 현황으로 갱신되었습니다."
    })
  }, [refetch]);

  return (
    <Card
      className={`rounded-2xl! border-0! shadow-sm! ${isFetching ? 'bg-black/30!' : ''}`}
    >
      <div className=" flex items-start justify-between gap-2">
        <div>
          <div className="flex gap-3 items-center">

            <Text type="secondary" className="text-xs!">
              {formatTodayDate()}
            </Text>
            <Text type="secondary" className="text-xs!">
              <Clock />
            </Text>
          </div>
          <Title level={5} className="mb-0! mt-1!">
            실시간 인증 현황
          </Title>
        </div>
        <Button
          type="default"
          icon={<ReloadOutlined spin={isFetching} />}
          onClick={() => handleRefresh()}
          aria-label="새로고침"
          title="새로고침"
        />
      </div>

      <Spin spinning={isLoading}>
        <Statistic
          value={data?.count ?? 0}
          formatter={(value) => `${formatNumber(Number(value))}명`}
          valueStyle={{ fontSize: 36, fontWeight: 700, color: "#1a56db" }}
        />
        <Text type="secondary" className="mt-2! block! text-xs!">
          실제 인원 수가 아닌, GPS 위치 인증을 통과한 참여 인증 수입니다.<br/>
          {'(일 1회만 클릭가능)'}
        </Text>
      </Spin>
    </Card>
  );
});
