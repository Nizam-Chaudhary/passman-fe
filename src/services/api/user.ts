import { instance } from "@/lib/api.helper";
import { getToken } from "@/lib/auth";
import {
  CreateMasterKeyPayload,
  LoginResponse,
  LoginUserData,
  RefreshTokenPayload,
  RefreshTokenResponse,
  SignUpUserData,
  VerifyAccountPayload,
  VerifyMasterPasswordApiResponse,
  VerifyMasterPasswordFormData,
} from "@/types/auth";
import { ApiResponse } from "@/types/common";
import { GetUserResponseSchema } from "@/types/user";
import { isAxiosError } from "axios";

export async function signUpUser(payload: SignUpUserData) {
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

export async function refreshToken(payload: RefreshTokenPayload) {
  try {
    return await instance.post<RefreshTokenResponse>(
      "/api/v1/users/refresh-token",
      payload
    );
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error?.response?.data;
    }
    throw { message: "Error refreshing access token!" };
  }
}

export async function getLoggedInUserDetails() {
  try {
    const token = getToken();
    return await instance.get<GetUserResponseSchema>("/api/v1/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error?.response?.data;
    }
    throw { message: "Error logging in!" };
  }
}

export async function verifyUserEmail(payload: VerifyAccountPayload) {
  try {
    return await instance.patch<ApiResponse>("/api/v1/users/verify", payload);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error?.response?.data;
    }
    throw { message: "Error verifying email!" };
  }
}

export async function createMasterKey(payload: CreateMasterKeyPayload) {
  try {
    const token = getToken();
    return await instance.patch<ApiResponse>(
      "/api/v1/users/create-master-key",
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error?.response?.data;
    }
    throw { message: "Error creating master password!" };
  }
}

export async function verifyMasterPassword(
  payload: VerifyMasterPasswordFormData
) {
  try {
    const token = getToken();
    return await instance.post<VerifyMasterPasswordApiResponse>(
      "/api/v1/users/verify-master-password",
      payload,
      { headers: { Authorization: token } }
    );
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error?.response?.data;
    }
    throw { message: "Error verifying master password!" };
  }
}
