import { create } from "zustand";
import { PENDING_ATTENDANCE_KEY } from "@/shared/config/constants";

interface AttendanceState {
  isChecking: boolean;
  pendingCheck: boolean;
  setChecking: (checking: boolean) => void;
  setPendingCheck: (pending: boolean) => void;
  markPendingAttendance: () => void;
  clearPendingAttendance: () => void;
  hasPendingAttendance: () => boolean;
}

export const useAttendanceStore = create<AttendanceState>((set, get) => ({
  isChecking: false,
  pendingCheck: false,

  setChecking: (isChecking) => set({ isChecking }),
  setPendingCheck: (pendingCheck) => set({ pendingCheck }),

  markPendingAttendance: () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(PENDING_ATTENDANCE_KEY, "true");
    }
    set({ pendingCheck: true });
  },

  clearPendingAttendance: () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(PENDING_ATTENDANCE_KEY);
    }
    set({ pendingCheck: false });
  },

  hasPendingAttendance: () => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem(PENDING_ATTENDANCE_KEY) === "true";
    }
    return get().pendingCheck;
  },
}));
