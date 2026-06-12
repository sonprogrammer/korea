import { useEffect, useState } from "react";

export function useUserLocation() {
    // TODO 현재 내위치임 
    const [location, setLocation] = useState<{
        lat: number
        lng: number
    } | null>(null)
//     ({lat: 37.5111,
//   lng: 127.0728})

navigator.geolocation.getCurrentPosition(
  console.log,
  console.error
)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            console.log('posi', pos)
            setLocation({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            })
        })
    }, [])
    console.log('location', location)

    return { location }
    
}