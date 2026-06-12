'use client'
import { Map, MapMarker, Circle } from "react-kakao-maps-sdk";
import { getDistanceKm } from "@/features/location/lib/getDistanceKm"
import { useUserLocation } from "@/features/location/model/useUserLocation"
import { TargetCoords } from "@/shared/config/constants"
import { useRef } from "react";
import { EnvironmentOutlined } from "@ant-design/icons";



export function KaKaoMapView() {
  const { location } = useUserLocation()
  const mapRef = useRef<kakao.maps.Map | null>(null)

  if (!location) return <div>위치 로딩중...</div>

  const moveToCurrentLocation = () => {
    if(!mapRef.current) return
    mapRef.current.setCenter(new window.kakao.maps.LatLng(location.lat, location.lng))
  }

  const distance = getDistanceKm(location, TargetCoords)
  const isInZone = distance <= 0.5
  const distanceText =
    distance < 1
      ? `${Math.round(distance * 1000)}m`
      : `${distance.toFixed(2)}km`;

  return (
    <div className="w-full max-w-xl mx-auto overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* //*상단 정보 영역 */}
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <p className="text-xs text-slate-500">잠실 주경기장까지</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            {distanceText}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            반경 <span className="font-semibold text-emerald-600">500m</span> 이내에서 인증할 수 있습니다.
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${isInZone
            ? "bg-emerald-100 text-emerald-700"
            : "bg-red-100 text-red-700"
            }`}
        >
          {isInZone ? "인증 가능 구역" : "인증 구역 밖"}
        </span>

      </div>

      {/* 지도 */}
      <div className="relative">
        <Map
          center={location}
          style={{ width: "100%", height: 380 }}
          level={5}
          onCreate={(map) => {
            mapRef.current = map
          }}
        >
          {/* //* 내위치 */}
          <MapMarker position={location} />
          {/* //* 잠실경기장 */}
          <MapMarker position={TargetCoords} />

          <Circle
            center={TargetCoords}
            radius={500}
            strokeColor="#22c55e"
            strokeWeight={2}
            fillColor="#22c55e"
            fillOpacity={0.15}
          />
        </Map>

        <button
    onClick={moveToCurrentLocation}
    className="absolute bottom-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-105"
  >
    <EnvironmentOutlined className="text-lg text-blue-600" />
  </button>

      </div>

      <div className="px-4 py-3 text-xs text-slate-500">
        GPS 위치는 실시간으로 갱신됩니다. 위치 정확도에 따라 오차가 발생할 수 있습니다.
      </div>
    </div>
  )
}