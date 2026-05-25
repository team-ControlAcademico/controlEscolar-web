import { AxiosError } from 'axios';
import type { ApiErrorPayload } from '../types/api';

export class AppError extends Error {
  status?: number;
  code?: string;
  details?: Record<string, string[]>;

  constructor(payload: ApiErrorPayload) {
    super(payload.message);
    this.name = 'AppError';
    this.status = payload.status;
    this.code = payload.code;
    this.details = payload.details;
  }
}

export function normalizeError(err: unknown): AppError {
  if (err instanceof AppError) return err;

  if (err instanceof AxiosError) {
    const status = err.response?.status;
    const data = err.response?.data as Partial<ApiErrorPayload> | undefined;
    return new AppError({
      message:
        data?.message ??
        err.message ??
        (status === 401
          ? 'Sesión expirada. Inicia sesión nuevamente.'
          : 'Error de conexión con el servidor.'),
      code: data?.code,
      details: data?.details,
      status,
    });
  }

  if (err instanceof Error) {
    return new AppError({ message: err.message });
  }

  return new AppError({ message: 'Ocurrió un error inesperado.' });
}

export function getErrorMessage(err: unknown): string {
  return normalizeError(err).message;
}

export function getFieldErrors(err: unknown): Record<string, string> {
  const normalized = normalizeError(err);
  const out: Record<string, string> = {};
  if (!normalized.details) return out;
  for (const [field, messages] of Object.entries(normalized.details)) {
    if (messages && messages.length > 0) out[field] = messages[0];
  }
  return out;
}
