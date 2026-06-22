import { getCrowedData } from "@/entities/crowd/api/getCrowedData";
import { useQuery } from "@tanstack/react-query";

export function useGetCrowedData() {
    return useQuery({
        queryKey: ['crowd'],
        queryFn: getCrowedData,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchInterval: 60 * 1000,
        retry: 2
    })
}