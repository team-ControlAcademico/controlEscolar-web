export type Role = "ADMIN" | "ESCOLAR" | "ADMINISTRATIVO" | "DOCENTE" | "ALUMNO" | "PADRE";

export interface User {
  id: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
  admin?: ProfileBase;
  escolar?: ProfileBase;
  administrativo?: AdministrativoProfile;
  docente?: DocenteProfile;
  alumno?: AlumnoProfile;
  padre?: ProfileBase;
}

export interface ProfileBase {
  id: string;
  nombre: string;
  curp: string | null;
  userId: string;
}

export interface AdministrativoProfile extends ProfileBase {
  departamento: string | null;
}

export interface DocenteProfile extends ProfileBase {
  especialidad: string | null;
  gradoAcademico: string | null;
}

export interface AlumnoProfile extends ProfileBase {
  matricula: string;
  semestre: number;
  estatus: string;
}

// ─── Auth ───

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  role: Role;
  nombre: string;
  curp?: string;
  especialidad?: string;
  gradoAcademico?: string;
  departamento?: string;
  matricula?: string;
  semestre?: number;
}

export interface ApiResponse<T = unknown> {
  message: string;
  data?: T;
  user?: User;
  accessToken?: string;
  refreshToken?: string;
}

// ─── FASE 2: Modelos académicos ───

export interface Carrera {
  id: string;
  clave: string;
  nombre: string;
  descripcion: string | null;
  creditosTotales: number;
  duracionSemestres: number;
  activa: boolean;
  createdAt: string;
  _count?: { alumnos: number; planes: number };
}

export interface PlanEstudio {
  id: string;
  clave: string;
  nombre: string;
  vigente: boolean;
  carrera: { id: string; clave: string; nombre: string };
  carreraId?: string;
  materias?: PlanMateria[];
  _count?: { materias: number };
}

export interface Materia {
  id: string;
  clave: string;
  nombre: string;
  creditos: number;
  tipo: "OBLIGATORIA" | "OPTATIVA";
  descripcion: string | null;
  prerequisitos?: Prerequisito[];
  _count?: { grupos: number; planes: number };
}

export interface PlanMateria {
  id: string;
  semestre: number;
  planId: string;
  materiaId: string;
  materia: Materia;
}

export interface Prerequisito {
  id: string;
  materiaId: string;
  prerequisitoId: string;
  prerequisito?: { id: string; clave: string; nombre: string };
}

export interface CicloEscolar {
  id: string;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  tipo: string;
  activo: boolean;
  grupos?: Grupo[];
  _count?: { grupos: number };
}

export interface Grupo {
  id: string;
  clave: string;
  aula: string | null;
  cupoMaximo: number;
  materiaId: string;
  materia?: { id: string; clave: string; nombre: string };
  cicloEscolarId: string;
  cicloEscolar?: { id: string; nombre: string };
  docenteId: string;
  docente?: { id: string; nombre: string };
  horarios?: Horario[];
  _count?: { inscripciones: number };
}

export interface Horario {
  id: string;
  dia: string;
  horaInicio: string;
  horaFin: string;
  aula: string | null;
  grupoId: string;
}

export interface Inscripcion {
  id: string;
  estatus: string;
  alumnoId: string;
  alumno?: { id: string; nombre: string; matricula: string };
  grupoId: string;
  grupo?: {
    id: string;
    clave: string;
    materia?: { id: string; clave: string; nombre: string; creditos: number };
    docente?: { id: string; nombre: string };
    cicloEscolar?: { id: string; nombre: string };
    horarios?: Horario[];
  };
}

export interface AlumnoFull extends ProfileBase {
  matricula: string;
  semestre: number;
  estatus: string;
  user?: { id: string; email: string; isActive: boolean };
  carrera?: { id: string; clave: string; nombre: string } | null;
  inscripciones?: Inscripcion[];
}

// ─── FASE 3: Asistencia y Evaluación ───

export interface Asistencia {
  id: string;
  alumnoId: string;
  grupoId: string;
  fecha: string;
  presente: boolean;
  justificacion: string | null;
  alumno?: { id: string; nombre: string; matricula: string };
  grupo?: {
    id: string;
    clave: string;
    materia?: { id: string; clave: string; nombre: string };
  };
}

export interface AsistenciaEstadistica {
  alumnoId: string;
  nombre: string;
  matricula: string;
  total: number;
  presentes: number;
  porcentaje: number;
  enRiesgo: boolean;
}

export interface Calificacion {
  id: string;
  alumnoId: string;
  grupoId: string;
  unidad: number;
  calificacion: number;
  tipo: "ORDINARIO" | "EXTRAORDINARIO" | "TITULO";
}

export interface CalificacionAlumnoRow {
  alumnoId: string;
  nombre: string;
  matricula: string;
  unidades: Record<number, { calificacion: number; tipo: string }[]>;
  promedio: number | null;
}

export interface CalificacionGrupoResult {
  grupo: {
    id: string;
    clave: string;
    materia: { id: string; clave: string; nombre: string };
  };
  alumnos: CalificacionAlumnoRow[];
}

export interface BoletaItem {
  grupoId: string;
  grupoClave: string;
  materia: { id: string; clave: string; nombre: string; creditos: number };
  docente: { id: string; nombre: string };
  cicloEscolar: { id: string; nombre: string };
  unidades: Record<number, { calificacion: number; tipo: string }[]>;
  promedio: number | null;
}

export interface BoletaResult {
  alumno: { id: string; nombre: string; matricula: string; semestre: number };
  boleta: BoletaItem[];
}

// ─── FASE 4: Finanzas ───
// Los montos llegan como string porque Prisma serializa Decimal así (precisión).

export interface Colegiatura {
  id: string;
  concepto: string;
  monto: string;
  descuento: string;
  recargo: string;
  total: string;
  fechaVencimiento: string;
  estatus: string;
  alumnoId?: string;
  alumno?: { id: string; nombre: string; matricula: string };
  cicloEscolar?: { id: string; nombre: string };
  pagos?: Pago[];
  _count?: { pagos: number };
}

export interface Pago {
  id: string;
  monto: string;
  fecha: string;
  metodo: string;
  referencia: string | null;
  estatus: string;
  colegiaturaId?: string;
  alumnoId?: string;
  alumno?: { id: string; nombre: string; matricula: string };
  colegiatura?: { id: string; concepto: string; total: string };
  factura?: { id: string; cfdiUuid: string; estatus: string } | null;
}

export interface Beca {
  id: string;
  tipo: string;
  porcentaje: string;
  descripcion: string | null;
  vigenciaInicio: string;
  vigenciaFin: string;
  activa: boolean;
  alumnoId?: string;
  alumno?: { id: string; nombre: string; matricula: string };
}

export interface Descuento {
  id: string;
  concepto: string;
  tipo: string;
  valor: string;
  descripcion: string | null;
  activo: boolean;
}

export interface Factura {
  id: string;
  cfdiUuid: string;
  serie: string;
  folio: number;
  rfcReceptor: string;
  razonSocial: string;
  usoCfdi: string;
  subtotal: string;
  iva: string;
  total: string;
  estatus: string;
  createdAt: string;
  cadenaOriginal?: string | null;
  selloDigital?: string | null;
  xmlData?: string;
  pago?: {
    id: string;
    monto: string;
    fecha: string;
    alumno?: { id: string; nombre: string; matricula: string };
  };
}

export interface EstadoCuentaMovimiento {
  id: string;
  concepto: string;
  cicloEscolar: { id: string; nombre: string };
  monto: string;
  descuento: string;
  recargo: string;
  total: string;
  pagado: string;
  saldo: string;
  fechaVencimiento: string;
  estatus: string;
  pagos: { id: string; monto: string; fecha: string; metodo: string; estatus: string }[];
}

export interface EstadoCuenta {
  alumno: { id: string; nombre: string; matricula: string; semestre: number };
  resumen: { totalCargado: string; totalPagado: string; saldoTotal: string };
  movimientos: EstadoCuentaMovimiento[];
  becas: { id: string; tipo: string; porcentaje: string; vigenciaInicio: string; vigenciaFin: string }[];
}

export interface ReporteFinanciero {
  resumen: { totalIngresos: string; totalCartera: string; carteraVencida: string; alumnosConAdeudo: number };
  porCiclo: { cicloEscolarId: string; ciclo: string; ingresos: string; cartera: string }[];
}

