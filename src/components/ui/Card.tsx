import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverable?: boolean;
}

export function Card({ children, hoverable = false, className = '', ...rest }: CardProps) {
  const hover = hoverable ? 'transition-all duration-200 hover:-translate-y-1 hover:shadow-lg' : '';
  return (
    <div
      {...rest}
      className={`rounded-xl border border-neutral-200 bg-white shadow-sm ${hover} ${className}`}
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
      className={`flex items-start justify-between gap-4 border-b border-neutral-100 px-6 py-4 ${className}`}
    >
      <div>
        <h3 className="font-heading text-lg font-semibold text-neutral-900">{title}</h3>
        {subtitle ? <p className="mt-0.5 text-sm text-neutral-500">{subtitle}</p> : null}
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
