"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/config/constants";
import { fetchMyAttendance } from "./attendance-api";

export function useMyAttendance(enabled = true) {
  return useQuery({
    queryKey: QUERY_KEYS.myAttendance,
    queryFn: fetchMyAttendance,
    enabled,
    staleTime: 30_000,
  });
}
