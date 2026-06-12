import { create } from "zustand";
import { fetchAuthMe, logout } from "@/features/auth/api/auth-api";
import type { AuthUser } from "@/shared/types/auth";

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isInitialized: boolean;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  initialize: () => Promise<void>;
  signInWithKakao: (redirectPath?: string) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isInitialized: false,

  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setInitialized: (isInitialized) => set({ isInitialized }),

  initialize: async () => {
    try {
      const user = await fetchAuthMe();
      set({ user, isInitialized: true });
    } catch {
      set({ user: null, isInitialized: true });
    }
  },

  signInWithKakao: (redirectPath = "/") => {
    set({ isLoading: true });
    const params = new URLSearchParams({ next: redirectPath });
    window.location.href = `/api/auth/kakao?${params.toString()}`;
  },

  signOut: async () => {
    set({ isLoading: true });
    try {
      await logout();
      set({ user: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));
