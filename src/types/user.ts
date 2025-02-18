import type { FileDetails } from "./file";

export type GetUserResponseSchema = {
  status: "success" | "fail" | "error";
  data: {
    id: number;
    userName: string;
    email: string;
    masterKey: {
      iv: string;
      encrypted: string;
      salt: string;
    };
    recoveryKey: {
      iv: string;
      encrypted: string;
      salt: string;
    };
    createdAt: Date;
    updatedAt: Date;
    file?: FileDetails;
  };
};

export type JwtUserData = {
  id: number;
  userName: string;
  email: string;
  masterKeyCreated: boolean;
  exp: number;
  iat: number;
};

export type UpdateUserBody = {
  userName?: string;
  fileId?: number;
};
