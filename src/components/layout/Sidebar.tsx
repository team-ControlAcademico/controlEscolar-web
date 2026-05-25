import { useMemo, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown, Search, X } from 'lucide-react';
import { filterNavByRole, type NavChild, type NavSection } from '../../config/nav';
import { useAuth } from '../../hooks/useAuth';
import { normalizeText } from '../../utils/search';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

function matchesSection(section: NavSection, query: string): NavSection | null {
  if (!query) return section;
  const q = normalizeText(query);
  const sectionMatches = normalizeText(section.label).includes(q);
  if (!section.children) {
    return sectionMatches ? section : null;
  }
  const filteredChildren = section.children.filter((c) => normalizeText(c.label).includes(q));
  if (sectionMatches) return section;
  if (filteredChildren.length === 0) return null;
  return { ...section, children: filteredChildren };
}

interface SectionGroupProps {
  section: NavSection;
  onNavigate: () => void;
}

function SectionGroup({ section, onNavigate }: SectionGroupProps) {
  const [open, setOpen] = useState(true);
  const Icon = section.icon;

  if (!section.children || section.children.length === 0) {
    if (!section.to) return null;
    return (
      <SectionLink to={section.to} label={section.label} Icon={Icon} onNavigate={onNavigate} />
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-stone-700 transition-colors hover:bg-primary-500/5 hover:text-stone-900"
        aria-expanded={open}
      >
        <Icon aria-hidden="true" className="size-5 shrink-0" />
        <span className="flex-1 text-left">{section.label}</span>
        <ChevronDown
          aria-hidden="true"
          className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open ? (
        <div className="mt-1 ml-3 flex flex-col gap-0.5 border-l border-stone-300/60 pl-3">
          {section.children.map((child) => (
            <ChildLink key={child.to} child={child} onNavigate={onNavigate} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

interface SectionLinkProps {
  to: string;
  label: string;
  Icon: NavSection['icon'];
  onNavigate: () => void;
}

function SectionLink({ to, label, Icon, onNavigate }: SectionLinkProps) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:underline ${
          isActive
            ? 'bg-primary-500/10 text-stone-900'
            : 'text-stone-700 hover:bg-primary-500/5 hover:text-stone-900'
        }`
      }
    >
      <Icon aria-hidden="true" className="size-5 shrink-0" />
      <span>{label}</span>
    </NavLink>
  );
}

interface ChildLinkProps {
  child: NavChild;
  onNavigate: () => void;
}

function ChildLink({ child, onNavigate }: ChildLinkProps) {
  const Icon = child.icon;
  return (
    <NavLink
      to={child.to}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors focus:outline-none focus-visible:underline ${
          isActive
            ? 'bg-primary-500/10 font-semibold text-stone-900'
            : 'text-stone-600 hover:bg-primary-500/5 hover:text-stone-900'
        }`
      }
    >
      <Icon aria-hidden="true" className="size-4 shrink-0" />
      <span>{child.label}</span>
    </NavLink>
  );
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { user } = useAuth();
  const [query, setQuery] = useState('');

  const sections = useMemo(() => {
    const visible = filterNavByRole(user?.role ?? null);
    if (!query) return visible;
    return visible.map((s) => matchesSection(s, query)).filter((s): s is NavSection => s !== null);
  }, [user?.role, query]);

  return (
    <>
      <a className="sr-only" href="#main-content">
        Saltar al contenido principal
      </a>

      {open ? (
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={onClose}
          className="fixed inset-0 z-10 bg-stone-900/10 backdrop-blur-xs lg:hidden"
        />
      ) : null}

      <nav
        aria-label="Navegación principal"
        className={`fixed left-0 top-0 z-30 flex h-svh w-60 shrink-0 flex-col border-r border-stone-300/60 bg-stone-200 p-4 transition-transform duration-300 lg:w-64 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-3 top-3 rounded-md p-1.5 text-stone-600 transition-colors hover:bg-stone-300/60 hover:text-stone-900 lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>

        <Link
          to="/"
          onClick={onClose}
          className="ml-2 flex w-fit items-center gap-2.5 text-2xl font-bold text-stone-900 underline-offset-2 hover:underline focus:outline-none focus-visible:underline"
        >
          <span className="sr-only">Inicio</span>
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-500 text-sm font-bold text-white"
          >
            CE
          </span>
          <span className="font-heading text-lg leading-tight">Control Escolar</span>
        </Link>

        <div className="relative my-4 flex w-full max-w-xs flex-col gap-1 text-stone-700">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-2 top-1/2 size-5 -translate-y-1/2 text-stone-500/70"
          />
          <input
            type="search"
            name="nav-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar en el menú"
            placeholder="Buscar módulo…"
            className="w-full rounded-md bg-stone-50 px-2 py-1.5 pl-9 text-sm placeholder:text-stone-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          />
        </div>

        <div className="flex flex-col gap-1.5 overflow-y-auto pb-6">
          {sections.length === 0 ? (
            <p className="px-2 py-3 text-xs text-stone-500">Sin módulos disponibles.</p>
          ) : (
            sections.map((section) => (
              <SectionGroup key={section.id} section={section} onNavigate={onClose} />
            ))
          )}
        </div>

        {user ? (
          <div className="mt-auto rounded-md border border-stone-300/60 bg-stone-50 px-3 py-2 text-xs">
            <p className="font-semibold text-stone-800">{user.nombre}</p>
            <p className="capitalize text-stone-500">{user.role}</p>
          </div>
        ) : null}
      </nav>
    </>
  );
}
