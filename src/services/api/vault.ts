import { instance } from "@/lib/api.helper";
import { ApiResponse } from "@/lib/types/common";
import { GetVaultsResponseSchema } from "@/lib/types/vault";
import { isAxiosError } from "axios";

const axiosInstance = instance();

export async function getVaults() {
    try {
        return await axiosInstance.get<GetVaultsResponseSchema>(
            "/api/v1/vaults/"
        );
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw error?.response?.data;
        }
        throw { message: "Error fetching vaults" };
    }
}

export async function addVault(payload: { name: string }) {
    try {
        return await axiosInstance.post<ApiResponse>(
            "/api/v1/vaults/",
            payload
        );
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw error?.response?.data;
        }
        throw { message: "Error fetching vaults" };
    }
}
