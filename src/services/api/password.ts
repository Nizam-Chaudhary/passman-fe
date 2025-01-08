import { Password, PasswordList } from "@/lib/types/password";
import axios, { isAxiosError } from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BE_BASE_URL,
});

export async function getPasswords() {
    try {
        return (await instance.get<PasswordList>("/api/v1/passwords")).data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw error?.response?.data;
        }
        throw { message: "Error fetching passwords!" };
    }
}

export async function getPasswordById(id: number) {
    try {
        return (await instance.get<Password>(`/api/v1/passwords/${id}`)).data;
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
