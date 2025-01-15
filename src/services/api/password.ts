import { instance } from "@/lib/api.helper";
import {
    GetPasswordById,
    PasswordList,
    PasswordPayload,
    UpdatePasswordPayload,
} from "@/lib/types/password";
import { makeQueryString } from "@/lib/utils";
import { isAxiosError } from "axios";

const axiosInstance = instance();

export async function getPasswords(vaultId?: string, search?: string | null) {
    try {
        const queryString = makeQueryString({
            vaultId,
            search,
        });
        return (
            await axiosInstance.get<PasswordList>(
                `/api/v1/passwords${queryString}`
            )
        ).data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw error?.response?.data;
        }
        throw { message: "Error fetching passwords!" };
    }
}

export async function getPasswordById(id: string) {
    try {
        return (
            await axiosInstance.get<GetPasswordById>(`/api/v1/passwords/${id}`)
        ).data.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw error?.response?.data;
        }
        throw { message: "Error fetching password!" };
    }
}

export async function addPassowrd(password: PasswordPayload) {
    try {
        return (await axiosInstance.post(`/api/v1/passwords`, password)).data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw error?.response?.data;
        }
        throw { message: "Error adding password!" };
    }
}

export async function updatePassword(
    id: string,
    password: UpdatePasswordPayload
) {
    try {
        return (await axiosInstance.put(`/api/v1/passwords/${id}`, password))
            .data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw error?.response?.data;
        }
        throw { message: "Error adding password!" };
    }
}

export async function deletePassword(id: string) {
    try {
        return (await axiosInstance.delete(`/api/v1/passwords/${id}`)).data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw error?.response?.data;
        }
        throw { message: "Error adding password!" };
    }
}
