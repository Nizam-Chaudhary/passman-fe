import { z } from "zod";
import { ApiResponse } from "./common";

export const loginSchema = z.object({
  email: z.string().email("Please enter valid email"),
  password: z.string().min(10, "Must contain at least 10 characters"),
});

export type LoginResponse = ApiResponse & {
  data: {
    token: string;
    refresh_token: string;
  };
};

export type LoginUserData = z.infer<typeof loginSchema>;
