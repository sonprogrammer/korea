'use client'

import Script from "next/script";
import { useState } from "react"

const KAKAO_SDK_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services&autoload=false`;


export function KakaoMapProvider({ children }: { children: React.ReactNode }) {
    const [isLoaded, setIsLoaded] = useState(() => {
        if(typeof window !== 'undefined' && window.kakao && window.kakao.maps){
            return true
        }
        return false
    })

    const handleScriptLoad = () => {
        if (window.kakao && window.kakao.maps) {
            window.kakao.maps.load(() => {
                setIsLoaded(true)
            })
        }
    }


    return (
         <>
            <Script
                src={KAKAO_SDK_URL}
                strategy="afterInteractive"
                onLoad={handleScriptLoad}
            />

            {isLoaded ? children :  null}
        </>
    )
}