import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Please enter valid email"),
    password: z.string().min(10, "Must contain at least 10 characters"),
});

export type LoginUserData = z.infer<typeof loginSchema>;
