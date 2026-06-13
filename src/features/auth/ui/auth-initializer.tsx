"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/model/auth-store";
import { supabaseClient } from "@/shared/lib/supabase/client";
import { getUser } from "@/entities/user/api/getUser";


export function AuthInitializer() {
  const { setUser, setInitialized, initialize } = useAuthStore();


  useEffect(() => {
    const supabase = supabaseClient();
    void initialize();


    const { data: { subscription } } = supabase.auth.onAuthStateChange(async(event, session) => {
      if (!session?.user) {
        setUser(null);
        setInitialized(true);
        return;
      }
      const fetchProfileData = async () => {
        try {
          
          const profile = await getUser(); 
          
          if (profile) {
            setUser(profile);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error('프로필 로드 중 에러 발생:', error);
          setUser(null);
        } finally {
          setInitialized(true);
        }
      };
      void fetchProfileData()
    });


    return () => {
      subscription.unsubscribe();
    };
  }, [initialize, setUser, setInitialized]);

  return null;
}