import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

const textareaVariants = cva(
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

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof textareaVariants>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ hasError, className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(textareaVariants({ hasError }), className)}
      {...props}
    />
  ),
);

Textarea.displayName = 'Textarea';
