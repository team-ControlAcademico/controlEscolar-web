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
import InscripcionesPage from "@/pages/inscripciones";
import MiHorarioPage from "@/pages/mi-horario";
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
            ],
          },
          {
            element: <ProtectedRoute roles={["ADMIN", "ESCOLAR", "DOCENTE"]} />,
            children: [
              { path: "/grupos", element: <GruposPage /> },
            ],
          },
          {
            element: <ProtectedRoute roles={["ADMIN", "ESCOLAR", "ADMINISTRATIVO"]} />,
            children: [
              { path: "/inscripciones", element: <InscripcionesPage /> },
            ],
          },
          {
            element: <ProtectedRoute roles={["ALUMNO"]} />,
            children: [
              { path: "/mi-horario", element: <MiHorarioPage /> },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
