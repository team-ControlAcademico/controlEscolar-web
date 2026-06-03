import { useAuthStore } from "@/stores/auth.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

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
    user?.email;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Bienvenido, {displayName}
        </h1>
        <p className="text-muted-foreground mt-1">
          {WELCOME_MESSAGES[role] ?? "Panel de control escolar"}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rol</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ROLE_LABELS[role]}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {user?.email}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Estado</CardTitle>
            <div className={`h-3 w-3 rounded-full ${user?.isActive ? "bg-green-500" : "bg-red-500"}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user?.isActive ? "Activo" : "Inactivo"}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Cuenta {user?.isActive ? "habilitada" : "deshabilitada"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Fase actual</CardTitle>
            <span className="text-lg">1/6</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Gestión académica</div>
            <p className="text-xs text-muted-foreground mt-1">
              Fase 2 de 6 completada
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
