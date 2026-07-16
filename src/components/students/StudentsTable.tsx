import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import type { Student, StudentStatus } from '../../types/student';

const PAGE_SIZE = 6;

const STATUS_TONE: Record<StudentStatus, 'success' | 'warning' | 'danger'> = {
  activo: 'success',
  pendiente: 'warning',
  inactivo: 'danger',
};

function gradeColor(avg: number): string {
  if (avg >= 9) return 'text-emerald-600';
  if (avg >= 8) return 'text-primary-600';
  if (avg >= 7) return 'text-amber-600';
  return 'text-red-600';
}

interface StudentsTableProps {
  students: Student[];
}

export function StudentsTable({ students }: StudentsTableProps) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<StudentStatus | 'todos'>('todos');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return students.filter((s) => {
      const matchesQuery =
        !q ||
        s.nombre.toLowerCase().includes(q) ||
        s.apellidos.toLowerCase().includes(q) ||
        s.matricula.toLowerCase().includes(q);
      const matchesStatus = status === 'todos' || s.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [students, query, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  const statusFilters: Array<StudentStatus | 'todos'> = [
    'todos',
    'activo',
    'pendiente',
    'inactivo',
  ];

  return (
    <Card>
      <CardHeader
        title="Listado de alumnos"
        subtitle={`${filtered.length} resultado${filtered.length === 1 ? '' : 's'}`}
        action={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-700 shadow-sm transition-all hover:bg-neutral-50"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
          </button>
        }
      />
      <CardBody className="!pt-4">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="sm:w-72">
            <Input
              name="search-students"
              placeholder="Buscar por nombre o matrícula…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {statusFilters.map((f) => {
              const active = status === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => {
                    setStatus(f);
                    setPage(1);
                  }}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                    active
                      ? 'bg-primary-500 text-white shadow-sm'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        <div className="-mx-6 overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-y border-neutral-100 bg-neutral-50/60 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">
                <th className="px-7 py-4">Alumno</th>
                <th className="px-4 py-4">Matrícula</th>
                <th className="px-4 py-4">Grado/Grupo</th>
                <th className="px-4 py-4">Promedio</th>
                <th className="px-4 py-4">Asistencia</th>
                <th className="px-7 py-4 text-right">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {pageItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-7 py-12 text-center text-sm text-neutral-500">
                    No se encontraron alumnos que coincidan con la búsqueda.
                  </td>
                </tr>
              ) : (
                pageItems.map((s) => {
                  const fullName = `${s.nombre} ${s.apellidos}`;
                  return (
                    <tr key={s.id} className="transition-colors hover:bg-neutral-50">
                      <td className="px-7 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={fullName} size="md" tone="primary" />
                          <div>
                            <p className="text-[15px] font-semibold text-neutral-900">{fullName}</p>
                            <p className="text-xs text-neutral-500">{s.tutor}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 font-mono text-xs text-neutral-600">
                        {s.matricula}
                      </td>
                      <td className="px-4 py-4 text-[15px] text-neutral-700">
                        {s.grado}° {s.grupo}
                      </td>
                      <td
                        className={`px-4 py-4 font-heading text-base font-bold ${gradeColor(s.promedio)}`}
                      >
                        {s.promedio.toFixed(1)}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-neutral-100">
                            <div
                              className="h-full rounded-full bg-primary-500"
                              style={{ width: `${s.asistencia}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-neutral-600">
                            {s.asistencia}%
                          </span>
                        </div>
                      </td>
                      <td className="px-7 py-4 text-right">
                        <Badge tone={STATUS_TONE[s.status]} className="capitalize">
                          {s.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
          <p>
            Mostrando {pageItems.length === 0 ? 0 : pageStart + 1}–{pageStart + pageItems.length} de{' '}
            {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="rounded-md border border-neutral-200 bg-white p-1.5 text-neutral-600 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Página anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="rounded-md bg-neutral-100 px-3 py-1.5 font-semibold text-neutral-700">
              {safePage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="rounded-md border border-neutral-200 bg-white p-1.5 text-neutral-600 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Página siguiente"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
