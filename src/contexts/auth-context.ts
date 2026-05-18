import { createContext } from 'react';
import type { AuthUser } from '../types/auth';

export const TOKEN_KEY = 'ce_token';
export const USER_KEY = 'ce_user';

export interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function loadStoredAuth(): { token: string | null; user: AuthUser | null } {
  const storedToken = localStorage.getItem(TOKEN_KEY);
  const storedUser = localStorage.getItem(USER_KEY);
  if (!storedToken || !storedUser) {
    return { token: null, user: null };
  }
  try {
    return { token: storedToken, user: JSON.parse(storedUser) as AuthUser };
  } catch {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    return { token: null, user: null };
  }
}
