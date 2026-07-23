import { useAuthStore } from "@/stores/auth.store";
import { StatCard } from "@/components/ui/StatCard";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { GraduationCap, Users, BookOpen, School } from "lucide-react";

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Administrador",
  ESCOLAR: "Control Escolar",
  ADMINISTRATIVO: "Administrativo",
  DOCENTE: "Docente",
  ALUMNO: "Alumno",
  PADRE: "Padre",
};

const WELCOME_MESSAGES: Record<string, string> = {
  ADMIN: "Control total del sistema. Gestión de usuarios, configuración y supervisión general.",
  ESCOLAR: "Gestión académica: inscripciones, kardex, calificaciones y certificados.",
  ADMINISTRATIVO: "Gestión financiera: colegiaturas, pagos, facturación y becas.",
  DOCENTE: "Registro de asistencia, captura de calificaciones y comunicación con alumnos.",
  ALUMNO: "Consulta tus calificaciones, horarios, estado de cuenta y tareas.",
  PADRE: "Monitorea el desempeño académico y estado de cuenta de tu hijo.",
};

export default function DashboardPage() {
  const { user } = useAuthStore();
  const role = user?.role ?? "";

  const displayName =
    user?.admin?.nombre ||
    user?.escolar?.nombre ||
    user?.administrativo?.nombre ||
    user?.docente?.nombre ||
    user?.alumno?.nombre ||
    user?.padre?.nombre ||
    user?.email ||
    "Usuario";

  return (
    <div className="space-y-6">
      <WelcomeBanner
        name={displayName}
        subtitle={WELCOME_MESSAGES[role] ?? "Panel de control escolar"}
        role={ROLE_LABELS[role]}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<GraduationCap className="h-6 w-6" />}
          label="Rol actual"
          value={ROLE_LABELS[role] ?? role}
          hint={user?.email}
          tone="primary"
        />
        <StatCard
          icon={<Users className="h-6 w-6" />}
          label="Estado de cuenta"
          value={user?.isActive ? "Activo" : "Inactivo"}
          hint={user?.isActive ? "Cuenta habilitada" : "Cuenta deshabilitada"}
          tone="secondary"
          trend={user?.isActive ? "up" : "down"}
        />
        <StatCard
          icon={<BookOpen className="h-6 w-6" />}
          label="Fase actual"
          value="Fase 1"
          hint="Gestión académica"
          tone="primary"
        />
        <StatCard
          icon={<School className="h-6 w-6" />}
          label="Sistema"
          value="Control Escolar"
          hint="v1.0 · Ciclo activo"
          tone="secondary"
        />
      </div>
    </div>
  );
}
