import { z } from "zod";

export const signUpUserSchema = z.object({
    userName: z.string().min(3, "Please Enter user name"),
    email: z.string().email("Please enter valid email"),
    password: z
        .string()
        .min(10, "Must contain at least 10 characters")
        .regex(/[A-Z]/, "Must contain at least one capital letter")
        .regex(/[a-z]/, "Must contain at least one lowercase letter")
        .regex(/[0-9]/, "Must contain at least one digit")
        .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
});

export type SignUpUserFormData = z.infer<typeof signUpUserSchema>;

export type MasterKey = {
    iv: string;
    encrypted: string;
};

export type SignUpUserData = z.infer<typeof signUpUserSchema> & {
    masterKey: MasterKey;
    recoveryMasterKey: MasterKey;
};
