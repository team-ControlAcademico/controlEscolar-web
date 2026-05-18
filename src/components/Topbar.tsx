import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface TopbarProps {
  sidebarCollapsed: boolean;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export function Topbar({ sidebarCollapsed }: TopbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  const initials = user ? getInitials(user.name) : '??';
  const displayName = user?.name ?? '';

  return (
    <header
      className={`sticky top-0 z-30 border-b border-neutral-200 bg-white transition-all duration-300 ${
        sidebarCollapsed ? 'ml-[72px]' : 'ml-64'
      }`}
    >
      <div className="flex h-16 items-center justify-between px-6">
        {/* Mobile menu button */}
        <button
          className="rounded-lg p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Notification bell */}
          <button className="relative rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary-500" />
          </button>

          {/* Divider */}
          <div className="h-8 w-px bg-neutral-200" />

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen((v) => !v)}
              className="flex items-center gap-2.5 rounded-lg p-1 transition-colors hover:bg-neutral-50"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">
                {initials}
              </div>
              <span className="hidden text-sm font-medium text-neutral-700 sm:block">
                {displayName}
              </span>
              <svg
                className={`h-4 w-4 text-neutral-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {userMenuOpen && (
              <>
                {/* Backdrop */}
                <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                {/* Dropdown */}
                <div className="absolute right-0 z-20 mt-2 w-56 rounded-xl border border-neutral-200 bg-white py-1 shadow-lg">
                  <div className="border-b border-neutral-100 px-4 py-3">
                    <p className="text-sm font-medium text-neutral-800">{displayName}</p>
                    <p className="text-xs text-neutral-500">{user?.email}</p>
                    <span className="mt-1 inline-block rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium capitalize text-primary-700">
                      {user?.rol}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Cerrar sesión
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
