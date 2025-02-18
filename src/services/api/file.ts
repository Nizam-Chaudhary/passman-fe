import { instance } from "@/lib/api.helper";
import type { FileUploadResponse } from "@/types/file";
import { isAxiosError } from "axios";

export async function uploadFile(file: FormData) {
  try {
    return (
      await instance.post<FileUploadResponse>("/api/v1/files/upload", file)
    ).data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error?.response?.data;
    }
    throw { message: "Error uploading file" };
  }
}
