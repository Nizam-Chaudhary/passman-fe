import axios from "axios";
import { TOKEN_KEY } from "./constants";

const instance = () => {
    const api = axios.create({
        baseURL: import.meta.env.VITE_BE_BASE_URL,
    });
    api.interceptors.request.use((config) => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    });

    return api;
};

export { instance };
