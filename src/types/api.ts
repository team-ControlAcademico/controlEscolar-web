export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  meta?: PaginationMeta;
}

export interface ApiListResponse<T> {
  data: T[];
  meta: PaginationMeta;
  message?: string;
}

export interface ApiErrorPayload {
  message: string;
  code?: string;
  details?: Record<string, string[]>;
  status?: number;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
