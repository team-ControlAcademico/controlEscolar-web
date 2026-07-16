import type { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  label?: string;
  hint?: string;
  error?: string;
}

export function Input({ leftIcon, label, hint, error, className = '', id, ...rest }: InputProps) {
  const inputId = id ?? rest.name;
  return (
    <div className="w-full">
      {label ? (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
        >
          {label}
        </label>
      ) : null}
      <div className="relative">
        {leftIcon ? (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted">
            {leftIcon}
          </span>
        ) : null}
        <input
          id={inputId}
          {...rest}
          className={`w-full rounded-lg border border-border bg-background py-2.5 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${leftIcon ? 'pl-10 pr-3' : 'px-3'} ${error ? 'border-rejected focus:border-rejected focus:ring-rejected/20' : ''} ${className}`}
        />
      </div>
      {error ? (
        <p className="mt-1 text-xs font-medium text-rejected">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-muted">{hint}</p>
      ) : null}
    </div>
  );
}
