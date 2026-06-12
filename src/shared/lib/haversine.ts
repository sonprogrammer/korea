const EARTH_RADIUS_METERS = 6_371_000;

/**
 * Haversine 공식으로 두 GPS 좌표 간 거리(미터)를 계산합니다.
 */
export function calculateDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_METERS * c;
}

export function isWithinRadius(
  userLat: number,
  userLon: number,
  eventLat: number,
  eventLon: number,
  radiusMeters: number,
): boolean {
  return (
    calculateDistanceMeters(userLat, userLon, eventLat, eventLon) <=
    radiusMeters
  );
}
