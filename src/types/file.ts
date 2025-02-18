export type FileDetails = {
  id: number;
  url: string;
  fileKey: string;
  createdAt: string;
  updatedAt: string;
};

export type FileUploadResponse = {
  status: "success" | "error" | "fail";
  message: string;
  data: FileDetails;
};
