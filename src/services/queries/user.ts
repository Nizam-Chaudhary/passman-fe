import { useQuery } from "@tanstack/react-query";
import { getLoggedInUserDetails } from "../api/user";

export function useLoggedInUserDetails() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getLoggedInUserDetails,
    retry: false,
  });
}
