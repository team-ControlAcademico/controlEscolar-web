import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      {/* Welcome Section */}
      <section className="mb-8">
        <div className="rounded-xl border border-neutral-200 bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-heading text-2xl font-semibold text-neutral-800">
                Bienvenido, {user?.name ?? ''}
              </h1>
              <p className="mt-1 text-sm text-neutral-500">
                Resumen del sistema de control escolar — Semana 1
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                to="/alumnos"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Ver alumnos
              </Link>
              <button className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Generar reporte
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-500">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500">Alumnos registrados</p>
              <p className="font-heading text-xl font-semibold text-neutral-800">1,248</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs text-success-600">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            +12 este mes
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-500">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500">Grupos activos</p>
              <p className="font-heading text-xl font-semibold text-neutral-800">32</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs text-primary-600">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            8 por grado
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-500">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500">Promedio general</p>
              <p className="font-heading text-xl font-semibold text-neutral-800">8.4</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs text-success-600">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            +0.3 vs anterior
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-500">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500">Asistencia hoy</p>
              <p className="font-heading text-xl font-semibold text-neutral-800">96%</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs text-success-600">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            1,198 presentes
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-heading text-base font-semibold text-neutral-800">
              Actividad reciente
            </h3>
            <button className="text-xs font-medium text-primary-500 transition-colors hover:text-primary-600">
              Ver todo
            </button>
          </div>
          <div className="divide-y divide-neutral-100">
            {[
              {
                name: 'María García',
                action: 'registró calificación en 3°A',
                time: 'Hace 15 min',
              },
              {
                name: 'Carlos López',
                action: 'actualizó asistencia de 2°B',
                time: 'Hace 1 hora',
              },
              {
                name: 'Ana Martínez',
                action: 'creó nuevo grupo 1°C',
                time: 'Hace 2 horas',
              },
              {
                name: 'Roberto Sánchez',
                action: 'generó reporte mensual',
                time: 'Hace 3 horas',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <div className="h-8 w-8 shrink-0 rounded-full bg-primary-100 text-xs font-semibold text-primary-700 flex items-center justify-center">
                  {item.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm">
                    <span className="font-medium text-neutral-800">{item.name}</span>{' '}
                    <span className="text-neutral-500">{item.action}</span>
                  </p>
                </div>
                <span className="shrink-0 text-xs text-neutral-400">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <h3 className="mb-4 font-heading text-base font-semibold text-neutral-800">
            Accesos rápidos
          </h3>
          <div className="space-y-2">
            {[
              {
                label: 'Registrar alumno',
                to: '/alumnos',
                icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
              },
              {
                label: 'Calificaciones',
                to: '/calificaciones',
                icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
              },
              {
                label: 'Asistencia',
                to: '/asistencia',
                icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
              },
              {
                label: 'Generar reporte',
                to: '/reportes',
                icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
              },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
              >
                <svg
                  className="h-4 w-4 text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={item.icon}
                  />
                </svg>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
