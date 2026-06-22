"use client";

import { useMyAttendance } from "@/entities/attendance/api/use-my-attendance";
import Image from "next/image";
import { LoadingOutlined } from "@ant-design/icons";


export function AttendanceHistoryList() {
  const { data, isLoading } = useMyAttendance();

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white/5 border border-white/8 rounded-2xl p-5">
        <h5 className="text-sm font-bold text-white mb-1">내 인증 기록</h5>
        <p className="text-xs text-white/30">GPS 위치 인증을 통과한 참여 인증 기록입니다.</p>
      </div>

      {isLoading ? (
        <div className="flex h-40 justify-center items-center">
          <LoadingOutlined className="text-white/40 text-xl" />
        </div>
      ) : !data?.items.length ? (
        <div className="bg-white/5 border border-white/8 rounded-2xl p-8 flex items-center justify-center">
          <p className="text-sm text-white/30">인증 기록이 없습니다.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {data.items.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 border border-white/8 rounded-2xl p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-bold text-white">{item.eventTitle}</p>
                  <div className="mt-1 flex gap-2">
                    <span className="text-xs text-white/30">{item.date}</span>
                    <span className="text-xs text-white/30">{item.time}</span>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                  <Image src='/korea.png' alt='korea badge' width={50} height={50} className="w-auto h-4 object-contain" />
                  <span className="text-xs font-black text-green-400">인증완료</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
 
  );
}
