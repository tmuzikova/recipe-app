import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

const inputVariants = cva(
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

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ hasError, className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(inputVariants({ hasError }), className)}
      {...props}
    />
  ),
);

Input.displayName = 'Input';
