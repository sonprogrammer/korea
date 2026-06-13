import { getUser } from "@/entities/user/api/getUser";
import { useQuery } from "@tanstack/react-query";

export function useGetUser() {
    return useQuery({
        queryKey: ['user'],
        queryFn: () => getUser(),
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 20
    })
}