import { useToast } from "@/hooks/use-toast";
import { UpdateUserBody } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../api/user";

export function useUpdateUser() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUserBody) => updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"], exact: true });
      toast({
        title: "Profile updated successfully",
        className: "bg-green-600 text-white",
      });
    },
    onError: () => {
      toast({
        title: "Unable to update profile",
        className: "bg-red-600 text-white",
      });
    },
  });
}
