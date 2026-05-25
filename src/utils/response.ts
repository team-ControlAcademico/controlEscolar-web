import type { AxiosResponse } from 'axios';
import type { ApiListResponse, ApiResponse, PaginationMeta } from '../types/api';

export function unwrap<T>(res: AxiosResponse<ApiResponse<T>>): T {
  return res.data.data;
}

export function unwrapList<T>(res: AxiosResponse<ApiListResponse<T>>): {
  items: T[];
  meta: PaginationMeta;
} {
  return { items: res.data.data, meta: res.data.meta };
}

export function buildMeta(total: number, page: number, pageSize: number): PaginationMeta {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  return { page, pageSize, total, totalPages };
}
