import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverable?: boolean;
}

export function Card({ children, hoverable = false, className = '', ...rest }: CardProps) {
  const hover = hoverable ? 'transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover cursor-pointer' : '';
  return (
    <div
      {...rest}
      className={`rounded-xl border border-border bg-surface/70 backdrop-blur-md shadow-card ${hover} ${className}`}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export function CardHeader({ title, subtitle, action, className = '' }: CardHeaderProps) {
  return (
    <div
      className={`flex items-start justify-between gap-4 border-b border-border px-6 py-4 ${className}`}
    >
      <div>
        <h3 className="font-heading text-lg font-semibold text-foreground">{title}</h3>
        {subtitle ? <p className="mt-0.5 text-sm text-muted">{subtitle}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function CardBody({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
