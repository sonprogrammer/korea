export interface GeolocationResult {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export class GeolocationError extends Error {
  constructor(
    message: string,
    public readonly code: "PERMISSION_DENIED" | "UNAVAILABLE" | "TIMEOUT",
  ) {
    super(message);
    this.name = "GeolocationError";
  }
}

export function getCurrentPosition(): Promise<GeolocationResult> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(
        new GeolocationError(
          "이 브라우저는 위치 서비스를 지원하지 않습니다.",
          "UNAVAILABLE",
        ),
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(
              new GeolocationError(
                "위치 권한을 허용해주세요.",
                "PERMISSION_DENIED",
              ),
            );
            break;
          case error.POSITION_UNAVAILABLE:
            reject(
              new GeolocationError(
                "위치 정보를 가져올 수 없습니다. GPS가 켜져있는지 확인해주세요.",
                "UNAVAILABLE",
              ),
            );
            break;
          case error.TIMEOUT:
            reject(
              new GeolocationError(
                "위치 요청 시간이 초과되었습니다.",
                "TIMEOUT",
              ),
            );
            break;
          default:
            reject(
              new GeolocationError(
                "위치 정보를 가져올 수 없습니다.",
                "UNAVAILABLE",
              ),
            );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15_000,
        maximumAge: 0,
      },
    );
  });
}
