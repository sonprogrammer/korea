export async function checkAttendance(lat: number, lng: number) {
  return fetch("/api/attendance", {
    method: "POST",
    body: JSON.stringify({ lat, lng }),
  });
}