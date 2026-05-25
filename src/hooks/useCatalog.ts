import { useCallback, useEffect, useState } from 'react';
import type { CatalogService } from '../services/catalogService';
import { getErrorMessage } from '../utils/errors';

interface UseCatalogState<T> {
  items: T[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  create: (payload: Omit<T, 'id'>) => Promise<T | null>;
  update: (id: string, payload: Partial<Omit<T, 'id'>>) => Promise<T | null>;
  remove: (id: string) => Promise<boolean>;
  submitting: boolean;
}

export function useCatalog<T extends { id: string }>(
  service: CatalogService<T>,
): UseCatalogState<T> {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { items: list } = await service.list({ page: 1, pageSize: 200 });
        if (!cancelled) {
          setItems(list);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [service]);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { items: list } = await service.list({ page: 1, pageSize: 200 });
      setItems(list);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [service]);

  const create = useCallback(
    async (payload: Omit<T, 'id'>) => {
      setSubmitting(true);
      try {
        const created = await service.create(payload);
        setItems((prev) => [created, ...prev]);
        return created;
      } catch (err) {
        setError(getErrorMessage(err));
        return null;
      } finally {
        setSubmitting(false);
      }
    },
    [service],
  );

  const update = useCallback(
    async (id: string, payload: Partial<Omit<T, 'id'>>) => {
      setSubmitting(true);
      try {
        const updated = await service.update(id, payload);
        setItems((prev) => prev.map((item) => (item.id === id ? updated : item)));
        return updated;
      } catch (err) {
        setError(getErrorMessage(err));
        return null;
      } finally {
        setSubmitting(false);
      }
    },
    [service],
  );

  const remove = useCallback(
    async (id: string) => {
      setSubmitting(true);
      try {
        await service.remove(id);
        setItems((prev) => prev.filter((item) => item.id !== id));
        return true;
      } catch (err) {
        setError(getErrorMessage(err));
        return false;
      } finally {
        setSubmitting(false);
      }
    },
    [service],
  );

  return { items, loading, error, refresh, create, update, remove, submitting };
}
