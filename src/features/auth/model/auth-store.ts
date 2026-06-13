import { create } from "zustand";
import { kakaoLogin } from "@/features/auth/api/auth-api";
import type { AuthUser } from "@/shared/types/auth";
import { supabaseClient } from "@/shared/lib/supabase/client";
import { getUser } from "@/entities/user/api/getUser";


interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isInitialized: boolean;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  initialize: () => Promise<void>;
  signInWithKakao: () => Promise<void>
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
      const profile = await getUser()

      if (profile) {
        set({ user: profile, isInitialized: true });
      } else {
        set({ user: null, isInitialized: true });
      }
    } catch {
      set({ user: null, isInitialized: true });
    }
  },

  signInWithKakao: async () => {
    kakaoLogin()
  },

  signOut: async () => {
    const supabase = supabaseClient();
    set({ isLoading: true });
    try {
      await supabase.auth.signOut();
      set({ user: null });
    } catch (error) {
      console.error("로그아웃 실패:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
