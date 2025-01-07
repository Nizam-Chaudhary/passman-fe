import { useQuery } from "@tanstack/react-query";
import { getPasswordById, getPasswords } from "../api/password";

export function usePasswords() {
    return useQuery({
        queryKey: ["passwords"],
        queryFn: getPasswords,
    });
}

export function usePasswordById(id: number) {
    return useQuery({
        queryKey: ["passwords", { id }],
        queryFn: () => getPasswordById(id),
    });
}
