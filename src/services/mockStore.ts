import type { CicloEscolar, Grado, Turno } from '../types/catalogs';
import type { CatalogService } from './catalogService';
import { buildMeta } from '../utils/response';
import { filterByQuery } from '../utils/search';
import { paginate } from '../utils/pagination';

const SHOULD_USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || !import.meta.env.VITE_API_URL;

export const useMockServices = SHOULD_USE_MOCK;

function delay<T>(value: T, ms = 200): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function makeId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function createMockService<T extends { id: string }>(
  seed: T[],
  searchFields: Array<keyof T>,
): CatalogService<T, Omit<T, 'id'>> {
  const store: T[] = [...seed];

  return {
    list: async (params) => {
      const page = params?.page ?? 1;
      const pageSize = params?.pageSize ?? 10;
      const search = params?.search ?? '';
      const filtered = filterByQuery(store, search, searchFields);
      const items = paginate(filtered, page, pageSize);
      return delay({ items, meta: buildMeta(filtered.length, page, pageSize) });
    },
    get: async (id) => {
      const found = store.find((s) => s.id === id);
      if (!found) throw new Error('No encontrado');
      return delay(found);
    },
    create: async (payload) => {
      const next = { ...(payload as object), id: makeId() } as T;
      store.unshift(next);
      return delay(next);
    },
    update: async (id, payload) => {
      const idx = store.findIndex((s) => s.id === id);
      if (idx < 0) throw new Error('No encontrado');
      const merged = { ...store[idx], ...payload } as T;
      store[idx] = merged;
      return delay(merged);
    },
    remove: async (id) => {
      const idx = store.findIndex((s) => s.id === id);
      if (idx >= 0) store.splice(idx, 1);
      await delay(undefined);
    },
  };
}

const CICLOS_SEED: CicloEscolar[] = [
  {
    id: 'c1',
    nombre: '2025-2026',
    fechaInicio: '2025-08-19',
    fechaFin: '2026-07-10',
    activo: true,
  },
  {
    id: 'c2',
    nombre: '2024-2025',
    fechaInicio: '2024-08-21',
    fechaFin: '2025-07-12',
    activo: false,
  },
  {
    id: 'c3',
    nombre: '2023-2024',
    fechaInicio: '2023-08-22',
    fechaFin: '2024-07-13',
    activo: false,
  },
];

const TURNOS_SEED: Turno[] = [
  { id: 't1', nombre: 'Matutino', horaInicio: '07:00', horaFin: '13:00', activo: true },
  { id: 't2', nombre: 'Vespertino', horaInicio: '14:00', horaFin: '19:00', activo: true },
  { id: 't3', nombre: 'Nocturno', horaInicio: '19:00', horaFin: '22:00', activo: false },
];

const GRADOS_SEED: Grado[] = [
  { id: 'g1', nombre: '1°', nivel: 'primaria', orden: 1, activo: true },
  { id: 'g2', nombre: '2°', nivel: 'primaria', orden: 2, activo: true },
  { id: 'g3', nombre: '3°', nivel: 'primaria', orden: 3, activo: true },
  { id: 'g4', nombre: '4°', nivel: 'primaria', orden: 4, activo: true },
  { id: 'g5', nombre: '5°', nivel: 'primaria', orden: 5, activo: true },
  { id: 'g6', nombre: '6°', nivel: 'primaria', orden: 6, activo: true },
  { id: 'g7', nombre: '1°', nivel: 'secundaria', orden: 7, activo: true },
];

export const mockCiclosService = createMockService<CicloEscolar>(CICLOS_SEED, [
  'nombre',
  'fechaInicio',
  'fechaFin',
]);
export const mockTurnosService = createMockService<Turno>(TURNOS_SEED, ['nombre']);
export const mockGradosService = createMockService<Grado>(GRADOS_SEED, ['nombre', 'nivel']);
