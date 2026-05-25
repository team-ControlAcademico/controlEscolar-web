import type { ReactNode } from 'react';
import {
  BookOpen,
  Calculator,
  Download,
  FlaskConical,
  Globe2,
  Landmark,
  Save,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { STUDENTS } from '../data/students';

interface SubjectMeta {
  name: string;
  short: string;
  icon: typeof BookOpen;
  dotClass: string;
}

const SUBJECTS: SubjectMeta[] = [
  { name: 'Matemáticas', short: 'Mat', icon: Calculator, dotClass: 'bg-primary-500' },
  { name: 'Español', short: 'Esp', icon: BookOpen, dotClass: 'bg-secondary-500' },
  { name: 'Ciencias', short: 'Cie', icon: FlaskConical, dotClass: 'bg-emerald-500' },
  { name: 'Historia', short: 'His', icon: Landmark, dotClass: 'bg-amber-500' },
  { name: 'Inglés', short: 'Ing', icon: Globe2, dotClass: 'bg-violet-500' },
];

const GROUPS = ['5° A', '5° B', '4° C', '6° B', '3° A'] as const;

function gradeStyle(grade: number): { cell: string; text: string } {
  if (grade >= 9) {
    return { cell: 'bg-emerald-50 ring-emerald-100', text: 'text-emerald-700' };
  }
  if (grade >= 8) {
    return { cell: 'bg-primary-50 ring-primary-100', text: 'text-primary-700' };
  }
  if (grade >= 7) {
    return { cell: 'bg-amber-50 ring-amber-100', text: 'text-amber-700' };
  }
  return { cell: 'bg-red-50 ring-red-100', text: 'text-red-700' };
}

function pseudoGrade(id: string, subject: string): number {
  const seed = (id.charCodeAt(id.length - 1) + subject.length) % 35;
  return Math.round((6 + seed / 10) * 10) / 10;
}

export function Grades() {
  const groupStudents = STUDENTS.slice(0, 8);

  const rows = groupStudents.map((s) => {
    const grades = SUBJECTS.map((sub) => pseudoGrade(s.id, sub.name));
    const avg = Math.round((grades.reduce((a, b) => a + b, 0) / grades.length) * 10) / 10;
    return { student: s, grades, avg };
  });

  const subjectAverages = SUBJECTS.map((sub, i) => {
    const total = rows.reduce((acc, r) => acc + r.grades[i], 0);
    return { name: sub.name, short: sub.short, avg: Math.round((total / rows.length) * 10) / 10 };
  });

  const sortedSubjects = [...subjectAverages].sort((a, b) => b.avg - a.avg);
  const bestSubject = sortedSubjects[0];
  const worstSubject = sortedSubjects[sortedSubjects.length - 1];

  const groupAvg = Math.round((rows.reduce((acc, r) => acc + r.avg, 0) / rows.length) * 10) / 10;
  const aprobados = rows.filter((r) => r.avg >= 6).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">
            <span>Académico</span>
            <span className="text-neutral-300">/</span>
            <span className="text-primary-600">Calificaciones</span>
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-[2.5rem]">
            Calificaciones
          </h1>
          <p className="mt-2 text-base text-neutral-500">
            Captura y revisa el desempeño académico por grupo, materia y alumno.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="secondary">Periodo 2026-1</Badge>
          <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
            Exportar
          </Button>
          <Button variant="primary" leftIcon={<Save className="h-4 w-4" />}>
            Guardar cambios
          </Button>
        </div>
      </div>

      {/* Group selector */}
      <Card>
        <CardBody className="!py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                <Users className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                  Grupo seleccionado
                </p>
                <p className="font-heading text-base font-bold text-neutral-900">5° A · Primaria</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {GROUPS.map((g, i) => {
                const active = i === 0;
                return (
                  <button
                    key={g}
                    type="button"
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                      active
                        ? 'bg-primary-500 text-white shadow-sm'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {g}
                  </button>
                );
              })}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6">
        <StatTile
          icon={<Sparkles className="h-5 w-5" />}
          label="Promedio del grupo"
          value={groupAvg.toFixed(1)}
          accent="primary"
        />
        <StatTile
          icon={<TrendingUp className="h-5 w-5" />}
          label="Mejor materia"
          value={bestSubject.name}
          hint={`Promedio ${bestSubject.avg.toFixed(1)}`}
          accent="emerald"
        />
        <StatTile
          icon={<TrendingDown className="h-5 w-5" />}
          label="Materia más baja"
          value={worstSubject.name}
          hint={`Promedio ${worstSubject.avg.toFixed(1)}`}
          accent="amber"
        />
        <StatTile
          icon={<Users className="h-5 w-5" />}
          label="Aprobados"
          value={`${aprobados}/${rows.length}`}
          hint={`${Math.round((aprobados / rows.length) * 100)}% del grupo`}
          accent="secondary"
        />
      </div>

      {/* Table */}
      <Card>
        <CardHeader
          title="Captura de calificaciones"
          subtitle={`${rows.length} alumnos · ${SUBJECTS.length} materias`}
          action={
            <div className="hidden flex-wrap items-center gap-3 text-[11px] font-medium text-neutral-500 sm:flex">
              {SUBJECTS.map((s) => (
                <span key={s.name} className="inline-flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${s.dotClass}`} />
                  {s.short}
                </span>
              ))}
            </div>
          }
        />
        <CardBody className="!p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="border-y border-neutral-100 bg-neutral-50/80">
                <tr className="text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  <th className="sticky left-0 z-10 bg-neutral-50/80 px-7 py-5">Alumno</th>
                  {SUBJECTS.map((s) => {
                    const Icon = s.icon;
                    return (
                      <th key={s.name} className="px-4 py-5">
                        <div className="flex items-center justify-center gap-2 text-neutral-600">
                          <span className={`h-2 w-2 rounded-full ${s.dotClass}`} />
                          <Icon className="h-4 w-4 text-neutral-400" />
                          <span className="hidden lg:inline">{s.name}</span>
                          <span className="lg:hidden">{s.short}</span>
                        </div>
                      </th>
                    );
                  })}
                  <th className="px-7 py-5 text-center">
                    <span className="text-primary-700">Promedio</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {rows.map(({ student, grades, avg }) => {
                  const fullName = `${student.nombre} ${student.apellidos}`;
                  const avgTone = gradeStyle(avg);
                  return (
                    <tr key={student.id} className="group transition-colors hover:bg-neutral-50/70">
                      <td className="sticky left-0 z-10 bg-white px-7 py-4 shadow-[1px_0_0_0_rgb(245_245_245)] group-hover:bg-neutral-50/70">
                        <div className="flex items-center gap-3">
                          <Avatar name={fullName} size="md" tone="primary" />
                          <div className="min-w-0">
                            <p className="truncate text-[15px] font-semibold text-neutral-900">
                              {fullName}
                            </p>
                            <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
                              {student.matricula}
                            </p>
                          </div>
                        </div>
                      </td>
                      {grades.map((g, i) => {
                        const tone = gradeStyle(g);
                        return (
                          <td key={i} className="px-4 py-4 text-center">
                            <span
                              className={`inline-flex h-12 w-14 items-center justify-center rounded-xl ring-1 font-heading text-base font-bold transition-all hover:scale-110 ${tone.cell} ${tone.text}`}
                            >
                              {g.toFixed(1)}
                            </span>
                          </td>
                        );
                      })}
                      <td className="px-7 py-4 text-center">
                        <span
                          className={`inline-flex h-12 min-w-[4rem] items-center justify-center rounded-xl px-3 ring-1 font-heading text-lg font-bold ${avgTone.cell} ${avgTone.text}`}
                        >
                          {avg.toFixed(1)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-neutral-200 bg-neutral-50/60 text-sm">
                  <td className="sticky left-0 z-10 bg-neutral-50/80 px-7 py-4 font-heading text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Promedio por materia
                  </td>
                  {subjectAverages.map((s) => {
                    const tone = gradeStyle(s.avg);
                    return (
                      <td key={s.name} className="px-4 py-4 text-center">
                        <span className={`font-heading text-base font-bold ${tone.text}`}>
                          {s.avg.toFixed(1)}
                        </span>
                      </td>
                    );
                  })}
                  <td className="px-7 py-4 text-center">
                    <span className="font-heading text-lg font-bold text-primary-700">
                      {groupAvg.toFixed(1)}
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-neutral-100 bg-neutral-50/40 px-6 py-3 text-xs">
            <span className="font-semibold uppercase tracking-wider text-neutral-500">Escala</span>
            <LegendChip className="bg-emerald-50 text-emerald-700">≥ 9.0 · Excelente</LegendChip>
            <LegendChip className="bg-primary-50 text-primary-700">8.0 – 8.9 · Muy bien</LegendChip>
            <LegendChip className="bg-amber-50 text-amber-700">7.0 – 7.9 · Suficiente</LegendChip>
            <LegendChip className="bg-red-50 text-red-700">&lt; 7.0 · Reprobado</LegendChip>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

interface StatTileProps {
  icon: ReactNode;
  label: string;
  value: string;
  hint?: string;
  accent: 'primary' | 'secondary' | 'emerald' | 'amber';
}

const accentClasses: Record<StatTileProps['accent'], { bg: string; text: string }> = {
  primary: { bg: 'bg-primary-100', text: 'text-primary-600' },
  secondary: { bg: 'bg-secondary-100', text: 'text-secondary-600' },
  emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600' },
  amber: { bg: 'bg-amber-100', text: 'text-amber-600' },
};

function StatTile({ icon, label, value, hint, accent }: StatTileProps) {
  const palette = accentClasses[accent];
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg lg:p-7">
      <div className="mb-4 flex items-center gap-3">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${palette.bg} ${palette.text}`}
        >
          {icon}
        </span>
        <p className="text-sm font-medium text-neutral-500">{label}</p>
      </div>
      <p className="font-heading text-2xl font-bold tracking-tight text-neutral-900 lg:text-3xl">
        {value}
      </p>
      {hint ? <p className="mt-1.5 text-xs font-semibold text-neutral-500">{hint}</p> : null}
    </div>
  );
}

function LegendChip({ className, children }: { className: string; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${className}`}
    >
      {children}
    </span>
  );
}
