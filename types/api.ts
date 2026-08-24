export interface SuccessResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  items: T[];
  pagination: PaginationInfo;
}

export interface ErrorDetail {
  code: string;
  message: string;
  details?: Record<string, any> | null;
}

export interface ErrorResponse {
  success: false;
  error: ErrorDetail;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort_by?: string;
  order?: "asc" | "desc";
}
