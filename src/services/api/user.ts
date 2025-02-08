import { instance } from "@/lib/api.helper";
import { getToken } from "@/lib/auth";
import { GetUserResponseSchema } from "@/types/user";
import { isAxiosError } from "axios";

export async function getLoggedInUserDetails() {
  try {
    const token = getToken();
    return await instance.get<GetUserResponseSchema>("/api/v1/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error?.response?.data;
    }
    throw { message: "Error logging in!" };
  }
}
