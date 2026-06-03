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
