import { InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  inputId: string; // required — must be associated with a <label>
}

// WHY inputId IS REQUIRED: AR-03 — every input must have a programmatically
// associated label. Making this a required prop forces the pattern at the type level.
export function Input({ error, inputId, className, ...props }: InputProps) {
  return (
    <>
      <input
        id={inputId}
        aria-describedby={error ? `${inputId}-error` : undefined}
        aria-invalid={error ? 'true' : undefined}
        className={clsx(
          'w-full border rounded px-3 py-2 focus-visible:ring-2 focus-visible:ring-primary-600',
          error ? 'border-error' : 'border-gray-300',
          className,
        )}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} role="alert" className="text-error text-sm mt-1">
          {error}
        </p>
      )}
    </>
  );
}
