import { Outlet } from "react-router-dom";
import { useTheme } from "@/context/theme-context";
import { Sun, Moon } from "lucide-react";

export default function AuthLayout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden transition-all duration-300 bg-transparent"
    >
      {/* Theme toggle (top right) */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200 shadow-md"
        aria-label="Cambiar tema"
      >
        {theme === 'dark' ? <Sun className="h-4 w-4 text-white" /> : <Moon className="h-4 w-4 text-neutral-800" />}
      </button>

      {/* Branded Logo Box */}
      <div className="mb-8 text-center flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-300">
        <div className="bg-white px-6 py-2.5 rounded-xl shadow-lg border border-neutral-100 flex items-center font-heading text-2xl font-bold tracking-tight select-none mb-2">
          <span className="text-neutral-500 mr-1.5">Control</span>
          <span className="text-[#0284C7]">Escolar</span>
        </div>
        <p className={`mt-1 text-sm font-semibold tracking-wide ${theme === 'dark' ? 'text-white/80' : 'text-neutral-600'}`}>
          Sistema de gestión académica
        </p>
      </div>

      <Outlet />
    </div>
  );
}

