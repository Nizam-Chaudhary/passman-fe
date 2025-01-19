import { instance } from "@/lib/api.helper";
import { ApiResponse } from "@/types/common";
import { GetVaultsResponseSchema } from "@/types/vault";
import { isAxiosError } from "axios";

export async function getVaults() {
  try {
    return await instance.get<GetVaultsResponseSchema>("/api/v1/vaults/");
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error?.response?.data;
    }
    throw { message: "Error fetching vaults" };
  }
}

export async function addVault(payload: { name: string }) {
  try {
    return await instance.post<ApiResponse>("/api/v1/vaults/", payload);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error?.response?.data;
    }
    throw { message: "Error fetching vaults" };
  }
}
