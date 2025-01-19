import { useQuery } from "@tanstack/react-query";
import { getVaults } from "../api/vault";

export function useVaults() {
  return useQuery({
    queryKey: ["vaults"],
    queryFn: async () => (await getVaults()).data.data,
  });
}
