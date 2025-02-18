import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "../api/file";

export const useUploadFileMutation = () => {
  return useMutation({
    mutationFn: (file: FormData) => uploadFile(file),
  });
};
