'use server'

import {  CrowdResponse } from "@/entities/crowd/model/types"
import { unstable_cache } from 'next/cache';

const getCrowdData = async ():Promise<CrowdResponse> => {
    
    const url = `http://openapi.seoul.go.kr:8088/${process.env.SEOUL_KEY}/json/citydata/1/5/%EC%98%AC%EB%A6%BC%ED%94%BD%EA%B3%B5%EC%9B%90/`
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        })

        if (!res.ok) {
            throw new Error(`API 요청 실패: ${res.status}`)
        }

        const data = await res.json()

        if (data.RESULT?.['RESULT.CODE'] !== 'INFO-000') {
            throw new Error(`데이터 요청 실패: ${data.RESULT?.['RESULT.MESSAGE']}`);
        }
        const cityData = data.CITYDATA

        if (!cityData) {
            throw new Error('해당 장소의 데이터를 찾을 수 없습니다.');
        }
        return {
            success: true,
            data: {
                areaName: cityData.AREA_NM,
                areaCode: cityData.AREA_CD,
                population: {
                    level: cityData.LIVE_PPLTN_STTS[0].AREA_CONGEST_LVL,
                    message: cityData.LIVE_PPLTN_STTS[0].AREA_CONGEST_MSG,
                    min: cityData.LIVE_PPLTN_STTS[0].AREA_PPLTN_MIN,
                    max: cityData.LIVE_PPLTN_STTS[0].AREA_PPLTN_MAX,
                    time: cityData.LIVE_PPLTN_STTS[0].PPLTN_TIME,
                },
                weather: {
                    temp: cityData.WEATHER_STTS[0].TEMP,
                    max: cityData.WEATHER_STTS[0].MAX_TEMP,
                    min: cityData.WEATHER_STTS[0].MIN_TEMP,
                    news: cityData.WEATHER_STTS[0].PRECPT_TYPE, //강수관련 메세지
                    air: cityData.WEATHER_STTS[0].AIR_IDX,
                    airMsg: cityData.WEATHER_STTS[0].AIR_MSG,
                    uvMsg: cityData.WEATHER_STTS[0].UV_MSG
                }
            }
        }


    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : '알 수 없는 서버 오류가 발생했습니다.'
        };
    }
}
const getCachedCrowdData = unstable_cache(
    getCrowdData,
    ['seoul-crowd-data'],
    { revalidate: 300, tags: ['crowd-data'] }
);

export const getCrowedData = async (): Promise<CrowdResponse> => {
    return await getCachedCrowdData()
}
