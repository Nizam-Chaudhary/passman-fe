import axios, { type AxiosRequestConfig } from "axios";
import { getToken } from "./auth";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BE_BASE_URL,
});

type RequestType = {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
  config: AxiosRequestConfig;
};

let isRefreshing = false;
let requestQueue: Array<RequestType> = [];

const addRequestToQueue = (request: RequestType) => {
  requestQueue.push(request);
};

const processQueue = (token: string) => {
  for (const { config, resolve, reject } of requestQueue) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    instance(config)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  }

  requestQueue = [];
};

const setRequestInterceptor = () => {
  instance.interceptors.request.use(
    async (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

const setResponseInterceptor = (
  refreshTokenMutation: { mutate: () => Promise<unknown> }
) => {
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry: boolean;
      };

      if (
        (error.response?.status === 401 || error.response?.status === 403) &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            await refreshTokenMutation.mutate();
            const newToken = getToken();
            if (!newToken) {
              throw new Error("Failed to refresh token");
            }

            // processQueue(newToken);
            // Process the queue with new token
            processQueue(newToken);
            isRefreshing = false;

            // Retry the original request
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            return instance(originalRequest);
          } catch (refreshError) {
            isRefreshing = false;
            requestQueue = [];
            return Promise.reject(refreshError);
          }
        }
        // If refresh is in progress, add request to queue
        return new Promise((resolve, reject) => {
          addRequestToQueue({ config: originalRequest, resolve, reject });
        });
      }
      return Promise.reject(error);
    }
  );
};

export { instance, setRequestInterceptor, setResponseInterceptor };
