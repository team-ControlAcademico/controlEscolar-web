import { CalendarCheck, GraduationCap, TrendingUp, Users } from 'lucide-react';
import { GroupsOverview } from '../components/dashboard/GroupsOverview';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { WelcomeBanner } from '../components/dashboard/WelcomeBanner';
import { StatCard } from '../components/ui/StatCard';
import { useAuth } from '../hooks/useAuth';

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <WelcomeBanner
        name={user?.name ?? ''}
        subtitle="Resumen del sistema de control escolar — Semana 1 del periodo 2026-1"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        <StatCard
          icon={<Users className="h-6 w-6" />}
          label="Alumnos registrados"
          value="1,248"
          hint="+12 este mes"
          tone="primary"
          trend="up"
        />
        <StatCard
          icon={<GraduationCap className="h-6 w-6" />}
          label="Grupos activos"
          value={32}
          hint="8 por grado"
          tone="secondary"
        />
        <StatCard
          icon={<TrendingUp className="h-6 w-6" />}
          label="Promedio general"
          value="8.4"
          hint="+0.3 vs anterior"
          tone="primary"
          trend="up"
        />
        <StatCard
          icon={<CalendarCheck className="h-6 w-6" />}
          label="Asistencia hoy"
          value="96%"
          hint="1,198 presentes"
          tone="secondary"
          trend="flat"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-6 xl:gap-8">
        <div className="min-w-0 lg:col-span-2">
          <RecentActivity />
        </div>
        <div className="min-w-0">
          <GroupsOverview />
        </div>
      </div>
    </div>
  );
}
