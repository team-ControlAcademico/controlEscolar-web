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
  errors?: { field: string; message: string }[];
}
