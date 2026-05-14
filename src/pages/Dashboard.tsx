import { Link } from 'react-router-dom';

export function Dashboard() {
  return (
    <>
      {/* Hero Section */}
      <section className="mb-10">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-700 p-8 text-white shadow-xl shadow-primary-500/25 sm:p-10">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-secondary-400/30 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-accent-500/20 blur-2xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-success-400" />
              Sistema activo
            </div>
            <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Bienvenido, Jhonatan
            </h1>
            <p className="mt-2 text-base text-white/70 sm:text-lg">
              Resumen del sistema de control escolar — Semana 1
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/alumnos"
                className="rounded-xl bg-white px-6 py-2.5 text-sm font-semibold text-primary-600 shadow-lg shadow-black/10 transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                Ver alumnos
              </Link>
              <button className="rounded-xl border border-white/25 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:-translate-y-0.5 active:translate-y-0">
                Generar reporte
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-500/10">
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary-400 to-primary-600 transition-all group-hover:w-1.5" />
          <div className="p-6 pl-5">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-md shadow-primary-500/25 transition-transform group-hover:scale-110">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-neutral-500">Alumnos registrados</p>
            <p className="mt-1 font-heading text-3xl font-bold text-neutral-900">1,248</p>
            <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-success-600">
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
        </div>

        <div className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-secondary-500/10">
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-secondary-400 to-secondary-600 transition-all group-hover:w-1.5" />
          <div className="p-6 pl-5">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary-400 to-secondary-600 text-white shadow-md shadow-secondary-400/25 transition-transform group-hover:scale-110">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-neutral-500">Grupos activos</p>
            <p className="mt-1 font-heading text-3xl font-bold text-neutral-900">32</p>
            <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-secondary-600">
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
        </div>

        <div className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-500/10">
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-accent-400 to-accent-600 transition-all group-hover:w-1.5" />
          <div className="p-6 pl-5">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 text-white shadow-md shadow-accent-400/25 transition-transform group-hover:scale-110">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-neutral-500">Promedio general</p>
            <p className="mt-1 font-heading text-3xl font-bold text-neutral-900">8.4</p>
            <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-success-600">
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
        </div>

        <div className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-success-500/10">
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-success-400 to-success-600 transition-all group-hover:w-1.5" />
          <div className="p-6 pl-5">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-success-400 to-success-600 text-white shadow-md shadow-success-400/25 transition-transform group-hover:scale-110">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-neutral-500">Asistencia hoy</p>
            <p className="mt-1 font-heading text-3xl font-bold text-neutral-900">96%</p>
            <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-success-600">
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
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-heading text-lg font-semibold text-neutral-900">
              Actividad reciente
            </h3>
            <button className="text-sm font-medium text-secondary-600 transition-colors hover:text-secondary-700">
              Ver todo
            </button>
          </div>
          <div className="space-y-4">
            {[
              {
                name: 'María García',
                action: 'registró calificación en 3°A',
                time: 'Hace 15 min',
                color: 'bg-primary-500',
              },
              {
                name: 'Carlos López',
                action: 'actualizó asistencia de 2°B',
                time: 'Hace 1 hora',
                color: 'bg-secondary-500',
              },
              {
                name: 'Ana Martínez',
                action: 'creó nuevo grupo 1°C',
                time: 'Hace 2 horas',
                color: 'bg-success-500',
              },
              {
                name: 'Roberto Sánchez',
                action: 'generó reporte mensual',
                time: 'Hace 3 horas',
                color: 'bg-accent-500',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-neutral-50"
              >
                <div className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm">
                    <span className="font-semibold text-neutral-900">{item.name}</span>{' '}
                    <span className="text-neutral-500">{item.action}</span>
                  </p>
                </div>
                <span className="shrink-0 text-xs text-neutral-400">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h3 className="mb-5 font-heading text-lg font-semibold text-neutral-900">
            Accesos rápidos
          </h3>
          <div className="space-y-3">
            {[
              {
                label: 'Registrar alumno',
                to: '/alumnos',
                icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
                color: 'from-primary-500 to-primary-700',
              },
              {
                label: 'Calificaciones',
                to: '/calificaciones',
                icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
                color: 'from-secondary-400 to-secondary-600',
              },
              {
                label: 'Asistencia',
                to: '/asistencia',
                icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
                color: 'from-success-400 to-success-600',
              },
              {
                label: 'Generar reporte',
                to: '/reportes',
                icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
                color: 'from-accent-400 to-accent-600',
              },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="group flex items-center gap-3 rounded-lg border border-neutral-100 p-3 transition-all hover:border-neutral-200 hover:shadow-md"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${item.color} text-white shadow-sm transition-transform group-hover:scale-110`}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={item.icon}
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-neutral-700 transition-colors group-hover:text-neutral-900">
                  {item.label}
                </span>
                <svg
                  className="ml-auto h-4 w-4 text-neutral-300 transition-all group-hover:translate-x-0.5 group-hover:text-neutral-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
