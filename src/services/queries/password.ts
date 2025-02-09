import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPasswordById, getPasswords } from "../api/password";

export function usePasswords(vaultId?: string, search?: string | null) {
  return useQuery({
    queryKey: ["passwords", { vaultId, search }],
    queryFn: () => getPasswords(vaultId, search),
    enabled: !!vaultId,
    placeholderData: keepPreviousData,
  });
}

export function usePasswordById(id: string | null) {
  return useQuery({
    queryKey: ["password", { id }],
    queryFn: () => {
      if (!id) return null;
      return getPasswordById(id);
    },
  });
}
