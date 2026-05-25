export type Role = 'admin' | 'docente' | 'coordinador' | 'invitado';

export interface AuthUser {
  id: string;
  nombre: string;
  email: string;
  role: Role;
}
