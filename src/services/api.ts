import axios from "axios";
import type { ApiResponse, LoginInput, RegisterInput } from "@/types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const { data } = await axios.post<ApiResponse>(
            `${import.meta.env.VITE_API_URL}/auth/refresh`,
            { refreshToken }
          );

          if (data.accessToken && data.refreshToken) {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return api(originalRequest);
          }
        } catch {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export async function login(data: LoginInput) {
  const response = await api.post<ApiResponse>("/auth/login", data);
  return response.data;
}

export async function register(data: RegisterInput) {
  const response = await api.post<ApiResponse>("/auth/register", data);
  return response.data;
}

export async function getProfile() {
  const response = await api.get<ApiResponse>("/auth/profile");
  return response.data;
}

export async function logout(refreshToken: string) {
  const response = await api.post<ApiResponse>("/auth/logout", { refreshToken });
  return response.data;
}

export default api;
