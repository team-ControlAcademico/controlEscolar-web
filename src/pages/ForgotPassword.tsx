import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';
import type { ForgotPasswordResponse } from '../types/auth';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ token: string; expiresAt: string } | null>(null);
  const [serverError, setServerError] = useState('');

  function validate() {
    if (!email) return 'El email es requerido.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Ingresa un email válido.';
    return '';
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setEmailError(err);
      return;
    }

    setEmailError('');
    setServerError('');
    setIsSubmitting(true);
    try {
      const res = await api.post<ForgotPasswordResponse>('/auth/forgot-password', { email });
      if (res.data) {
        setResult(res.data);
      } else {
        setResult(null);
        setServerError('El email no está registrado o ya fue procesado.');
      }
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Error al procesar la solicitud.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 p-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
        {/* Back link */}
        <Link
          to="/login"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-700"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver al inicio de sesión
        </Link>

        {result ? (
          /* Success state */
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success-50">
              <svg
                className="h-6 w-6 text-success-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="mt-4 font-heading text-xl font-bold text-neutral-800">Token generado</h2>
            <p className="mt-2 text-sm text-neutral-500">
              En producción este token se enviaría por email. Para fines de desarrollo, el token es:
            </p>
            <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3">
              <p className="break-all font-mono text-xs text-neutral-700">{result.token}</p>
            </div>
            <p className="mt-2 text-xs text-neutral-400">
              Expira:{' '}
              {new Date(result.expiresAt).toLocaleTimeString('es-MX', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            <Link
              to="/login"
              className="mt-6 block w-full rounded-lg bg-primary-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-700"
            >
              Volver al login
            </Link>
          </div>
        ) : (
          /* Form state */
          <div>
            <h2 className="font-heading text-2xl font-bold text-neutral-800">
              ¿Olvidaste tu contraseña?
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              Ingresa tu email y recibirás un token para restablecer tu contraseña (válido por 15
              minutos).
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
              {serverError && (
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
                  {serverError}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  placeholder="nombre@institucion.edu.mx"
                  className={`mt-1.5 block w-full rounded-lg border px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:ring-2 focus:ring-primary-500/20 ${
                    emailError
                      ? 'border-red-300 bg-red-50 focus:border-red-400'
                      : 'border-neutral-300 bg-white focus:border-primary-500'
                  }`}
                />
                {emailError && <p className="mt-1.5 text-xs text-red-600">{emailError}</p>}
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
                {isSubmitting ? 'Enviando...' : 'Enviar instrucciones'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
