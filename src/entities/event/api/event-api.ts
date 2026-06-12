import { createClient } from "@/shared/lib/supabase/client";
import type { Event } from "@/shared/types/database";

export async function fetchActiveEvent(): Promise<Event | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
}
