import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { LoginResponse } from '../types/auth';
import { api } from '../utils/api';

export function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  function validate() {
    const next: typeof errors = {};
    if (!email) {
      next.email = 'El email es requerido.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'Ingresa un email válido.';
    }
    if (!password) {
      next.password = 'La contraseña es requerida.';
    }
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      const res = await api.post<LoginResponse>('/auth/login', { email, password });
      login(res.data.token, res.data.user);
      navigate('/', { replace: true });
    } catch (err) {
      setErrors({ general: err instanceof Error ? err.message : 'Error al iniciar sesión.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-neutral-100">
      {/* Left panel — branding */}
      <div className="hidden flex-col justify-between bg-primary-700 p-12 lg:flex lg:w-5/12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white p-1.5">
            <img src="/logo.png" alt="Educatrol Logo" className="h-full w-full object-contain" />
          </div>
          <span className="font-heading text-xl font-semibold tracking-wide text-white">Educatrol</span>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="mb-8 w-64 rounded-2xl bg-white p-4 shadow-2xl border border-white/5 flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-[1.03]">
            <img src="/logo.png" alt="Educatrol Brand Logo" className="w-full h-auto object-contain" />
          </div>
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold leading-tight text-white">
              Gestiona tu institución de forma inteligente
            </h1>
            <p className="mt-4 text-base text-primary-200">
              Alumnos, calificaciones, asistencia y más — todo en un solo lugar.
            </p>
          </div>
        </div>

        <p className="text-sm text-primary-300">© {new Date().getFullYear()} Educatrol</p>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-white p-1">
              <img src="/logo.png" alt="Educatrol Logo" className="h-full w-full object-contain" />
            </div>
            <span className="font-heading text-lg font-bold tracking-wide text-neutral-800">
              Educatrol
            </span>
          </div>

          <h2 className="font-heading text-2xl font-bold text-neutral-800">Iniciar sesión</h2>
          <p className="mt-1 text-sm text-neutral-500">Ingresa tus credenciales para continuar</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
            {/* General error */}
            {errors.general && (
              <div className="flex items-center gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <svg
                  className="h-4 w-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {errors.general}
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                Correo electrónico
              </label>
              <div className="relative mt-1.5">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                  }}
                  placeholder="nombre@institucion.edu.mx"
                  className={`block w-full rounded-lg border px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:ring-2 focus:ring-primary-500/20 ${
                    errors.email
                      ? 'border-red-300 bg-red-50 focus:border-red-400'
                      : 'border-neutral-300 bg-white focus:border-primary-500'
                  }`}
                />
              </div>
              {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                  Contraseña
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-primary-600 transition-colors hover:text-primary-700"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative mt-1.5">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((p) => ({ ...p, password: undefined }));
                  }}
                  placeholder="••••••••"
                  className={`block w-full rounded-lg border px-4 py-2.5 pr-10 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:ring-2 focus:ring-primary-500/20 ${
                    errors.password
                      ? 'border-red-300 bg-red-50 focus:border-red-400'
                      : 'border-neutral-300 bg-white focus:border-primary-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-red-600">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting && (
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              )}
              {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
