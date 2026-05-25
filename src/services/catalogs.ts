import type { CicloEscolar, Grado, Turno } from '../types/catalogs';
import { createCatalogService, type CatalogService } from './catalogService';
import {
  mockCiclosService,
  mockGradosService,
  mockTurnosService,
  useMockServices,
} from './mockStore';

export const ciclosService: CatalogService<CicloEscolar> = useMockServices
  ? mockCiclosService
  : createCatalogService<CicloEscolar>('ciclos-escolares');

export const turnosService: CatalogService<Turno> = useMockServices
  ? mockTurnosService
  : createCatalogService<Turno>('turnos');

export const gradosService: CatalogService<Grado> = useMockServices
  ? mockGradosService
  : createCatalogService<Grado>('grados');
