import { ApiResponse } from "@/lib/types/common";
import { LoginUserData } from "@/lib/types/login";
import { SignUpUserData } from "@/lib/types/signup";

setGlobalOrigin(import.meta.env.VITE_BE_BASE_URL);
setGlobalDispatcher(agent);

export async function signUpUser(payload: SignUpUserData) {
    const { body, statusCode } = await request(`/api/v1/users/sign-up`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
    const data = (await body.json()) as ApiResponse;
    return { data, statusCode };
}

export async function loginInUser(payload: LoginUserData) {
    const { body, statusCode } = await request(`/api/v1/users/login`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
    const data = (await body.json()) as ApiResponse;
    return { data, statusCode };
}

export async function logoutUser() {
    const { body, statusCode } = await request(`/api/v1/users/logout`);
    const data = (await body.json()) as ApiResponse;
    return { data, statusCode };
}
