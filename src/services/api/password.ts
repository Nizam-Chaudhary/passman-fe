import { instance } from "@/lib/api.helper";
import { Password, PasswordList } from "@/lib/types/password";
import { isAxiosError } from "axios";

const axiosInstance = instance();

export async function getPasswords() {
    try {
        return (await axiosInstance.get<PasswordList>("/api/v1/passwords"))
            .data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw error?.response?.data;
        }
        throw { message: "Error fetching passwords!" };
    }
}

export async function getPasswordById(id: number) {
    try {
        return (await axiosInstance.get<Password>(`/api/v1/passwords/${id}`))
            .data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw error?.response?.data;
        }
        throw { message: "Error fetching password!" };
    }
}

// export async function addPassowrd(id: number) {
//     try {
//         return await instance.get<Password>(`/api/v1/passwords/${id}`);
//     } catch (error: unknown) {
//         if (isAxiosError(error)) {
//             throw error?.response?.data;
//         }
//         throw { message: "Error fetching password!" };
//     }
// }
