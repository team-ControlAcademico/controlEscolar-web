import { ClipboardCheck, FileText, MessageSquare, UserPlus } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../ui/Card';

interface Activity {
  id: string;
  icon: typeof FileText;
  title: string;
  detail: string;
  time: string;
  tone: 'primary' | 'secondary' | 'amber' | 'emerald';
}

const ACTIVITIES: Activity[] = [
  {
    id: 'a1',
    icon: UserPlus,
    title: 'Alumno registrado',
    detail: 'Valeria Martínez se unió al grupo 5° B',
    time: 'hace 12 min',
    tone: 'primary',
  },
  {
    id: 'a2',
    icon: FileText,
    title: 'Calificaciones actualizadas',
    detail: 'Matemáticas — 5° A · 28 alumnos',
    time: 'hace 1 h',
    tone: 'secondary',
  },
  {
    id: 'a3',
    icon: ClipboardCheck,
    title: 'Asistencia registrada',
    detail: 'Grupo 4° C · 96% presentes',
    time: 'hace 3 h',
    tone: 'emerald',
  },
  {
    id: 'a4',
    icon: MessageSquare,
    title: 'Mensaje del tutor',
    detail: 'Carlos García pregunta por tareas pendientes',
    time: 'ayer',
    tone: 'amber',
  },
];

const toneClasses: Record<Activity['tone'], string> = {
  primary: 'bg-primary-100 text-primary-700',
  secondary: 'bg-secondary-100 text-secondary-700',
  amber: 'bg-amber-100 text-amber-700',
  emerald: 'bg-emerald-100 text-emerald-700',
};

export function RecentActivity() {
  return (
    <Card>
      <CardHeader
        title="Actividad reciente"
        subtitle="Últimas acciones registradas en el sistema"
        action={
          <a
            href="#"
            className="text-xs font-semibold text-primary-600 transition-colors hover:text-primary-800"
          >
            Ver todo →
          </a>
        }
      />
      <CardBody className="!p-0">
        <ul className="divide-y divide-neutral-100">
          {ACTIVITIES.map((activity) => {
            const Icon = activity.icon;
            return (
              <li
                key={activity.id}
                className="flex items-start gap-4 px-6 py-4 transition-colors hover:bg-neutral-50"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${toneClasses[activity.tone]}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="truncate text-sm font-semibold text-neutral-900">
                      {activity.title}
                    </p>
                    <span className="shrink-0 whitespace-nowrap text-[11px] font-medium text-neutral-400">
                      {activity.time}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-neutral-500">{activity.detail}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </CardBody>
    </Card>
  );
}
