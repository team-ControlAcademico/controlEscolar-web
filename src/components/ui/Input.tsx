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
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-600"
        >
          {label}
        </label>
      ) : null}
      <div className="relative">
        {leftIcon ? (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-400">
            {leftIcon}
          </span>
        ) : null}
        <input
          id={inputId}
          {...rest}
          className={`w-full rounded-lg border border-neutral-300 bg-white py-2.5 text-sm text-neutral-900 shadow-sm transition-colors placeholder:text-neutral-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100 ${leftIcon ? 'pl-10 pr-3' : 'px-3'} ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''} ${className}`}
        />
      </div>
      {error ? (
        <p className="mt-1 text-xs font-medium text-red-600">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-neutral-500">{hint}</p>
      ) : null}
    </div>
  );
}
