"use client";

import { Card, Empty, List, Spin, Typography } from "antd";
import { useMyAttendance } from "@/entities/attendance/api/use-my-attendance";
import Image from "next/image";

const { Text, Title } = Typography;

export function AttendanceHistoryList() {
  const { data, isLoading } = useMyAttendance();

  return (
    <div className="flex flex-col gap-4">
      <Card className="rounded-2xl! border-0! shadow-sm!" styles={{ body: { padding: 20 } }}>
        <Title level={5} className="mb-1!">
          내 인증 기록
        </Title>
        <Text type="secondary" className="text-xs!">
          GPS 위치 인증을 통과한 참여 인증 기록입니다.
        </Text>
      </Card>

      <Spin spinning={isLoading}>
        {!data?.items.length ? (
          <Card className="rounded-2xl! border-0! shadow-sm!">
            <Empty description="인증 기록이 없습니다." />
          </Card>
        ) : (
          <div className="h-full overflow-y-auto pr-1">
            <List
              dataSource={data.items}
              renderItem={(item) => (
                <Card
                  key={item.id}
                  className="mb-3! rounded-2xl! border-0! shadow-sm!"
                  styles={{ body: { padding: 16 } }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Text strong className="text-base!">
                        {item.eventTitle}
                      </Text>
                      <div className="mt-1">
                        <Text type="secondary" className="text-sm!">
                          {item.date}
                        </Text>
                        <Text type="secondary" className="ml-2! text-sm!">
                          {item.time}
                        </Text>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-green-100 text-green-700 rounded-full border border-green-200 text-sm">
                      <Image src='/korea.png' alt='korea badge' width={50} height={50} className="w-auto h-4 object-contain" />
                      <span className="font-black">인증완료</span>
                    </div>
                  </div>
                </Card>
              )}
            />
          </div>
        )}
      </Spin>
    </div>
  );
}
