import { z } from "zod";

export type Vault = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
};

export type GetVaultsResponseSchema = {
  status: "success" | "fail" | "error";
  data: Vault[];
};

export const addVaultSchema = z.object({
  name: z.string().min(1, "Please provide vault name"),
});
