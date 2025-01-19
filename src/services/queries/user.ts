import { useQuery } from "@tanstack/react-query";
import { getLoggedInUserDetails } from "../api/user";

export function useLoggedInUsedDetails() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getLoggedInUserDetails,
  });
}
