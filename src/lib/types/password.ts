import { z } from "zod";

export const passwordSchema = z.object({
    site: z.string().min(1, "Site is required"),
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
    note: z
        .string()
        .transform((val) => (val === "" ? null : val))
        .nullable()
        .optional(),
});

export type Password = z.infer<typeof passwordSchema>;

export const passwordPayloadSchema = passwordSchema.extend({
    password: z.object({
        iv: z.string(),
        encrypted: z.string(),
    }),
    vaultId: z.coerce.number().min(0, "vault is required"),
});

export type PasswordPayload = z.infer<typeof passwordPayloadSchema>;

export type GetPassword = {
    id: number;
    site: string;
    username: string;
    password: {
        iv: string;
        encrypted: string;
    };
    faviconUrl?: string;
    note: string;
    createdAt: string;
    updatedAt: string;
};

export type GetPasswordById = {
    status: "success";
    data: GetPassword;
};

export type PasswordList = {
    status: "success";
    data: GetPassword[];
};
