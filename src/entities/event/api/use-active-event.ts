"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/config/constants";
import { fetchActiveEvent } from "./event-api";

export function useActiveEvent() {
  return useQuery({
    queryKey: QUERY_KEYS.activeEvent,
    queryFn: fetchActiveEvent,
    staleTime: 60_000,
  });
}
