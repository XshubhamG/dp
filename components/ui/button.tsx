import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring) disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        default: 'bg-(--primary) text-(--primary-foreground) hover:brightness-95',
        secondary: 'bg-(--accent) text-(--foreground) hover:brightness-95',
        ghost: 'bg-transparent text-(--foreground) hover:bg-(--muted)'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  )
);
Button.displayName = 'Button';

export { Button, buttonVariants };
