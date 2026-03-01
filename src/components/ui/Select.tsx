import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type SelectHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

const selectVariants = cva(
  'w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-1',
  {
    variants: {
      hasError: {
        true: 'border-red-400 focus:border-red-500 focus:ring-red-500',
        false:
          'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
      },
    },
    defaultVariants: {
      hasError: false,
    },
  },
);

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> &
  VariantProps<typeof selectVariants> & {
    children: ReactNode;
  };

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ hasError, className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(selectVariants({ hasError }), className)}
      {...props}
    >
      {children}
    </select>
  ),
);

Select.displayName = 'Select';
