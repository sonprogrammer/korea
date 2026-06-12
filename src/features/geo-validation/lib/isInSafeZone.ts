export const SAFE_RADIUS = 0.5; // 500m
export const GPS_ERROR = 0.05; // 50m

export function isInSafeZone(distanceKm: number) {
  return distanceKm <= SAFE_RADIUS + GPS_ERROR;
}