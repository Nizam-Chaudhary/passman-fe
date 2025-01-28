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
    createdAt: Date;
    updatedAt: Date;
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
