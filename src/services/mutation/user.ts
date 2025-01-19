import { LoginUserData, SignUpUserData } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { loginInUser, signUpUser } from "../api/user";

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
