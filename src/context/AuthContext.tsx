import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { setToken } from '../config/api';
import type { AuthUser, Role } from '../types/auth';
import { AuthContext, type AuthContextValue } from './authContextValue';

const USER_KEY = 'ce.user';

function readStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

const DEMO_USER: AuthUser = {
  id: 'demo-1',
  nombre: 'Jhonatan Kebab',
  email: 'jhonatan@controlescolar.mx',
  role: 'admin',
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser() ?? DEMO_USER);

  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      } catch {
        /* noop */
      }
    } else {
      try {
        localStorage.removeItem(USER_KEY);
      } catch {
        /* noop */
      }
    }
  }, [user]);

  const login = useCallback((nextUser: AuthUser, token: string) => {
    setToken(token);
    setUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  const hasRole = useCallback(
    (roles: Role | Role[]): boolean => {
      if (!user) return false;
      const list = Array.isArray(roles) ? roles : [roles];
      return list.includes(user.role);
    },
    [user],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      hasRole,
      login,
      logout,
    }),
    [user, hasRole, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
