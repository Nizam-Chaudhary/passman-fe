import { UpdateResourcePayload } from "@/lib/types/common";
import { PasswordPayload, UpdatePasswordPayload } from "@/lib/types/password";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPassowrd, deletePassword, updatePassword } from "../api/password";

export function useAddPassword() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PasswordPayload) => addPassowrd(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["passwords"],
      }),
  });
}

export function useUpdatePassword() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateResourcePayload<UpdatePasswordPayload>) =>
      updatePassword(payload.id, payload.data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["passwords"],
      }),
  });
}

export function useDeletePassword() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePassword(id),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["passwords"],
      }),
  });
}
