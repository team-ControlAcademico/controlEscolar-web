import { Download, Plus, Users } from 'lucide-react';
import { StudentsTable } from '../components/students/StudentsTable';
import { Button } from '../components/ui/Button';
import { StatCard } from '../components/ui/StatCard';
import { STUDENTS } from '../data/students';

export function Students() {
  const total = STUDENTS.length;
  const activos = STUDENTS.filter((s) => s.status === 'activo').length;
  const promedio = STUDENTS.reduce((acc, s) => acc + s.promedio, 0) / STUDENTS.length;
  const asistencia = STUDENTS.reduce((acc, s) => acc + s.asistencia, 0) / STUDENTS.length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-[2.5rem]">
            Alumnos
          </h1>
          <p className="mt-2 text-base text-neutral-500">
            Gestiona el registro, calificaciones y asistencia de tus alumnos.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
            Exportar CSV
          </Button>
          <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
            Nuevo alumno
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6">
        <StatCard icon={<Users className="h-6 w-6" />} label="Total" value={total} tone="primary" />
        <StatCard
          icon={<Users className="h-6 w-6" />}
          label="Activos"
          value={activos}
          hint={`${Math.round((activos / total) * 100)}% del total`}
          tone="secondary"
        />
        <StatCard
          icon={<Users className="h-6 w-6" />}
          label="Promedio general"
          value={promedio.toFixed(1)}
          tone="primary"
        />
        <StatCard
          icon={<Users className="h-6 w-6" />}
          label="Asistencia"
          value={`${Math.round(asistencia)}%`}
          tone="secondary"
        />
      </div>

      <StudentsTable students={STUDENTS} />
    </div>
  );
}
