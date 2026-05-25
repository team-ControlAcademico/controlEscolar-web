import { api } from '../config/api';
import type { ApiListResponse, ApiResponse, PaginationParams } from '../types/api';
import { unwrap, unwrapList } from '../utils/response';

export interface CatalogService<T, TInput = Omit<T, 'id'>> {
  list: (
    params?: PaginationParams,
  ) => Promise<{ items: T[]; meta: import('../types/api').PaginationMeta }>;
  get: (id: string) => Promise<T>;
  create: (payload: TInput) => Promise<T>;
  update: (id: string, payload: Partial<TInput>) => Promise<T>;
  remove: (id: string) => Promise<void>;
}

export function createCatalogService<T, TInput = Omit<T, 'id'>>(
  resource: string,
): CatalogService<T, TInput> {
  return {
    list: async (params) => {
      const res = await api.get<ApiListResponse<T>>(`/${resource}`, { params });
      return unwrapList(res);
    },
    get: async (id) => {
      const res = await api.get<ApiResponse<T>>(`/${resource}/${id}`);
      return unwrap(res);
    },
    create: async (payload) => {
      const res = await api.post<ApiResponse<T>>(`/${resource}`, payload);
      return unwrap(res);
    },
    update: async (id, payload) => {
      const res = await api.put<ApiResponse<T>>(`/${resource}/${id}`, payload);
      return unwrap(res);
    },
    remove: async (id) => {
      await api.delete(`/${resource}/${id}`);
    },
  };
}
