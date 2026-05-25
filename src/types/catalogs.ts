export interface CicloEscolar {
  id: string;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  activo: boolean;
}

export interface Turno {
  id: string;
  nombre: string;
  horaInicio: string;
  horaFin: string;
  activo: boolean;
}

export interface Grado {
  id: string;
  nombre: string;
  nivel: 'preescolar' | 'primaria' | 'secundaria' | 'preparatoria';
  orden: number;
  activo: boolean;
}

export type CatalogEntity = CicloEscolar | Turno | Grado;
