import { School } from 'lucide-react';

interface WelcomeBannerProps {
  name: string;
  subtitle: string;
  role?: string;
}

export function WelcomeBanner({ name, subtitle, role }: WelcomeBannerProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl p-8 text-white shadow-xl sm:p-10 lg:p-12"
      style={{ background: 'linear-gradient(135deg, #0284C7 0%, #4F46E5 50%, #7C3AED 100%)' }}
    >
      {/* Decorative blobs */}
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-12 left-1/2 h-40 w-40 rounded-full bg-white/5 blur-2xl" />

      {/* Icon top right */}
      <div className="absolute top-6 right-6 opacity-20">
        <School className="h-24 w-24" />
      </div>

      <div className="relative max-w-2xl">
        {role && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/60">
            {role}
          </p>
        )}
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Hola, {name} 👋
        </h2>
        <p className="mt-3 text-base text-white/75 sm:text-lg">{subtitle}</p>
      </div>
    </section>
  );
}
