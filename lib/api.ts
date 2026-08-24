import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { clearStoredAuth, getStoredAccessToken, getStoredRefreshToken, storeTokens } from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Request Interceptor: Attach Access Token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getStoredAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 & Automatic Refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest?._retry && !originalRequest?.url?.includes("/auth/login") && !originalRequest?.url?.includes("/auth/refresh")) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getStoredRefreshToken();
      if (!refreshToken) {
        clearStoredAuth();
        if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

      try {
        const refreshResponse = await axios.post(`${BASE_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        });

        const tokenData = refreshResponse.data?.data;
        if (tokenData?.access_token) {
          storeTokens(tokenData);
          processQueue(null, tokenData.access_token);
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${tokenData.access_token}`;
          }
          return apiClient(originalRequest);
        } else {
          throw new Error("Invalid token refresh payload");
        }
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        clearStoredAuth();
        if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
          window.location.href = "/login";
        }
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export function parseApiError(error: any): string {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;
    if (responseData?.error?.message) {
      return responseData.error.message;
    }
    if (responseData?.detail) {
      return typeof responseData.detail === "string"
        ? responseData.detail
        : JSON.stringify(responseData.detail);
    }
    if (error.message) {
      return error.message;
    }
  }
  return error?.message || "An unexpected error occurred. Please try again.";
}
