import { useCallback, useMemo, useState } from 'react';
import { DEFAULT_PAGE_SIZE } from '../utils/pagination';
import { filterByQuery } from '../utils/search';

export interface UseTableStateOptions<T> {
  data: T[];
  pageSize?: number;
  searchFields?: Array<keyof T | ((item: T) => string)>;
}

export function useTableState<T>({
  data,
  pageSize = DEFAULT_PAGE_SIZE,
  searchFields = [],
}: UseTableStateOptions<T>) {
  const [query, setQueryRaw] = useState('');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(pageSize);

  const setQuery = useCallback((value: string) => {
    setQueryRaw(value);
    setPage(1);
  }, []);

  const filtered = useMemo(
    () => (searchFields.length === 0 ? data : filterByQuery(data, query, searchFields)),
    [data, query, searchFields],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / size));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * size;
  const pageItems = filtered.slice(pageStart, pageStart + size);

  return {
    query,
    setQuery,
    page: safePage,
    setPage,
    pageSize: size,
    setPageSize: (next: number) => {
      setSize(next);
      setPage(1);
    },
    totalPages,
    total: filtered.length,
    pageItems,
    pageStart,
  };
}
