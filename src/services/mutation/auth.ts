import { useToast } from "@/hooks/use-toast";
import {
  getRefreshToken,
  isTokenExpired,
  removeRefreshToken,
  removeToken,
  setRefreshToken,
  setToken,
} from "@/lib/auth";
import { ROUTES } from "@/lib/constants";
import { useStore } from "@/store/store";
import type {
  CreateMasterKeyPayload,
  LoginUserData,
  ResetPasswordPayload,
  SignUpUserData,
  UpdateMasterPasswordPayload,
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
  resendOTP,
  resetPassword,
  sendResetPasswordEmail,
  signUpUser,
  updateMasterPasswod,
  verifyMasterPassword,
  verifyUserEmail,
} from "../api/auth";

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
      navigate(ROUTES.LOGIN, { replace: true });
    },
  });
}

export function useCreateMasterKey() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: CreateMasterKeyPayload) => createMasterKey(data),
    onError: (error) => {
      if (error.message === "Access token expired") {
        navigate(ROUTES.LOGIN, { replace: true });
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
      if (error.message === "Access token expired") {
        navigate(ROUTES.LOGIN, { replace: true });
      }
    },
  });
}

export function useSendResetPasswordEmail() {
  return useMutation({
    mutationFn: (data: { email: string }) => sendResetPasswordEmail(data),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordPayload) => resetPassword(data),
  });
}

export function useResendOTP() {
  const { toast } = useToast();
  const { setTimer } = useStore(
    useShallow((store) => ({
      setTimer: store.setOtpTimer,
    }))
  );
  return useMutation({
    mutationFn: (data: { email: string }) => resendOTP(data),
    onError: () => {
      toast({
        title: "Error sending otp",
        className: "bg-red-600",
      });
      setTimer(120);
    },
    onSuccess: () => {
      toast({
        title: "OTP sent successfully",
        className: "bg-green-600",
      });
      setTimer(120);
    },
  });
}

export function useUpdateMasterPassword() {
  return useMutation({
    mutationFn: (data: UpdateMasterPasswordPayload) =>
      updateMasterPasswod(data),
  });
}
