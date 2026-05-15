import { useState } from 'react';

const initialStudents = [
  {
    id: 1,
    nombre: 'María García López',
    matricula: 'A001',
    grupo: '3°A',
    promedio: 9.2,
    estatus: 'Activo',
  },
  {
    id: 2,
    nombre: 'Carlos Rodríguez Pérez',
    matricula: 'A002',
    grupo: '2°B',
    promedio: 8.5,
    estatus: 'Activo',
  },
  {
    id: 3,
    nombre: 'Ana Martínez Sánchez',
    matricula: 'A003',
    grupo: '1°C',
    promedio: 7.8,
    estatus: 'Activo',
  },
  {
    id: 4,
    nombre: 'Roberto Hernández Díaz',
    matricula: 'A004',
    grupo: '3°A',
    promedio: 6.9,
    estatus: 'Pendiente',
  },
  {
    id: 5,
    nombre: 'Laura Flores Ramírez',
    matricula: 'A005',
    grupo: '2°A',
    promedio: 9.7,
    estatus: 'Activo',
  },
  {
    id: 6,
    nombre: 'Diego Morales Castro',
    matricula: 'A006',
    grupo: '1°B',
    promedio: 8.1,
    estatus: 'Activo',
  },
  {
    id: 7,
    nombre: 'Sofía Torres Ruiz',
    matricula: 'A007',
    grupo: '3°B',
    promedio: 7.5,
    estatus: 'Pendiente',
  },
  {
    id: 8,
    nombre: 'Fernando Ruiz Gutiérrez',
    matricula: 'A008',
    grupo: '2°A',
    promedio: 9.0,
    estatus: 'Activo',
  },
  {
    id: 9,
    nombre: 'Isabela Vargas Mendoza',
    matricula: 'A009',
    grupo: '1°C',
    promedio: 8.8,
    estatus: 'Activo',
  },
  {
    id: 10,
    nombre: 'Alejandro Díaz Núñez',
    matricula: 'A010',
    grupo: '3°A',
    promedio: 6.2,
    estatus: 'Inactivo',
  },
  {
    id: 11,
    nombre: 'Valentina Cruz Ortega',
    matricula: 'A011',
    grupo: '2°B',
    promedio: 9.4,
    estatus: 'Activo',
  },
  {
    id: 12,
    nombre: 'Mateo Jiménez Peña',
    matricula: 'A012',
    grupo: '1°A',
    promedio: 7.3,
    estatus: 'Activo',
  },
];

const grupos = ['Todos', '1°A', '1°B', '1°C', '2°A', '2°B', '3°A', '3°B'];
const estatusColors: Record<string, string> = {
  Activo: 'bg-success-50 text-success-700',
  Pendiente: 'bg-accent-50 text-accent-700',
  Inactivo: 'bg-neutral-100 text-neutral-500',
};

export function Alumnos() {
  const [search, setSearch] = useState('');
  const [grupoFilter, setGrupoFilter] = useState('Todos');
  const [students] = useState(initialStudents);

  const filtered = students.filter((s) => {
    const matchSearch =
      s.nombre.toLowerCase().includes(search.toLowerCase()) ||
      s.matricula.toLowerCase().includes(search.toLowerCase());
    const matchGrupo = grupoFilter === 'Todos' || s.grupo === grupoFilter;
    return matchSearch && matchGrupo;
  });

  const totalActivos = students.filter((s) => s.estatus === 'Activo').length;
  const promedioGeneral = (
    students.reduce((acc, s) => acc + s.promedio, 0) / students.length
  ).toFixed(1);

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-semibold text-neutral-800">Alumnos</h1>
            <p className="mt-1 text-sm text-neutral-500">
              Gestión y seguimiento de alumnos registrados
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-600">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Nuevo alumno
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
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
              <p className="text-xs text-neutral-500">Total alumnos</p>
              <p className="font-heading text-lg font-semibold text-neutral-800">
                {students.length}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-50 text-success-600">
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
              <p className="text-xs text-neutral-500">Activos</p>
              <p className="font-heading text-lg font-semibold text-neutral-800">{totalActivos}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-500">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs text-neutral-500">Promedio general</p>
              <p className="font-heading text-lg font-semibold text-neutral-800">
                {promedioGeneral}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Buscar por nombre o matrícula..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 py-2 pl-10 pr-4 text-sm text-neutral-700 placeholder-neutral-400 transition-colors focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-400"
          />
        </div>
        <select
          value={grupoFilter}
          onChange={(e) => setGrupoFilter(e.target.value)}
          className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-700 transition-colors focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
        >
          {grupos.map((g) => (
            <option key={g} value={g}>
              {g === 'Todos' ? 'Todos los grupos' : `Grupo ${g}`}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-100">
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Alumno
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Matrícula
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Grupo
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Promedio
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Estatus
                </th>
                <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filtered.map((student) => (
                <tr key={student.id} className="transition-colors hover:bg-neutral-50/50">
                  <td className="whitespace-nowrap px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">
                        {student.nombre
                          .split(' ')
                          .slice(0, 2)
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <span className="text-sm font-medium text-neutral-800">{student.nombre}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5">
                    <span className="rounded bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600">
                      {student.matricula}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-neutral-600">
                    {student.grupo}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5">
                    <span
                      className={`text-sm font-semibold ${
                        student.promedio >= 8
                          ? 'text-success-600'
                          : student.promedio >= 7
                            ? 'text-accent-600'
                            : 'text-red-500'
                      }`}
                    >
                      {student.promedio}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        estatusColors[student.estatus] || estatusColors['Activo']
                      }`}
                    >
                      {student.estatus}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        className="rounded p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-primary-500"
                        title="Ver detalle"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                      <button
                        className="rounded p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-primary-500"
                        title="Editar"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        className="rounded p-1.5 text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-500"
                        title="Eliminar"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center">
                    <p className="text-sm text-neutral-500">No se encontraron alumnos</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-neutral-100 px-5 py-3">
          <p className="text-xs text-neutral-500">
            Mostrando <span className="font-medium text-neutral-700">{filtered.length}</span> de{' '}
            <span className="font-medium text-neutral-700">{students.length}</span> alumnos
          </p>
          <div className="flex gap-1">
            <button className="rounded px-3 py-1.5 text-xs font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700">
              Anterior
            </button>
            <button className="rounded bg-primary-500 px-3 py-1.5 text-xs font-medium text-white">
              1
            </button>
            <button className="rounded px-3 py-1.5 text-xs font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700">
              2
            </button>
            <button className="rounded px-3 py-1.5 text-xs font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
