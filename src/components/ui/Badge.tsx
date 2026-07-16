import type { ReactNode } from 'react';

type Tone = 'primary' | 'secondary' | 'neutral' | 'success' | 'warning' | 'danger' | 'active' | 'inactive';

interface BadgeProps {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}

const toneClasses: Record<Tone, string> = {
  primary: 'bg-primary/15 text-primary',
  secondary: 'bg-secondary/15 text-secondary',
  neutral: 'bg-foreground/10 text-muted',
  success: 'bg-approved/15 text-approved',
  warning: 'bg-pending/15 text-pending',
  danger: 'bg-rejected/15 text-rejected',
  active: 'bg-approved/15 text-approved border border-approved/30',
  inactive: 'bg-foreground/5 text-muted border border-border',
};

export function Badge({ tone = 'neutral', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
