export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  timestamp?: string;
}

export interface PaginatedResponse<T = unknown> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiErrorData {
  code: string;
  message: string;
  status?: number;
  fieldErrors?: Record<string, string[]>;
  details?: Record<string, unknown>;
}

export interface ApiErrorResponse {
  success: false;
  error: ApiErrorData;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PresignedUploadResponse {
  uploadUrl: string;
  fileKey: string;
}

export type ApiMode = "mock" | "live";

