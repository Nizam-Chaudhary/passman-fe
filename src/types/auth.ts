import { z } from "zod";
import { ApiResponse, ecryptedValueSchema } from "./common";

export const signUpUserSchema = z.object({
  userName: z.string().min(3, "Please Enter user name"),
  email: z.string().email("Please enter valid email"),
  password: z
    .string()
    .min(8, "Must contain at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one capital letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one digit")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
});

export type SignUpUserData = z.infer<typeof signUpUserSchema>;

export const loginSchema = z.object({
  email: z.string().email("Please enter valid email"),
  password: z.string().min(8, "Must contain at least 8 characters"),
});

export type LoginResponse = ApiResponse & {
  data: {
    token: string;
    refreshToken: string;
    id: number;
    email: string;
    userName: string;
    masterKey: { iv: string; encrypted: string } | null;
    isVerified: boolean;
  };
};

export type RefreshTokenPayload = {
  refreshToken: string;
};

export type RefreshTokenResponse = ApiResponse & {
  data: {
    token: string;
    refreshToken: string;
  };
};

export type LoginUserData = z.infer<typeof loginSchema>;

export const verifyAccountFormSchema = z.object({
  otp: z.string().length(6, "OTP must be exact 6 digits"),
});

export type VerifyAccountFormData = z.infer<typeof verifyAccountFormSchema>;

export type VerifyAccountPayload = {
  email: string;
  otp: string;
};

export const createMasterPasswordFormSchema = z
  .object({
    masterPassword: z
      .string()
      .min(10, "Must contain at least 10 characters")
      .regex(/[A-Z]/, "Must contain at least one capital letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one digit")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    confirmMasterPassword: z.string(),
  })
  .refine((data) => data.masterPassword === data.confirmMasterPassword, {
    message: "Passwords must match",
    path: ["confirmMasterPassword"],
  });

export type CreateMasterPasswordFormData = z.infer<
  typeof createMasterPasswordFormSchema
>;

const masterKeySchema = ecryptedValueSchema.and(
  z.object({
    salt: z.string().min(1, "Satl must be at least 1 character"),
  })
);

export const createMasterKeyRequestBodySchema = z.object({
  masterPassword: z.string().min(1, "Master password is required"),
  masterKey: masterKeySchema,
  recoveryKey: masterKeySchema,
});

export type CreateMasterKeyPayload = z.infer<
  typeof createMasterKeyRequestBodySchema
>;

export const verifyMasterPasswordFormSchema = z.object({
  masterPassword: z.string().min(10, "Must contain at least 10 characters"),
});

export type VerifyMasterPasswordFormData = z.infer<
  typeof verifyMasterPasswordFormSchema
>;

export type VerifyMasterPasswordApiResponse = ApiResponse & {
  data: {
    masterKey: z.infer<typeof masterKeySchema>;
  };
};
