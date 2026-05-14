function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-primary-600/20 bg-primary-500/95 text-white shadow-lg backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 text-xl font-bold shadow-inner">
                CE
              </div>
              <h1 className="font-heading text-xl font-bold tracking-tight">Control Escolar</h1>
            </div>
            <div className="hidden gap-1 md:flex">
              <a
                href="#"
                className="rounded-lg px-4 py-2 text-sm font-medium text-white/90 transition-all hover:bg-white/10 hover:text-white"
              >
                Inicio
              </a>
              <a
                href="#"
                className="rounded-lg px-4 py-2 text-sm font-medium text-white/90 transition-all hover:bg-white/10 hover:text-white"
              >
                Alumnos
              </a>
              <a
                href="#"
                className="rounded-lg px-4 py-2 text-sm font-medium text-white/90 transition-all hover:bg-white/10 hover:text-white"
              >
                Calificaciones
              </a>
              <a
                href="#"
                className="rounded-lg px-4 py-2 text-sm font-medium text-white/90 transition-all hover:bg-white/10 hover:text-white"
              >
                Reportes
              </a>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-400 text-sm font-semibold text-primary-900 shadow-md">
                JK
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <section className="mb-10">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-500 to-primary-700 p-8 text-white shadow-xl">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-secondary-400/20 blur-2xl" />
            <div className="relative">
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                Bienvenido, Jhonatan
              </h2>
              <p className="mt-2 text-lg text-white/80">
                Resumen del sistema de control escolar — Semana 1
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-primary-700 shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5">
                  Ver alumnos
                </button>
                <button className="rounded-lg border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
                  Generar reporte
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600 transition-colors group-hover:bg-primary-500 group-hover:text-white">
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
            <p className="mt-2 text-xs font-medium text-primary-600">+12 este mes</p>
          </div>

          <div className="group rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-100 text-secondary-600 transition-colors group-hover:bg-secondary-400 group-hover:text-primary-900">
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
            <p className="mt-2 text-xs font-medium text-secondary-600">8 por grado</p>
          </div>

          <div className="group rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600 transition-colors group-hover:bg-primary-500 group-hover:text-white">
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
            <p className="mt-2 text-xs font-medium text-primary-600">+0.3 vs anterior</p>
          </div>

          <div className="group rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-100 text-secondary-600 transition-colors group-hover:bg-secondary-400 group-hover:text-primary-900">
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
            <p className="mt-2 text-xs font-medium text-secondary-600">1,198 presentes</p>
          </div>
        </div>

        {/* Design System Showcase */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Color Palette */}
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="mb-6 font-heading text-lg font-semibold text-neutral-900">
              Paleta de colores institucional
            </h3>
            <div className="space-y-5">
              <div>
                <p className="mb-3 text-sm font-semibold text-neutral-700">
                  Primary <span className="font-normal text-neutral-500">(Verde escuela)</span>
                </p>
                <div className="flex gap-2">
                  <div className="group relative h-14 flex-1 rounded-lg bg-primary-100 transition-all hover:scale-105 hover:shadow-md">
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-medium text-primary-800 opacity-0 transition-opacity group-hover:opacity-100">
                      100
                    </span>
                  </div>
                  <div className="group relative h-14 flex-1 rounded-lg bg-primary-300 transition-all hover:scale-105 hover:shadow-md">
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-medium text-primary-900 opacity-0 transition-opacity group-hover:opacity-100">
                      300
                    </span>
                  </div>
                  <div className="group relative h-14 flex-1 rounded-lg bg-primary-500 transition-all hover:scale-105 hover:shadow-md">
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                      500
                    </span>
                  </div>
                  <div className="group relative h-14 flex-1 rounded-lg bg-primary-700 transition-all hover:scale-105 hover:shadow-md">
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                      700
                    </span>
                  </div>
                  <div className="group relative h-14 flex-1 rounded-lg bg-primary-900 transition-all hover:scale-105 hover:shadow-md">
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                      900
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold text-neutral-700">
                  Secondary <span className="font-normal text-neutral-500">(Azul cielo)</span>
                </p>
                <div className="flex gap-2">
                  <div className="group relative h-14 flex-1 rounded-lg bg-secondary-100 transition-all hover:scale-105 hover:shadow-md">
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-medium text-secondary-800 opacity-0 transition-opacity group-hover:opacity-100">
                      100
                    </span>
                  </div>
                  <div className="group relative h-14 flex-1 rounded-lg bg-secondary-300 transition-all hover:scale-105 hover:shadow-md">
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-medium text-secondary-900 opacity-0 transition-opacity group-hover:opacity-100">
                      300
                    </span>
                  </div>
                  <div className="group relative h-14 flex-1 rounded-lg bg-secondary-400 transition-all hover:scale-105 hover:shadow-md">
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-medium text-primary-900 opacity-0 transition-opacity group-hover:opacity-100">
                      400
                    </span>
                  </div>
                  <div className="group relative h-14 flex-1 rounded-lg bg-secondary-600 transition-all hover:scale-105 hover:shadow-md">
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                      600
                    </span>
                  </div>
                  <div className="group relative h-14 flex-1 rounded-lg bg-secondary-900 transition-all hover:scale-105 hover:shadow-md">
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                      900
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold text-neutral-700">
                  Neutral <span className="font-normal text-neutral-500">(Grises)</span>
                </p>
                <div className="flex gap-2">
                  <div className="group relative h-14 flex-1 rounded-lg border border-neutral-200 bg-neutral-50 transition-all hover:scale-105 hover:shadow-md">
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-medium text-neutral-600 opacity-0 transition-opacity group-hover:opacity-100">
                      50
                    </span>
                  </div>
                  <div className="group relative h-14 flex-1 rounded-lg bg-neutral-200 transition-all hover:scale-105 hover:shadow-md">
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-medium text-neutral-700 opacity-0 transition-opacity group-hover:opacity-100">
                      200
                    </span>
                  </div>
                  <div className="group relative h-14 flex-1 rounded-lg bg-neutral-400 transition-all hover:scale-105 hover:shadow-md">
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                      400
                    </span>
                  </div>
                  <div className="group relative h-14 flex-1 rounded-lg bg-neutral-600 transition-all hover:scale-105 hover:shadow-md">
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                      600
                    </span>
                  </div>
                  <div className="group relative h-14 flex-1 rounded-lg bg-neutral-800 transition-all hover:scale-105 hover:shadow-md">
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                      800
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Typography & Components */}
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="mb-6 font-heading text-lg font-semibold text-neutral-900">
              Tipografía y componentes
            </h3>
            <div className="space-y-6">
              <div className="rounded-lg bg-neutral-50 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Poppins — Encabezados
                </p>
                <p className="font-heading text-3xl font-bold text-primary-500">Control Escolar</p>
                <p className="mt-1 font-heading text-xl font-semibold text-neutral-700">
                  Subtítulo de sección
                </p>
              </div>
              <div className="rounded-lg bg-neutral-50 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Inter — Cuerpo de texto
                </p>
                <p className="text-base leading-relaxed text-neutral-700">
                  Sistema de gestión académica para el seguimiento de alumnos, calificaciones,
                  asistencia y reportes institucionales.
                </p>
              </div>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Botones
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-600 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
                    Primario
                  </button>
                  <button className="rounded-lg bg-secondary-400 px-5 py-2.5 text-sm font-semibold text-primary-900 shadow-md transition-all hover:bg-secondary-500 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
                    Secundario
                  </button>
                  <button className="rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 shadow-sm transition-all hover:bg-neutral-50 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
                    Neutro
                  </button>
                </div>
              </div>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Badges
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
                    Activo
                  </span>
                  <span className="rounded-full bg-secondary-100 px-3 py-1 text-xs font-semibold text-secondary-700">
                    Pendiente
                  </span>
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600">
                    Archivado
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t border-neutral-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-neutral-500">
              © 2026 Control Escolar. Todos los derechos reservados.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-sm text-neutral-500 transition-colors hover:text-primary-500"
              >
                Documentación
              </a>
              <a
                href="#"
                className="text-sm text-neutral-500 transition-colors hover:text-primary-500"
              >
                Soporte
              </a>
              <a
                href="#"
                className="text-sm text-neutral-500 transition-colors hover:text-primary-500"
              >
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
