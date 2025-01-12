import { useQuery } from "@tanstack/react-query";
import { getPasswordById, getPasswords } from "../api/password";

export function usePasswords(search?: string | null) {
    return useQuery({
        queryKey: ["passwords"],
        queryFn: () => getPasswords(search),
    });
}

export function usePasswordById(id: string | null) {
    return useQuery({
        queryKey: ["passwords", { id }],
        queryFn: () => {
            if (!id) return null;
            return getPasswordById(id);
        },
    });
}
