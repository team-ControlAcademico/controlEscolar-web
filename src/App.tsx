function App() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <nav className="bg-primary-500 text-white shadow-lg">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 text-xl font-bold">
                CE
              </div>
              <h1 className="font-heading text-xl font-bold">Control Escolar</h1>
            </div>
            <div className="hidden gap-6 md:flex">
              <a href="#" className="transition-colors hover:text-secondary-300">
                Inicio
              </a>
              <a href="#" className="transition-colors hover:text-secondary-300">
                Alumnos
              </a>
              <a href="#" className="transition-colors hover:text-secondary-300">
                Calificaciones
              </a>
              <a href="#" className="transition-colors hover:text-secondary-300">
                Reportes
              </a>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-400 text-sm font-semibold text-primary-900">
                JK
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="mb-10">
          <h2 className="font-heading text-3xl font-bold text-neutral-900">Bienvenido, Jhonatan</h2>
          <p className="mt-2 text-neutral-600">Resumen del sistema de control escolar — Semana 1</p>
        </section>

        <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
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
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-100 text-secondary-600">
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
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
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
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-100 text-secondary-600">
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
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-heading text-lg font-semibold text-neutral-900">
              Paleta de colores institucional
            </h3>
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium text-neutral-600">Primary (Verde escuela)</p>
                <div className="flex gap-2">
                  <div className="h-10 w-10 rounded-lg bg-primary-100" title="primary-100" />
                  <div className="h-10 w-10 rounded-lg bg-primary-300" title="primary-300" />
                  <div className="h-10 w-10 rounded-lg bg-primary-500" title="primary-500" />
                  <div className="h-10 w-10 rounded-lg bg-primary-700" title="primary-700" />
                  <div className="h-10 w-10 rounded-lg bg-primary-900" title="primary-900" />
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-neutral-600">Secondary (Azul cielo)</p>
                <div className="flex gap-2">
                  <div className="h-10 w-10 rounded-lg bg-secondary-100" title="secondary-100" />
                  <div className="h-10 w-10 rounded-lg bg-secondary-300" title="secondary-300" />
                  <div className="h-10 w-10 rounded-lg bg-secondary-400" title="secondary-400" />
                  <div className="h-10 w-10 rounded-lg bg-secondary-600" title="secondary-600" />
                  <div className="h-10 w-10 rounded-lg bg-secondary-900" title="secondary-900" />
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-neutral-600">Neutral (Grises)</p>
                <div className="flex gap-2">
                  <div
                    className="h-10 w-10 rounded-lg border border-neutral-300 bg-neutral-50"
                    title="neutral-50"
                  />
                  <div className="h-10 w-10 rounded-lg bg-neutral-200" title="neutral-200" />
                  <div className="h-10 w-10 rounded-lg bg-neutral-400" title="neutral-400" />
                  <div className="h-10 w-10 rounded-lg bg-neutral-600" title="neutral-600" />
                  <div className="h-10 w-10 rounded-lg bg-neutral-800" title="neutral-800" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-heading text-lg font-semibold text-neutral-900">Tipografía</h3>
            <div className="space-y-4">
              <div>
                <p className="mb-1 text-sm font-medium text-neutral-500">Poppins — Encabezados</p>
                <p className="font-heading text-3xl font-bold text-primary-500">Control Escolar</p>
              </div>
              <div>
                <p className="mb-1 text-sm font-medium text-neutral-500">Inter — Cuerpo de texto</p>
                <p className="text-base leading-relaxed text-neutral-700">
                  Sistema de gestión académica para el seguimiento de alumnos, calificaciones,
                  asistencia y reportes institucionales.
                </p>
              </div>
              <div>
                <p className="mb-1 text-sm font-medium text-neutral-500">Componentes UI</p>
                <div className="flex flex-wrap gap-3">
                  <button className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600">
                    Primario
                  </button>
                  <button className="rounded-lg bg-secondary-400 px-4 py-2 text-sm font-medium text-primary-900 transition-colors hover:bg-secondary-500">
                    Secundario
                  </button>
                  <button className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100">
                    Neutro
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
