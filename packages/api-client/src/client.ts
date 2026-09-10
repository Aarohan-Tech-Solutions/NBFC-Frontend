import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import { ApiErrorData, ApiMode } from "@nbfc/shared-types";

export class ApiError extends Error implements ApiErrorData {
  public code: string;
  public status?: number;
  public fieldErrors?: Record<string, string[]>;
  public details?: Record<string, unknown>;

  constructor(payload: Partial<ApiErrorData> & { message: string }) {
    super(payload.message);
    this.name = "ApiError";
    this.code = payload.code || "INTERNAL_ERROR";
    this.status = payload.status || 500;
    this.fieldErrors = payload.fieldErrors;
    this.details = payload.details;
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static fromAxiosError(error: AxiosError<any>): ApiError {
    const status = error.response?.status || 500;
    const responseData = error.response?.data;

    if (responseData && typeof responseData === "object") {
      const errObj = responseData.error || responseData;
      return new ApiError({
        code: errObj.code || `HTTP_${status}`,
        message: errObj.message || error.message || "An unexpected network error occurred",
        status,
        fieldErrors: errObj.fieldErrors,
        details: errObj.details,
      });
    }

    return new ApiError({
      code: error.code || `HTTP_${status}`,
      message: error.message || "Network request failed. Please check your connection.",
      status,
    });
  }

  static isApiError(err: unknown): err is ApiError {
    return err instanceof ApiError;
  }
}

export interface ApiClientConfig {
  baseURL?: string;
  mode?: ApiMode;
  timeout?: number;
  getToken?: () => string | null | undefined;
  getRefreshToken?: () => string | null | undefined;
  onTokenRefreshed?: (newToken: string) => void;
  onLogout?: () => void;
}

export function getEffectiveApiMode(explicitMode?: ApiMode): ApiMode {
  if (explicitMode) return explicitMode;
  try {
    const envMode = (import.meta as any)?.env?.VITE_API_MODE;
    if (envMode === "live") return "live";
  } catch (e) {
    // Non-vite environments (tests/SSR)
  }
  return "mock";
}

export function createApiClient(config: ApiClientConfig = {}): AxiosInstance {
  const baseURL =
    config.baseURL ||
    (typeof import.meta !== "undefined" && (import.meta as any)?.env?.VITE_API_BASE_URL) ||
    "/api/v1";

  const instance = axios.create({
    baseURL,
    timeout: config.timeout || 15000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  // Request interceptor: Attach JWT Bearer Token
  instance.interceptors.request.use(
    (reqConfig: InternalAxiosRequestConfig) => {
      const token = config.getToken?.();
      if (token && reqConfig.headers) {
        reqConfig.headers.Authorization = `Bearer ${token}`;
      }
      return reqConfig;
    },
    (error) => Promise.reject(ApiError.fromAxiosError(error))
  );

  // Response interceptor: Handle 401 Refresh & Standardize Errors
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = config.getRefreshToken?.();
          if (!refreshToken) {
            config.onLogout?.();
            return Promise.reject(ApiError.fromAxiosError(error));
          }

          const { data } = await axios.post(`${baseURL}/auth/refresh`, { refreshToken });
          const newAccessToken = data?.token || data?.accessToken || data?.data?.token;

          if (newAccessToken) {
            config.onTokenRefreshed?.(newAccessToken);
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            }
            return instance(originalRequest);
          }
        } catch (refreshError) {
          config.onLogout?.();
          return Promise.reject(
            refreshError instanceof AxiosError
              ? ApiError.fromAxiosError(refreshError)
              : new ApiError({ code: "SESSION_EXPIRED", message: "Session expired. Please log in again.", status: 401 })
          );
        }
      }

      return Promise.reject(ApiError.fromAxiosError(error));
    }
  );

  return instance;
}

export const apiClient = createApiClient();
