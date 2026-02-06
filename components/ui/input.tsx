import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'flex h-11 w-full rounded-2xl border border-(--border) bg-(--surface) px-4 text-sm text-(--foreground) shadow-sm placeholder:text-(--muted-foreground) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring)',
        className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';

export { Input };
