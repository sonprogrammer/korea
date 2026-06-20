import { getCurrentPosition } from "@/shared/lib/geolocation";
import { useEffect, useState } from "react";

export function useUserLocation() {
    // TODO 현재 내위치임 
    const [location, setLocation] = useState<{
        lat: number
        lng: number
    } | null>
    (null)
//     ({lat: 37.5111,
//   lng: 127.0728})



    const refreshLocation = async() => {
        try {
            const pos = await getCurrentPosition()
            setLocation({lat: pos.latitude, lng: pos.longitude})
            return {success : true}
        } catch (error) {
            console.error('위치 갱신 실패', error)
            return { success: false, error}
        }
    }


    useEffect(() => {
        getCurrentPosition().then(res => {
            setLocation({
                lat:res.latitude,
                lng: res.longitude
            })
        }).catch(console.error);
    }, []);


    return { location, refreshLocation }
    
}