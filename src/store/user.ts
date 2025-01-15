export type GetUserResponseSchema = {
    status: "success" | "fail" | "error";
    data: {
        id: number;
        userName: string;
        email: string;
        masterKey: {
            iv: string;
            encrypted: string;
        };
        createdAt: Date;
        updatedAt: Date;
    };
};
