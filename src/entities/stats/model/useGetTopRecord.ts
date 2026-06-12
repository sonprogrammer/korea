import { getTopRecord } from "@/entities/stats/api/getTopRecord";
import { QUERY_KEYS } from "@/shared/config/constants";
import { useQuery } from "@tanstack/react-query";

export function useGetTopRecord() {
    return useQuery({
        queryKey: [...QUERY_KEYS.dailyStats, 'top'],
        queryFn: getTopRecord,
        staleTime: 1000 * 60 * 5
    })
}