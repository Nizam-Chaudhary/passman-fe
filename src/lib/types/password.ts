import { z } from "zod";

export const editPasswordSchema = z
    .object({
        username: z.string().optional(),
        email: z.string().optional(),
        password: z.string().min(1, "Password is required"),
        appName: z.string().optional(),
        baseUrl: z.string().optional(),
        specificUrl: z.string().optional(),
        faviconUrl: z.string().optional(),
        notes: z.string().optional(),
    })
    .refine((data) => data.username != null || data.email != null, {
        message: "Either username or email must be provided",
        path: ["password"],
    });

export type EditPassword = z.infer<typeof editPasswordSchema>;
