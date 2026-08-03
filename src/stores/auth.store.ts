import { create } from "zustand";
import type { User, LoginInput, RegisterInput } from "@/types";
import * as apiService from "@/services/api";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginInput) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,

  initialize: () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const userStr = localStorage.getItem("user");

    if (accessToken && userStr) {
      try {
        const user = JSON.parse(userStr) as User;
        set({ user, accessToken, refreshToken, isAuthenticated: true, isLoading: false });
        // Refrescar perfil completo (incluyendo perfiles alumno/docente/etc.)
        apiService.getProfile().then((res) => {
          if (res.user) {
            set({ user: res.user });
            localStorage.setItem("user", JSON.stringify(res.user));
          }
        }).catch(() => {});
      } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        set({ isLoading: false });
      }
    } else {
      set({ isLoading: false });
    }
  },

  login: async (data: LoginInput) => {
    const response = await apiService.login(data);
    if (response.accessToken && response.refreshToken && response.user) {
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      set({
        user: response.user,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        isAuthenticated: true,
      });
    }
  },

  register: async (data: RegisterInput) => {
    await apiService.register(data);
  },

  logout: async () => {
    const rt = localStorage.getItem("refreshToken");
    if (rt) {
      try {
        await apiService.logout(rt);
      } catch {
        // ignore
      }
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
  },

  fetchProfile: async () => {
    try {
      const response = await apiService.getProfile();
      if (response.user) {
        set({ user: response.user });
        localStorage.setItem("user", JSON.stringify(response.user));
      }
    } catch {
      // ignore
    }
  },
}));
