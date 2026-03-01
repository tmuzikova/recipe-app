import type { ReactNode } from 'react';

type FormFieldProps = {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

export const FormField = ({
  label,
  htmlFor,
  required,
  hint,
  error,
  className = '',
  children,
}: FormFieldProps) => (
  <div className={className}>
    {label && (
      <label
        htmlFor={htmlFor}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-primary-500"> *</span>}
        {hint && <span className="ml-1 font-normal text-gray-400">{hint}</span>}
      </label>
    )}
    {children}
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);
