import { instance } from "@/lib/api.helper";
import { getToken } from "@/lib/auth";
import {
  CreateMasterKeyPayload,
  LoginResponse,
  LoginUserData,
  RefreshTokenPayload,
  RefreshTokenResponse,
  ResetPasswordPayload,
  SignUpUserData,
  UpdateMasterPasswordPayload,
  VerifyAccountPayload,
  VerifyMasterPasswordApiResponse,
  VerifyMasterPasswordFormData,
} from "@/types/auth";
import { ApiResponse } from "@/types/common";
import { isAxiosError } from "axios";

export async function signUpUser(payload: SignUpUserData) {
  try {
    return await instance.post<ApiResponse>("/api/v1/auth/sign-up", payload);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error?.response?.data;
    }
    throw { message: "Error signing up!" };
  }
}

export async function loginInUser(payload: LoginUserData) {
  try {
    return await instance.post<LoginResponse>("/api/v1/auth/sign-in", payload);
  } catch (error: any) {
    if (isAxiosError(error)) {
      throw error?.response?.data;
    }
    throw error?.response?.data || { message: "Error logging in!" };
  }
}

export async function refreshToken(payload: RefreshTokenPayload) {
  try {
    return await instance.post<RefreshTokenResponse>(
      "/api/v1/auth/refresh-token",
      payload
    );
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error?.response?.data;
    }
    throw { message: "Error refreshing access token!" };
  }
}

export async function verifyUserEmail(payload: VerifyAccountPayload) {
  try {
    return await instance.patch<ApiResponse>("/api/v1/auth/verify", payload);
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
      "/api/v1/auth/create-master-key",
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
      "/api/v1/auth/verify-master-password",
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

export async function resendOTP(payload: { email: string }) {
  try {
    return await instance.post<ApiResponse>("/api/v1/auth/resend-otp", payload);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error?.response?.data;
    }
    throw { message: "Error sending otp!" };
  }
}

export async function sendResetPasswordEmail(payload: { email: string }) {
  try {
    return await instance.post<ApiResponse>(
      "/api/v1/auth/reset-password-mail",
      payload
    );
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error?.response?.data;
    }
    throw { message: "Error sending email!" };
  }
}

export async function resetPassword(payload: ResetPasswordPayload) {
  try {
    return await instance.patch<ApiResponse>(
      "/api/v1/auth/reset-password",
      payload
    );
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error?.response?.data;
    }
    throw { message: "Error updating password!" };
  }
}

export async function updateMasterPasswod(
  payload: UpdateMasterPasswordPayload
) {
  const token = getToken();
  try {
    return await instance.patch<ApiResponse>(
      "/api/v1/auth/master-password",
      payload,
      { headers: { Authorization: token } }
    );
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error?.response?.data;
    }
    throw { message: "Error updating master password!" };
  }
}
