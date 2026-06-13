import { format, formatISO } from "date-fns";
import { ko } from "date-fns/locale"; 

function getSafeKSTDate(dateInput?: string | Date): Date {
  if (!dateInput) return new Date(new Date().getTime() + 9 * 60 * 60 * 1000);
  
  // 모바일 사파리 방어: 문자열일 경우 하이픈(-)을 슬래시(/)로 치환
  const safeInput = typeof dateInput === "string" ? dateInput.replace(/-/g, "/") : dateInput;
  const date = new Date(safeInput);

  if (isNaN(date.getTime())) {
    return new Date(new Date().getTime() + 9 * 60 * 60 * 1000);
  }
  return date;
}


//  * 1. 오늘 날짜를 "2026년 6월 14일 (일)" 형태로 반환
export function formatTodayDate(): string {
  const kstDate = getSafeKSTDate();
  return format(kstDate, "yyyy년 M월 d일 (eee)", { locale: ko });
}

//  * 2. 숫자에 콤마 찍기 (1,000) - 기존 자바스크립트 함수 유지 (가장 완벽함)
export function formatNumber(num: number): string {
  return (num ?? 0).toLocaleString("ko-KR");
}

//  * 3. ISO 스트링을 KST 기준 "YYYY-MM-DD"로 변환

export function formatDateKST(isoString: string): string {
  const kstDate = getSafeKSTDate(isoString);
  return format(kstDate, "yyyy-MM-dd");
}


//  * 4. ISO 스트링을 KST 기준 "HH:mm:ss"로 변환
export function formatTimeKST(isoString: string): string {
  const kstDate = getSafeKSTDate(isoString);
  return format(kstDate, "HH:mm:ss");
}


//  * 5. 차트용 날짜 변환 "M/D" (예: 6/14) - 모바일 크래시 완벽 방어형
export function formatChartDate(dateStr: string): string {
  // 🔍 1번 감시 카메라
  console.log("📸 [formatChartDate] 입력된 값:", dateStr, typeof dateStr);
  
  if (!dateStr || dateStr === "undefined" || dateStr === "null") return "";
  
  try {
    const kstDate = getSafeKSTDate(dateStr);
    const result = format(kstDate, "M/d");
    
    // 🔍 2번 감시 카메라
    console.log("✅ [formatChartDate] 변환 성공:", result);
    return result;
  } catch (error) {
    console.error("❌ [formatChartDate] 여기서 터짐! 에러:", error);
    return "";
  }
}


//  * 6. 오늘 날짜를 KST 기준 "YYYY-MM-DD"로 반환
export function getTodayKST(): string {
  const kstDate = getSafeKSTDate();
  return format(kstDate, "yyyy-MM-dd");
}