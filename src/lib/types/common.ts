export type ApiResponse = {
    status: "success" | "fail" | "error";
    message: string;
};

export type UpdateResourcePayload<T> = {
    id: string;
    data: T;
};
