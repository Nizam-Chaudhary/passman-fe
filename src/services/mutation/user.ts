import {
    getRefreshToken,
    isTokenExpired,
    removeRefreshToken,
    removeToken,
    setRefreshToken,
    setToken,
} from "@/lib/auth";
import { useStore } from "@/store/store";
import {
    CreateMasterKeyPayload,
    LoginUserData,
    SignUpUserData,
    VerifyAccountPayload,
    VerifyMasterPasswordFormData,
} from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/react/shallow";
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
  const {
    setIsAuthenticated,
    setIsEmailVerified,
    setIsMasterPasswordSet,
    setUserKey,
    setMasterkey,
    setRecoveryKey,
  } = useStore(
    useShallow((state) => ({
      setOpenAddPasswordDialog: state.setOpenAddPasswordDialog,
      setIsAuthenticated: state.setIsAuthenticated,
      setIsEmailVerified: state.setIsEmailVerified,
      setIsMasterPasswordSet: state.setIsMasterPasswordSet,
      setUserKey: state.setUserKey,
      setMasterkey: state.setMasterkey,
      setRecoveryKey: state.setRecoveryKey,
    }))
  );

  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      const token = getRefreshToken();
      if (!token || isTokenExpired(token)) {
        throw new Error("No refresh token found");
      }
      return await refreshToken({ refreshToken: token });
    },
    onSuccess: (data) => {
      if (!data) return;
      const response = data.data.data;
      setToken(response.token);
      setRefreshToken(response.refreshToken);
    },
    onError: () => {
      removeToken();
      removeRefreshToken();
      setIsAuthenticated(false);
      setIsEmailVerified(null);
      setIsMasterPasswordSet(null);
      setUserKey(null);
      setMasterkey(null);
      setRecoveryKey("");
      navigate("/login", { replace: true });
    },
  });
}

export function useCreateMasterKey() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: CreateMasterKeyPayload) => createMasterKey(data),
    onError: (error) => {
      if (error.message === "access token expired") {
        navigate("/login", { replace: true });
      }
    },
  });
}

export function useVerifyMasterPassword() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: VerifyMasterPasswordFormData) =>
      verifyMasterPassword(data),
    onError: (error) => {
      if (error.message === "access token expired") {
        navigate("/login", { replace: true });
      }
    },
  });
}
