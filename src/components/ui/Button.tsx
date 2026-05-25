import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary-500 text-white shadow-md hover:bg-primary-600 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-primary-400',
  secondary:
    'bg-secondary-400 text-primary-900 shadow-md hover:bg-secondary-500 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-secondary-300',
  outline:
    'border border-neutral-300 bg-white text-neutral-700 shadow-sm hover:bg-neutral-50 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-neutral-300',
  ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100 focus-visible:ring-neutral-300',
  danger:
    'bg-red-500 text-white shadow-md hover:bg-red-600 hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-red-400',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
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
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-md ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {leftIcon ? <span className="flex h-4 w-4 items-center">{leftIcon}</span> : null}
      {children}
      {rightIcon ? <span className="flex h-4 w-4 items-center">{rightIcon}</span> : null}
    </button>
  );
}
