import axios from "axios";
import { NavigateFunction } from "react-router";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BE_BASE_URL,
});

const setRequestInterceptor = (token: string) => {
    instance.interceptors.request.use((config) => {
        config.headers.Authorization = token;
        return config;
    });
};

const setResponseInterceptor = (navigate: NavigateFunction) => {
    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error?.response?.status === 401) {
                navigate("/login", { replace: true });
            }
            return Promise.reject(error);
        }
    );
};

export { instance, setRequestInterceptor, setResponseInterceptor };
