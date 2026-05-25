export type StudentStatus = 'activo' | 'inactivo' | 'pendiente';

export interface Student {
  id: string;
  matricula: string;
  nombre: string;
  apellidos: string;
  grado: number;
  grupo: string;
  promedio: number;
  asistencia: number;
  status: StudentStatus;
  tutor: string;
}
