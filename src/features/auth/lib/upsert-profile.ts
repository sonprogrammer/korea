import { createAdminClient } from "@/shared/lib/supabase/admin";
import type { AuthUser } from "@/shared/types/auth";
import type { Profile } from "@/shared/types/database";

export async function upsertProfileByKakao(
  kakaoId: string,
  nickname: string,
): Promise<AuthUser> {
  const supabase = createAdminClient();

  const { data: existing } = await supabase
    .from("profiles")
    .select("id, kakao_id, nickname")
    .eq("kakao_id", kakaoId)
    .maybeSingle();

  if (existing) {
    const profile = existing as Pick<Profile, "id" | "kakao_id" | "nickname">;

    if (profile.nickname !== nickname) {
      await supabase
        .from("profiles")
        .update({ nickname })
        .eq("id", profile.id);
    }

    return {
      id: profile.id,
      kakaoId: profile.kakao_id,
      nickname,
    };
  }

  const { data: created, error } = await supabase
    .from("profiles")
    .insert({ kakao_id: kakaoId, nickname })
    .select("id, kakao_id, nickname")
    .single();

  if (error || !created) {
    throw new Error(error?.message ?? "프로필 저장에 실패했습니다.");
  }

  const profile = created as Pick<Profile, "id" | "kakao_id" | "nickname">;

  return {
    id: profile.id,
    kakaoId: profile.kakao_id,
    nickname: profile.nickname ?? nickname,
  };
}
