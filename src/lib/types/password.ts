import { z } from "zod";

export const editPasswordSchema = z
    .object({
        username: z
            .string()
            .transform((val) => (val === "" ? null : val))
            .optional(),
        email: z
            .string()
            .transform((val) => (val === "" ? null : val))
            .optional(),
        password: z.string().min(1, "Password is required"),
        appName: z
            .string()
            .transform((val) => (val === "" ? null : val))
            .optional(),
        baseUrl: z
            .string()
            .transform((val) => (val === "" ? null : val))
            .optional(),
        specificUrl: z
            .string()
            .transform((val) => (val === "" ? null : val))
            .optional(),
        faviconUrl: z
            .string()
            .transform((val) => (val === "" ? null : val))
            .optional(),
        notes: z
            .string()
            .transform((val) => (val === "" ? null : val))
            .optional(),
    })
    .refine((data) => data.username != null || data.email != null, {
        message: "Either username or email must be provided",
        path: ["username"],
    });

export type EditPassword = z.infer<typeof editPasswordSchema>;
