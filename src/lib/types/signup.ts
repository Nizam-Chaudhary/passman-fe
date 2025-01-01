import { z } from "zod";

export const signUpUserSchema = z.object({
    userName: z.string().min(3, "Please Enter user name"),
    email: z.string().email("Please enter valid email"),
    password: z.string().min(10, "Must contain at least 10 characters"),
});

export type SignUpUserData = z.infer<typeof signUpUserSchema>;
