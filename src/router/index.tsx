import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import AuthLayout from "@/layouts/auth-layout";
import DashboardLayout from "@/layouts/dashboard-layout";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import DashboardPage from "@/pages/dashboard";
import CarrerasPage from "@/pages/carreras";
import PlanesPage from "@/pages/planes";
import PlanDetallePage from "@/pages/plan-detalle";
import MateriasPage from "@/pages/materias";
import CiclosPage from "@/pages/ciclos";
import GruposPage from "@/pages/grupos";
import HorariosGrupoPage from "@/pages/horarios-grupo";
import InscripcionesPage from "@/pages/inscripciones";
import MiHorarioPage from "@/pages/mi-horario";
import AsistenciaGrupoPage from "@/pages/asistencia-grupo";
import AsistenciaAlumnoPage from "@/pages/asistencia-alumno";
import CalificacionesGrupoPage from "@/pages/calificaciones-grupo";
import BoletaAlumnoPage from "@/pages/boleta-alumno";
import MisCalificacionesPage from "@/pages/mis-calificaciones";
import ColegiaturasPage from "@/pages/finanzas/colegiaturas";
import PagosPage from "@/pages/finanzas/pagos";
import BecasPage from "@/pages/finanzas/becas";
import FacturasPage from "@/pages/finanzas/facturas";
import EstadoCuentaPage from "@/pages/finanzas/estado-cuenta";
import ReportesFinancierosPage from "@/pages/finanzas/reportes";
import PortalAlumnoPage from "@/pages/portal/portal-alumno";
import PortalDocentePage from "@/pages/portal/portal-docente";
import PortalPadrePage from "@/pages/portal/portal-padre";
import AvisosPage from "@/pages/avisos";
import MensajesPage from "@/pages/mensajes";
import UsuariosPage from "@/pages/usuarios";
import { useAuthStore } from "@/stores/auth.store";

function ProtectedRoute({ roles }: { roles?: string[] }) {
  const { isAuthenticated, isLoading, user } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Cargando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Cargando...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "/login", element: <LoginPage /> },
          { path: "/register", element: <RegisterPage /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "/", element: <DashboardPage /> },
          {
            element: <ProtectedRoute roles={["ADMIN", "ESCOLAR"]} />,
            children: [
              { path: "/carreras", element: <CarrerasPage /> },
              { path: "/planes", element: <PlanesPage /> },
              { path: "/planes/:id", element: <PlanDetallePage /> },
              { path: "/materias", element: <MateriasPage /> },
              { path: "/ciclos", element: <CiclosPage /> },
              { path: "/grupos/:id/horarios", element: <HorariosGrupoPage /> },
              { path: "/usuarios", element: <UsuariosPage /> },
            ],
          },
          {
            element: <ProtectedRoute roles={["ADMIN", "ESCOLAR", "DOCENTE"]} />,
            children: [
              { path: "/grupos", element: <GruposPage /> },
              { path: "/grupos/:id/asistencia", element: <AsistenciaGrupoPage /> },
              { path: "/grupos/:id/calificaciones", element: <CalificacionesGrupoPage /> },
            ],
          },
          {
            element: <ProtectedRoute roles={["ADMIN", "ESCOLAR", "ADMINISTRATIVO"]} />,
            children: [
              { path: "/inscripciones", element: <InscripcionesPage /> },
            ],
          },
          {
            element: <ProtectedRoute roles={["ADMIN", "ESCOLAR", "DOCENTE", "ALUMNO", "PADRE"]} />,
            children: [
              { path: "/alumnos/:id/asistencia", element: <AsistenciaAlumnoPage /> },
              { path: "/alumnos/:id/boleta", element: <BoletaAlumnoPage /> },
            ],
          },
          {
            element: <ProtectedRoute roles={["ADMIN", "ADMINISTRATIVO"]} />,
            children: [
              { path: "/finanzas/colegiaturas", element: <ColegiaturasPage /> },
              { path: "/finanzas/pagos", element: <PagosPage /> },
              { path: "/finanzas/becas", element: <BecasPage /> },
              { path: "/finanzas/facturas", element: <FacturasPage /> },
              { path: "/finanzas/reportes", element: <ReportesFinancierosPage /> },
              { path: "/finanzas/estado-cuenta", element: <EstadoCuentaPage /> },
            ],
          },
          {
            element: <ProtectedRoute roles={["ALUMNO", "PADRE"]} />,
            children: [
              { path: "/finanzas/mi-estado-cuenta", element: <EstadoCuentaPage /> },
            ],
          },
          {
            element: <ProtectedRoute roles={["ALUMNO"]} />,
            children: [
              { path: "/mi-horario", element: <MiHorarioPage /> },
              { path: "/mis-calificaciones", element: <MisCalificacionesPage /> },
              { path: "/portal/alumno", element: <PortalAlumnoPage /> },
            ],
          },
          {
            element: <ProtectedRoute roles={["DOCENTE"]} />,
            children: [
              { path: "/portal/docente", element: <PortalDocentePage /> },
            ],
          },
          {
            element: <ProtectedRoute roles={["PADRE"]} />,
            children: [
              { path: "/portal/padre", element: <PortalPadrePage /> },
            ],
          },
          // Avisos y mensajes — accesibles para todos los autenticados
          { path: "/avisos", element: <AvisosPage /> },
          { path: "/mensajes", element: <MensajesPage /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
