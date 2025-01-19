import { instance } from "@/lib/api.helper";
import { ApiResponse } from "@/lib/types/common";
import { LoginResponse, LoginUserData } from "@/lib/types/login";
import { SignUpUserFormData } from "@/lib/types/signup";
import { GetUserResponseSchema } from "@/lib/types/user";
import { isAxiosError } from "axios";

export async function signUpUser(payload: SignUpUserFormData) {
  try {
    return await instance.post<ApiResponse>("/api/v1/users/sign-up", payload);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error?.response?.data;
    }
    throw { message: "Error signing up!" };
  }
}

export async function loginInUser(payload: LoginUserData) {
  try {
    return await instance.post<LoginResponse>("/api/v1/users/sign-in", payload);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error?.response?.data;
    }
    throw { message: "Error logging in!" };
  }
}

export async function getLoggedInUserDetails() {
  try {
    return await instance.get<GetUserResponseSchema>("/api/v1/users");
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error?.response?.data;
    }
    throw { message: "Error logging in!" };
  }
}
