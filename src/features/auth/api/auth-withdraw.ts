import { apiFetch } from "@/shared/api/fetcher";


export const withdraw = async() => {
    return apiFetch('/api/auth/withdraw', {
        method: 'POST'
    })
}