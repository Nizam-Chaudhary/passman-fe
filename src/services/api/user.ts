import { ApiResponse } from "@/lib/types/common";
import { LoginResponse, LoginUserData } from "@/lib/types/login";
import { SignUpUserFormData } from "@/lib/types/signup";
import axios, { isAxiosError } from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BE_BASE_URL,
});

export async function signUpUser(payload: SignUpUserFormData) {
    try {
        return await instance.post<ApiResponse>(
            "/api/v1/users/sign-up",
            payload
        );
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw error?.response?.data;
        }
        throw { message: "Error signing up!" };
    }
}

export async function loginInUser(payload: LoginUserData) {
    try {
        return await instance.post<LoginResponse>(
            "/api/v1/users/sign-in",
            payload
        );
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw error?.response?.data;
        }
        throw { message: "Error logging in!" };
    }
}
