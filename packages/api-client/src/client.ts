import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

export interface ApiClientConfig {
  baseURL?: string;
  getToken?: () => string | null;
  getRefreshToken?: () => string | null;
  onTokenRefreshed?: (newToken: string) => void;
  onLogout?: () => void;
}

export function createApiClient(config: ApiClientConfig = {}): AxiosInstance {
  const instance = axios.create({
    baseURL: config.baseURL || "/api/v1",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Attach auth token interceptor
  instance.interceptors.request.use(
    (reqConfig: InternalAxiosRequestConfig) => {
      const token = config.getToken?.();
      if (token && reqConfig.headers) {
        reqConfig.headers.Authorization = `Bearer ${token}`;
      }
      return reqConfig;
    },
    (error) => Promise.reject(error)
  );

  // 401 refresh token handling interceptor
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = config.getRefreshToken?.();
          if (!refreshToken) {
            config.onLogout?.();
            return Promise.reject(error);
          }
          const { data } = await axios.post(`${config.baseURL || "/api/v1"}/auth/refresh`, {
            refreshToken,
          });
          if (data?.accessToken) {
            config.onTokenRefreshed?.(data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return instance(originalRequest);
          }
        } catch (refreshError) {
          config.onLogout?.();
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

export const apiClient = createApiClient();
