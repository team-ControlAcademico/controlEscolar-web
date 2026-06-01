import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  BookMarked,
  Calendar,
  Users,
  ClipboardList,
  Clock,
} from "lucide-react";

type NavItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: string[];
};

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", path: "/", icon: <LayoutDashboard className="h-4 w-4" />, roles: ["ADMIN", "ESCOLAR", "ADMINISTRATIVO", "DOCENTE", "ALUMNO", "PADRE"] },
  { label: "Carreras", path: "/carreras", icon: <GraduationCap className="h-4 w-4" />, roles: ["ADMIN", "ESCOLAR"] },
  { label: "Planes de Estudio", path: "/planes", icon: <BookOpen className="h-4 w-4" />, roles: ["ADMIN", "ESCOLAR"] },
  { label: "Materias", path: "/materias", icon: <BookMarked className="h-4 w-4" />, roles: ["ADMIN", "ESCOLAR"] },
  { label: "Ciclos Escolares", path: "/ciclos", icon: <Calendar className="h-4 w-4" />, roles: ["ADMIN", "ESCOLAR"] },
  { label: "Grupos", path: "/grupos", icon: <Users className="h-4 w-4" />, roles: ["ADMIN", "ESCOLAR", "DOCENTE"] },
  { label: "Inscripciones", path: "/inscripciones", icon: <ClipboardList className="h-4 w-4" />, roles: ["ADMIN", "ESCOLAR", "ADMINISTRATIVO"] },
  { label: "Mi Horario", path: "/mi-horario", icon: <Clock className="h-4 w-4" />, roles: ["ALUMNO"] },
];

export default function Sidebar() {
  const { user } = useAuthStore();
  const location = useLocation();
  const role = user?.role ?? "";

  const filteredNav = NAV_ITEMS.filter((item) => item.roles.includes(role));

  return (
    <aside className="w-56 border-r bg-background flex flex-col min-h-[calc(100vh-4rem)]">
      <nav className="flex-1 p-3 space-y-1">
        {filteredNav.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path))
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
