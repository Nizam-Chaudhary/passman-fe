import { instance } from "@/lib/api.helper";
import { getToken } from "@/lib/auth";
import { ApiResponse } from "@/types/common";
import { GetUserResponseSchema, UpdateUserBody } from "@/types/user";
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
    throw { message: "Error fetching user details" };
  }
}

export async function updateUser(data: UpdateUserBody) {
  try {
    return await instance.patch<ApiResponse>("/api/v1/users", data);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error?.response?.data;
    }
    throw { message: "Unable to update profile" };
  }
}
