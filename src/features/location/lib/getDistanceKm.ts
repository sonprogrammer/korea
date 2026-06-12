// * Haversine공식

export function getDistanceKm(from: { lat: number; lng: number; }, to: { lat: number, lng: number }) {
    const R = 6371

    const dLat = ((to.lat - from.lat) * Math.PI) / 180
    const dLng = ((to.lng - from.lng) * Math.PI) / 180

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((from.lat * Math.PI) / 180) *
        Math.cos((to.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}