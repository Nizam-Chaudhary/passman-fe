import { instance } from "@/lib/api.helper";
import { LoginResponse, LoginUserData, SignUpUserFormData } from "@/types/auth";
import { ApiResponse } from "@/types/common";
import { GetUserResponseSchema } from "@/types/user";
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
