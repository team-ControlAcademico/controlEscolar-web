export interface AuthUser {
  id: number;
  name: string;
  email: string;
  rol: 'admin' | 'maestro' | 'alumno' | 'padre';
  createdAt: string;
  updatedAt: string;
}

export type Role = AuthUser['rol'];

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    user: AuthUser;
    token: string;
  };
}

export interface ForgotPasswordResponse {
  data: {
    token: string;
    expiresAt: string;
  };
  message: string;
}
