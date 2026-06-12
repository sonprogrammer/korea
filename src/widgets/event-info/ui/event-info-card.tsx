"use client";

import { Card, Descriptions, Spin, Tag, Typography } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import type { Event } from "@/shared/types/database";

const { Title } = Typography;

interface EventInfoCardProps {
  event: Event | null | undefined;
  isLoading?: boolean;
}

export function EventInfoCard({ event, isLoading }: EventInfoCardProps) {
  return (
    <Card
      className="!rounded-2xl !border-0 !shadow-sm"
      styles={{ body: { padding: 20 } }}
    >
      <Spin spinning={isLoading}>
        {event ? (
          <>
            <div className="mb-4 flex items-center gap-2">
              <EnvironmentOutlined className="text-lg text-[#1a56db]" />
              <Title level={5} className="!mb-0">
                정보
              </Title>
              <Tag color="blue">진행 중</Tag>
            </div>
            <Descriptions
              column={1}
              size="small"
              items={[
                { label: "명", children: event.title },
                {
                  label: "위치",
                  children: `${event.latitude.toFixed(4)}, ${event.longitude.toFixed(4)}`,
                },
                {
                  label: "인증 가능 반경",
                  children: `${event.radius.toLocaleString("ko-KR")}m`,
                },
              ]}
            />
          </>
        ) : (
          <div className="py-6 text-center text-gray-400">
            현재 진행 중인 결과가 없습니다.
          </div>
        )}
      </Spin>
    </Card>
  );
}
