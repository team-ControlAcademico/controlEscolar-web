import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
type Size = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary text-primary-foreground shadow-md hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-primary',
  secondary:
    'bg-secondary text-secondary-foreground shadow-md hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-secondary',
  outline:
    'border border-border bg-transparent text-foreground shadow-sm hover:bg-primary/10 hover:border-primary hover:text-primary hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-primary',
  ghost: 'bg-transparent text-muted hover:bg-primary/10 hover:text-primary focus-visible:ring-primary',
  danger:
    'bg-rejected text-white shadow-md hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-rejected',
  success:
    'bg-approved text-white shadow-md hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-approved',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs h-8',
  md: 'px-5 py-2.5 text-sm h-10',
  lg: 'px-6 py-3 text-base h-12',
  icon: 'w-9 h-9 p-0',
};

export function Button({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {leftIcon ? <span className="flex h-4 w-4 items-center">{leftIcon}</span> : null}
      {children}
      {rightIcon ? <span className="flex h-4 w-4 items-center">{rightIcon}</span> : null}
    </button>
  );
}
