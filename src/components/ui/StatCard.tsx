import type { ReactNode } from 'react';

type Tone = 'primary' | 'secondary';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  hint?: string;
  tone?: Tone;
  trend?: 'up' | 'down' | 'flat';
}

const tonePalette: Record<
  Tone,
  { iconBg: string; iconText: string; hoverBg: string; hoverText: string; hint: string }
> = {
  primary: {
    iconBg: 'bg-primary-100',
    iconText: 'text-primary-600',
    hoverBg: 'group-hover:bg-primary-500',
    hoverText: 'group-hover:text-white',
    hint: 'text-primary-600',
  },
  secondary: {
    iconBg: 'bg-secondary-100',
    iconText: 'text-secondary-600',
    hoverBg: 'group-hover:bg-secondary-400',
    hoverText: 'group-hover:text-primary-900',
    hint: 'text-secondary-600',
  },
};

export function StatCard({ icon, label, value, hint, tone = 'primary', trend }: StatCardProps) {
  const palette = tonePalette[tone];
  const trendGlyph = trend === 'up' ? '↑' : trend === 'down' ? '↓' : trend === 'flat' ? '→' : '';
  return (
    <div className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg lg:p-7">
      <div
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl transition-colors ${palette.iconBg} ${palette.iconText} ${palette.hoverBg} ${palette.hoverText}`}
      >
        {icon}
      </div>
      <p className="text-sm font-medium text-neutral-500">{label}</p>
      <p className="mt-1.5 font-heading text-4xl font-bold tracking-tight text-neutral-900">
        {value}
      </p>
      {hint ? (
        <p className={`mt-3 text-xs font-semibold ${palette.hint}`}>
          {trendGlyph ? <span className="mr-1">{trendGlyph}</span> : null}
          {hint}
        </p>
      ) : null}
    </div>
  );
}
