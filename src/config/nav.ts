import {
  BookOpen,
  CalendarRange,
  Clock,
  FileBarChart,
  GraduationCap,
  LayoutDashboard,
  Layers,
  Settings,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { Role } from '../types/auth';

export interface NavChild {
  to: string;
  label: string;
  icon: LucideIcon;
  roles?: Role[];
}

export interface NavSection {
  id: string;
  label: string;
  icon: LucideIcon;
  to?: string;
  roles?: Role[];
  children?: NavChild[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    id: 'inicio',
    label: 'Inicio',
    icon: LayoutDashboard,
    to: '/',
  },
  {
    id: 'alumnos',
    label: 'Alumnos',
    icon: Users,
    to: '/alumnos',
    roles: ['admin', 'coordinador', 'docente'],
  },
  {
    id: 'calificaciones',
    label: 'Calificaciones',
    icon: GraduationCap,
    to: '/calificaciones',
    roles: ['admin', 'coordinador', 'docente'],
  },
  {
    id: 'catalogos',
    label: 'Catálogos',
    icon: Layers,
    roles: ['admin', 'coordinador'],
    children: [
      { to: '/catalogos/ciclos', label: 'Ciclos escolares', icon: CalendarRange },
      { to: '/catalogos/turnos', label: 'Turnos', icon: Clock },
      { to: '/catalogos/grados', label: 'Grados', icon: BookOpen },
    ],
  },
  {
    id: 'reportes',
    label: 'Reportes',
    icon: FileBarChart,
    to: '/reportes',
    roles: ['admin', 'coordinador'],
  },
  {
    id: 'ajustes',
    label: 'Ajustes',
    icon: Settings,
    to: '/ajustes',
    roles: ['admin'],
  },
];

export function filterNavByRole(role: Role | null): NavSection[] {
  if (!role) return [];
  return NAV_SECTIONS.filter((section) => !section.roles || section.roles.includes(role)).map(
    (section) => ({
      ...section,
      children: section.children?.filter((child) => !child.roles || child.roles.includes(role)),
    }),
  );
}
