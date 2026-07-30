import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { useTheme } from "@/context/theme-context";
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  BookMarked,
  Calendar,
  Users,
  ClipboardList,
  Clock,
  FileText,
  Wallet,
  Receipt,
  Award,
  FileSpreadsheet,
  BarChart3,
  LogOut,
  User,
  Sun,
  Moon,
  ChevronDown,
  Bell,
  MessageSquare,
} from "lucide-react";

import React from "react";

type NavItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: string[];
  hasChevron?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: "DASHBOARD", path: "/", icon: <LayoutDashboard className="h-4 w-4" />, roles: ["ADMIN", "ESCOLAR", "ADMINISTRATIVO"] },
  { label: "MI PORTAL", path: "/portal/alumno", icon: <LayoutDashboard className="h-4 w-4" />, roles: ["ALUMNO"] },
  { label: "MI PORTAL", path: "/portal/docente", icon: <LayoutDashboard className="h-4 w-4" />, roles: ["DOCENTE"] },
  { label: "MI PORTAL", path: "/portal/padre", icon: <LayoutDashboard className="h-4 w-4" />, roles: ["PADRE"] },
  { label: "CARRERAS", path: "/carreras", icon: <GraduationCap className="h-4 w-4" />, roles: ["ADMIN", "ESCOLAR"], hasChevron: true },
  { label: "PLAN DE ESTUDIO", path: "/planes", icon: <BookOpen className="h-4 w-4" />, roles: ["ADMIN", "ESCOLAR"] },
  { label: "MATERIAS", path: "/materias", icon: <BookMarked className="h-4 w-4" />, roles: ["ADMIN", "ESCOLAR"], hasChevron: true },
  { label: "CICLOS ESCOLARES", path: "/ciclos", icon: <Calendar className="h-4 w-4" />, roles: ["ADMIN", "ESCOLAR"] },
  { label: "GRUPOS", path: "/grupos", icon: <Users className="h-4 w-4" />, roles: ["ADMIN", "ESCOLAR", "DOCENTE"] },
  { label: "INSCRIPCIONES", path: "/inscripciones", icon: <ClipboardList className="h-4 w-4" />, roles: ["ADMIN", "ESCOLAR", "ADMINISTRATIVO"] },
  { label: "COLEGIATURAS", path: "/finanzas/colegiaturas", icon: <Wallet className="h-4 w-4" />, roles: ["ADMIN", "ADMINISTRATIVO"] },
  { label: "PAGOS", path: "/finanzas/pagos", icon: <Receipt className="h-4 w-4" />, roles: ["ADMIN", "ADMINISTRATIVO"] },
  { label: "BECAS", path: "/finanzas/becas", icon: <Award className="h-4 w-4" />, roles: ["ADMIN", "ADMINISTRATIVO"] },
  { label: "FACTURACIÓN", path: "/finanzas/facturas", icon: <FileSpreadsheet className="h-4 w-4" />, roles: ["ADMIN", "ADMINISTRATIVO"] },
  { label: "ESTADO DE CUENTA", path: "/finanzas/estado-cuenta", icon: <FileText className="h-4 w-4" />, roles: ["ADMIN", "ADMINISTRATIVO"] },
  { label: "REPORTES FINANCIEROS", path: "/finanzas/reportes", icon: <BarChart3 className="h-4 w-4" />, roles: ["ADMIN", "ADMINISTRATIVO"] },
  { label: "MI HORARIO", path: "/mi-horario", icon: <Clock className="h-4 w-4" />, roles: ["ALUMNO"] },
  { label: "MIS CALIFICACIONES", path: "/mis-calificaciones", icon: <FileText className="h-4 w-4" />, roles: ["ALUMNO"] },
  { label: "MI ESTADO DE CUENTA", path: "/finanzas/mi-estado-cuenta", icon: <Wallet className="h-4 w-4" />, roles: ["ALUMNO", "PADRE"] },
  { label: "AVISOS", path: "/avisos", icon: <Bell className="h-4 w-4" />, roles: ["ADMIN", "ESCOLAR", "ADMINISTRATIVO", "DOCENTE", "ALUMNO", "PADRE"] },
  { label: "MENSAJES", path: "/mensajes", icon: <MessageSquare className="h-4 w-4" />, roles: ["ADMIN", "ESCOLAR", "ADMINISTRATIVO", "DOCENTE", "ALUMNO", "PADRE"] },
  { label: "TITULACIÓN", path: "/titulacion", icon: <Award className="h-4 w-4" />, roles: ["ADMIN", "ESCOLAR"] },
  { label: "ESTADÍSTICAS", path: "/estadisticas", icon: <BarChart3 className="h-4 w-4" />, roles: ["ADMIN"] },
  { label: "REPORTES EXCEL", path: "/reportes", icon: <FileSpreadsheet className="h-4 w-4" />, roles: ["ADMIN", "ESCOLAR"] },
  { label: "MI KARDEX", path: "/mi-kardex", icon: <FileText className="h-4 w-4" />, roles: ["ALUMNO"] },
];

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Administrador",
  ESCOLAR: "Control Escolar",
  ADMINISTRATIVO: "Administrativo",
  DOCENTE: "Docente",
  ALUMNO: "Alumno",
  PADRE: "Padre",
};

export default function DashboardLayout() {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const role = user?.role ?? "";

  const [avisosNoLeidos, setAvisosNoLeidos] = React.useState(0);

  React.useEffect(() => {
    // Cargar contador inicial
    import("@/services/api").then(api => {
      api.getContadorNoLeidos().then(res => setAvisosNoLeidos(res.count)).catch(() => {});
    });

    // Escuchar nuevos avisos
    import("@/services/socket").then(socket => {
      const unsub = socket.onAvisoNuevo(() => {
        setAvisosNoLeidos(prev => prev + 1);
      });
      return unsub;
    });
  }, []);

  const filteredNav = NAV_ITEMS.filter((item) => item.roles.includes(role));

  const handleLogout = async () => {
    await logout();
    import("@/services/socket").then(socket => socket.disconnectSocket());
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      {/* TOP NAVBAR */}
      <header className="sticky top-4 mx-4 md:mx-6 z-50 bg-gradient-to-r from-blue-700/95 via-blue-600/95 to-indigo-600/95 backdrop-blur-md shadow-lg rounded-2xl border-0">
        <div className="flex h-16 items-center gap-4 px-4 md:px-6">
          {/* Mockup Logo */}
          <div className="bg-white dark:bg-[#0F172A] px-4 py-2 rounded shadow-sm border border-neutral-100 dark:border-neutral-800 flex items-center font-heading text-sm font-bold tracking-tight select-none cursor-pointer" onClick={() => navigate("/")}>
            <span className="text-neutral-500 dark:text-neutral-400 mr-1">Control</span>
            <span className="text-[#0284C7] dark:text-[#38BDF8]">Escolar</span>
          </div>

          {/* Nav links - scrollable on mobile */}
          <nav className="flex-1 overflow-x-auto mx-4">
            <ul className="flex items-center gap-1 min-w-max">
              {filteredNav.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === "/"}
                    className={({ isActive }) =>
                      `flex items-center gap-1 rounded px-3 py-2 text-xs font-heading font-semibold transition-all duration-200 whitespace-nowrap text-white ${
                        isActive
                          ? "bg-white/20 shadow-inner font-bold"
                          : "hover:bg-white/10"
                      }`
                    }
                  >
                    {item.icon}
                    <span className="ml-1.5 uppercase">{item.label}</span>
                    {item.hasChevron && <ChevronDown className="h-3 w-3 opacity-80" />}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right side: user info + theme toggle + logout */}
          <div className="flex items-center gap-2 shrink-0 text-white">
            {/* Campana de notificaciones */}
            <button
              onClick={() => navigate("/avisos")}
              className="relative flex items-center justify-center w-9 h-9 rounded-lg hover:bg-white/10 transition-all duration-200 text-white"
              aria-label="Avisos"
            >
              <Bell className="h-4 w-4" />
              {avisosNoLeidos > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-blue-600"></span>
              )}
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-white/10 transition-all duration-200 text-white"
              aria-label="Cambiar tema"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* User badge */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-white/90 ml-2">
              <User className="h-4 w-4" />
              <span className="max-w-[120px] truncate">{user?.email}</span>
              <span className="bg-white/20 rounded-full px-2 py-0.5 font-semibold text-white">
                {ROLE_LABELS[role] ?? role}
              </span>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-red-500/20 transition-all duration-200 text-white hover:text-red-200 ml-1"
              aria-label="Cerrar sesión"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

