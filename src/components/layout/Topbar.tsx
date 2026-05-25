import { Bell, LogOut, Menu } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { useAuth } from '../../hooks/useAuth';

interface TopbarProps {
  onOpenSidebar: () => void;
}

const ROLE_LABEL: Record<string, string> = {
  admin: 'Administrador',
  coordinador: 'Coordinador',
  docente: 'Docente',
  invitado: 'Invitado',
};

export function Topbar({ onOpenSidebar }: TopbarProps) {
  const { user, logout } = useAuth();
  const userName = user?.nombre ?? 'Invitado';
  const roleLabel = user ? (ROLE_LABEL[user.role] ?? user.role) : '';

  return (
    <header className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/80 backdrop-blur-md">
      <div className="flex h-20 items-center justify-between gap-4 px-5 sm:px-8 lg:px-10 xl:px-12">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onOpenSidebar}
            className="rounded-lg p-2 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 lg:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="hidden min-w-0 flex-col leading-tight lg:flex">
            <p className="truncate font-heading text-base font-semibold text-neutral-900">
              Panel {roleLabel.toLowerCase()}
            </p>
            <p className="truncate text-xs text-neutral-500">
              {new Date().toLocaleDateString('es-MX', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          <button
            type="button"
            className="relative rounded-full p-2.5 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            aria-label="Notificaciones"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-stone-50" />
          </button>

          <div className="flex items-center gap-3 rounded-full bg-white py-1.5 pl-1.5 pr-4 shadow-sm">
            <Avatar name={userName} size="md" />
            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-neutral-900">{userName}</p>
              <p className="text-[11px] text-neutral-500">{roleLabel}</p>
            </div>
          </div>

          {user ? (
            <button
              type="button"
              onClick={logout}
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 sm:inline-flex"
              aria-label="Cerrar sesión"
            >
              <LogOut className="h-4 w-4" />
              Salir
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
