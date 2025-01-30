import {
  getRefreshToken,
  removeRefreshToken,
  removeToken,
  setRefreshToken,
  setToken,
} from "@/lib/auth";
import {
  CreateMasterKeyPayload,
  LoginUserData,
  SignUpUserData,
  VerifyAccountPayload,
  VerifyMasterPasswordFormData,
} from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import {
  createMasterKey,
  loginInUser,
  refreshToken,
  signUpUser,
  verifyMasterPassword,
  verifyUserEmail,
} from "../api/user";

export function useSignUpUser() {
  return useMutation({
    mutationFn: (data: SignUpUserData) => signUpUser(data),
  });
}

export function useLoginUser() {
  return useMutation({
    mutationFn: (data: LoginUserData) => loginInUser(data),
  });
}

export function useVerifyUserEmail() {
  return useMutation({
    mutationFn: (data: VerifyAccountPayload) => verifyUserEmail(data),
  });
}

export function useRefreshToken() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      const token = getRefreshToken();
      if (!token) {
        throw new Error("No refresh token found");
      }
      return await refreshToken({ refreshToken: token });
    },
    onSuccess: (data) => {
      console.log("dataa", data);
      if (!data) return;
      const response = data.data.data;
      setToken(response.token);
      setRefreshToken(response.refreshToken);
    },
    onError: () => {
      removeToken();
      removeRefreshToken();
      navigate("/login", { replace: true });
    },
  });
}

export function useCreateMasterKey() {
  return useMutation({
    mutationFn: (data: CreateMasterKeyPayload) => createMasterKey(data),
  });
}

export function useVerifyMasterPassword() {
  return useMutation({
    mutationFn: (data: VerifyMasterPasswordFormData) =>
      verifyMasterPassword(data),
  });
}
