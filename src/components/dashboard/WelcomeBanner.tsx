import { ArrowRight, FileBarChart, Users } from 'lucide-react';

interface WelcomeBannerProps {
  name: string;
  subtitle: string;
}

export function WelcomeBanner({ name, subtitle }: WelcomeBannerProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 p-8 text-white shadow-xl sm:p-10 lg:p-12">
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-secondary-400/30 blur-3xl" />
      <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute inset-y-0 right-0 hidden w-1/3 opacity-20 md:block">
        <svg viewBox="0 0 200 200" className="h-full w-full" fill="none">
          <circle cx="100" cy="100" r="60" stroke="white" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="90" stroke="white" strokeWidth="0.8" />
          <circle cx="100" cy="100" r="30" stroke="white" strokeWidth="1.2" />
        </svg>
      </div>
      <div className="relative max-w-2xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/70">
          Panel docente
        </p>
        <h2 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.25rem]">
          Hola, {name} 👋
        </h2>
        <p className="mt-3 text-base text-white/80 sm:text-lg lg:text-xl">{subtitle}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-primary-700 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Users className="h-4 w-4" />
            Ver alumnos
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-transparent px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
          >
            <FileBarChart className="h-4 w-4" />
            Generar reporte
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
