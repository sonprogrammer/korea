'use client'

import { useGetCrowedData } from "@/entities/crowd/model/useGetCrowedData";
import { Thermometer, CloudRain, Clock, Users } from 'lucide-react';

const getCongestColor = (lvl: string) => {
    switch (lvl) {
        case '여유': return 'bg-blue-500';
        case '보통': return 'bg-green-500';
        case '붐빔': return 'bg-orange-500';
        case '매우 붐빔': return 'bg-red-500';
        default: return 'bg-gray-500';
    }
};


export function CrowdStatusWidget() {


    //* 실시간 인구수
    const { data, isPending, isError } = useGetCrowedData()

    if (isPending) {
        return <div className="h-48 w-full animate-pulse rounded-3xl bg-gray-100" />
    }

    if (isError || !data?.success || !data.data) {
        return <div className="p-4 text-red-500">데이터를 불러올 수 없습니다.</div>;
    }

    const { areaName, population, weather } = data.data
    const isRainy = ['비', '빗방울', '눈'].some(keyword => weather.news.includes(keyword));
    const WeatherIcon = isRainy ? CloudRain : Thermometer;
    return (
      <div className="bg-white/5 border border-white/8 rounded-3xl p-4 flex flex-col gap-3">
        <div className="flex justify-between items-center">
            <div>
                <h3 className="font-bold text-white">{areaName}</h3>
                <p className="text-[11px] text-white/30 flex items-center gap-1">
                    <Clock size={10} /> {population.time} 업데이트
                </p>
            </div>
            <div className={`px-3 py-1 rounded-full text-white text-xs font-bold ${getCongestColor(population.level)}`}>
                {population.level}
            </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/5 p-3 rounded-2xl flex items-center gap-2">
                <Users className="text-white/30" size={18} />
                <div>
                    <p className="text-[10px] text-white/40">예상 인원</p>
                    <p className="text-sm font-bold text-white">약 {Number(population.max).toLocaleString()}명</p>
                </div>
            </div>
            <div className="bg-sky-500/10 p-3 rounded-2xl flex items-center gap-2">
                <WeatherIcon className={isRainy ? "text-sky-400" : "text-sky-400"} size={18} />
                <div>
                    <p className="text-[10px] text-sky-400/70">현재 기온</p>
                    <p className="text-sm font-bold text-sky-300">{weather.temp}°C</p>
                </div>
            </div>
        </div>

        <div className="text-[11px] text-white/40 bg-white/5 border border-white/5 p-2.5 rounded-xl truncate">
            {weather.uvMsg.split('.')[0]}
        </div>
        <p className="text-[9px] text-white/20 text-center leading-tight">
            * 서울시 API 기준 올림픽공원 내 실시간 추정 인원입니다.
        </p>
    </div>
   
    )
}