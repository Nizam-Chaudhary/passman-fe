import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addVault } from "../api/vault";

export function useAddVault() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string }) => addVault(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vaults"],
        exact: true,
      });
    },
  });
}
