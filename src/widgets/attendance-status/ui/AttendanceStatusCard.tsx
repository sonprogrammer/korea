'use client'

import { isInSafeZone } from "@/features/geo-validation/lib/isInSafeZone"
import { getDistanceKm } from "@/features/location/lib/getDistanceKm"
import { useUserLocation } from "@/features/location/model/useUserLocation"
import { TargetCoords } from "@/shared/config/constants"

export function AttendanceStatusCard() {
    const { location} = useUserLocation()

    if(!location) return null

    const distance = getDistanceKm(location, TargetCoords)
    const isValid = isInSafeZone(distance)
  return (
    <div>
        <p>거리 : {distance.toFixed(2)}km</p>
        <p>{isValid ? '인증 가능' : '범위 밖'}</p>
    </div>
  )
}