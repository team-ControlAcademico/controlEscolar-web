import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Card, CardBody, CardHeader } from './Card';
import { Input } from './Input';
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS, clampPage } from '../../utils/pagination';
import { filterByQuery } from '../../utils/search';

export interface DataTableColumn<T> {
  key: string;
  header: ReactNode;
  accessor?: keyof T | ((row: T) => unknown);
  cell?: (row: T, index: number) => ReactNode;
  align?: 'left' | 'right' | 'center';
  className?: string;
  headerClassName?: string;
  searchable?: boolean;
  width?: string;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  rowKey: (row: T) => string;

  title?: string;
  subtitle?: string;
  headerAction?: ReactNode;
  toolbar?: ReactNode;

  searchable?: boolean;
  searchPlaceholder?: string;

  pageSize?: number;
  pageSizeOptions?: number[];

  emptyMessage?: ReactNode;
  loading?: boolean;
  loadingMessage?: ReactNode;

  onRowClick?: (row: T) => void;

  /** Server-side mode flags. When true, the component skips local filtering/paging. */
  serverSide?: boolean;
  total?: number;
  page?: number;
  query?: string;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  onQueryChange?: (query: string) => void;
}

function getCellValue<T>(row: T, column: DataTableColumn<T>, rowIndex: number): ReactNode {
  if (column.cell) return column.cell(row, rowIndex);
  if (column.accessor) {
    const raw =
      typeof column.accessor === 'function'
        ? column.accessor(row)
        : (row[column.accessor] as unknown);
    return raw == null ? '' : String(raw);
  }
  return null;
}

function defaultSearchFields<T>(
  columns: DataTableColumn<T>[],
): Array<keyof T | ((item: T) => string)> {
  const fields: Array<keyof T | ((item: T) => string)> = [];
  for (const col of columns) {
    if (col.searchable === false) continue;
    if (typeof col.accessor === 'function') {
      const fn = col.accessor;
      fields.push((item: T) => {
        const v = fn(item);
        return v == null ? '' : String(v);
      });
    } else if (col.accessor) {
      fields.push(col.accessor);
    }
  }
  return fields;
}

const ALIGN_CLASS: Record<NonNullable<DataTableColumn<unknown>['align']>, string> = {
  left: 'text-left',
  right: 'text-right',
  center: 'text-center',
};

export function DataTable<T>({
  columns,
  data,
  rowKey,
  title,
  subtitle,
  headerAction,
  toolbar,
  searchable = true,
  searchPlaceholder = 'Buscar…',
  pageSize: initialPageSize = DEFAULT_PAGE_SIZE,
  pageSizeOptions = PAGE_SIZE_OPTIONS,
  emptyMessage = 'No se encontraron resultados.',
  loading = false,
  loadingMessage = 'Cargando…',
  onRowClick,
  serverSide = false,
  total: controlledTotal,
  page: controlledPage,
  query: controlledQuery,
  onPageChange,
  onPageSizeChange,
  onQueryChange,
}: DataTableProps<T>) {
  const [localQuery, setLocalQuery] = useState('');
  const [localPage, setLocalPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const query = controlledQuery ?? localQuery;
  const page = controlledPage ?? localPage;

  const searchFields = useMemo(() => defaultSearchFields(columns), [columns]);

  const filtered = useMemo(() => {
    if (serverSide) return data;
    if (!query || searchFields.length === 0) return data;
    return filterByQuery(data, query, searchFields);
  }, [data, query, searchFields, serverSide]);

  const total = serverSide ? (controlledTotal ?? data.length) : filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = clampPage(page, totalPages);
  const pageStart = (safePage - 1) * pageSize;
  const pageItems = serverSide ? data : filtered.slice(pageStart, pageStart + pageSize);

  const handleQueryChange = (next: string) => {
    if (onQueryChange) onQueryChange(next);
    if (!serverSide) {
      setLocalQuery(next);
      setLocalPage(1);
    }
  };

  const handlePageChange = (next: number) => {
    const clamped = clampPage(next, totalPages);
    if (onPageChange) onPageChange(clamped);
    if (!serverSide) setLocalPage(clamped);
  };

  const handlePageSizeChange = (next: number) => {
    setPageSize(next);
    if (onPageSizeChange) onPageSizeChange(next);
    if (!serverSide) setLocalPage(1);
  };

  const showFrom = total === 0 ? 0 : pageStart + 1;
  const showTo = total === 0 ? 0 : Math.min(pageStart + pageItems.length, total);

  return (
    <Card>
      {title || headerAction ? (
        <CardHeader title={title ?? ''} subtitle={subtitle} action={headerAction} />
      ) : null}
      <CardBody className="!pt-4">
        {(searchable || toolbar) && (
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {searchable ? (
              <div className="sm:w-72">
                <Input
                  name="datatable-search"
                  placeholder={searchPlaceholder}
                  value={query}
                  onChange={(e) => handleQueryChange(e.target.value)}
                  leftIcon={<Search className="h-4 w-4" />}
                />
              </div>
            ) : (
              <div />
            )}
            {toolbar ? <div className="flex flex-wrap gap-2">{toolbar}</div> : null}
          </div>
        )}

        <div className="-mx-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y border-neutral-100 bg-neutral-50/60 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    style={col.width ? { width: col.width } : undefined}
                    className={`px-4 py-4 first:pl-7 last:pr-7 ${
                      ALIGN_CLASS[col.align ?? 'left']
                    } ${col.headerClassName ?? ''}`}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-7 py-12 text-center text-sm text-neutral-500"
                  >
                    {loadingMessage}
                  </td>
                </tr>
              ) : pageItems.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-7 py-12 text-center text-sm text-neutral-500"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                pageItems.map((row, idx) => (
                  <tr
                    key={rowKey(row)}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    className={`transition-colors hover:bg-neutral-50 ${
                      onRowClick ? 'cursor-pointer' : ''
                    }`}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`px-4 py-4 first:pl-7 last:pr-7 align-middle text-[15px] text-neutral-700 ${
                          ALIGN_CLASS[col.align ?? 'left']
                        } ${col.className ?? ''}`}
                      >
                        {getCellValue(row, col, idx)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-col gap-3 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <p>
              Mostrando {showFrom}–{showTo} de {total}
            </p>
            <label className="flex items-center gap-1.5">
              <span className="sr-only">Filas por página</span>
              <select
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="rounded-md border border-neutral-200 bg-white px-2 py-1 text-xs font-medium text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-100"
              >
                {pageSizeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt} / pág.
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handlePageChange(safePage - 1)}
              disabled={safePage === 1}
              className="rounded-md border border-neutral-200 bg-white p-1.5 text-neutral-600 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Página anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="rounded-md bg-neutral-100 px-3 py-1.5 font-semibold text-neutral-700">
              {safePage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => handlePageChange(safePage + 1)}
              disabled={safePage === totalPages}
              className="rounded-md border border-neutral-200 bg-white p-1.5 text-neutral-600 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Página siguiente"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
