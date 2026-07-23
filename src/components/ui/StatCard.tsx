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
    iconBg: 'bg-primary/15',
    iconText: 'text-primary',
    hoverBg: 'group-hover:bg-primary',
    hoverText: 'group-hover:text-primary-foreground',
    hint: 'text-primary',
  },
  secondary: {
    iconBg: 'bg-secondary/15',
    iconText: 'text-secondary',
    hoverBg: 'group-hover:bg-secondary',
    hoverText: 'group-hover:text-secondary-foreground',
    hint: 'text-secondary',
  },
};

export function StatCard({ icon, label, value, hint, tone = 'primary', trend }: StatCardProps) {
  const palette = tonePalette[tone];
  const trendGlyph = trend === 'up' ? '↑' : trend === 'down' ? '↓' : trend === 'flat' ? '→' : '';
  return (
    <div className="group rounded-2xl border border-border bg-surface p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover lg:p-7">
      <div
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-200 ${palette.iconBg} ${palette.iconText} ${palette.hoverBg} ${palette.hoverText}`}
      >
        {icon}
      </div>
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className="mt-1.5 font-heading text-4xl font-bold tracking-tight text-foreground">
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
