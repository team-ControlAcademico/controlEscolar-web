import { useState } from 'react';

interface TopbarProps {
  sidebarCollapsed: boolean;
}

export function Topbar({ sidebarCollapsed }: TopbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`sticky top-0 z-30 border-b border-neutral-200 bg-white/80 backdrop-blur-xl transition-all duration-300 ${
        sidebarCollapsed ? 'ml-[72px]' : 'ml-64'
      }`}
    >
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
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

        {/* Search bar */}
        <div className="hidden flex-1 max-w-md lg:block">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Buscar alumnos, grupos..."
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2 pl-10 pr-4 text-sm text-neutral-700 placeholder-neutral-400 transition-colors focus:border-secondary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary-400/20"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Notification bell */}
          <button className="relative rounded-xl p-2.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent-500 ring-2 ring-white" />
          </button>

          {/* User avatar */}
          <div className="flex items-center gap-2.5 rounded-xl py-1.5 pl-1.5 pr-3 transition-colors hover:bg-neutral-50">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-secondary-400 to-secondary-600 text-xs font-bold text-white shadow-sm">
              JK
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-neutral-900">Jhonatan</p>
              <p className="text-xs text-neutral-500">Administrador</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
