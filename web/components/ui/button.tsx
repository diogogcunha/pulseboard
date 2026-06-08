import { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

// WHY A SHARED BUTTON COMPONENT: Centralizes the focus style (AR-01) and
// disabled state styling. If the design system changes, one file changes.
export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={clsx(
        'rounded font-medium focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-600': variant === 'primary',
          'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus-visible:ring-gray-400': variant === 'secondary',
          'bg-error text-white hover:bg-red-700 focus-visible:ring-red-500': variant === 'danger',
        },
        {
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        className,
      )}
    >
      {isLoading ? 'Loading…' : children}
    </button>
  );
}
