import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/src/lib/utils';

const buttonVariants = cva(
  'cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary/90',
        secondary:
          'bg-background text-background-foreground hover:bg-background/80 border border-border',
        outline:
          'border border-border bg-transparent text-white hover:bg-border/10',
        ghost: 'bg-transparent hover:bg-border/10 text-white',
        link: 'bg-transparent underline-offset-4 hover:underline text-primary',
        destructive:
          'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
        destructiveOutline:
          'text-red-600 hover:bg-red-600 hover:text-white focus-visible:ring-red-500',
        destructiveRounded:
          'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 rounded-full',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3',
        lg: 'h-10 px-6',
      },
    },
    compoundVariants: [
      {
        variant: 'destructiveRounded',
        size: 'sm',
        className: 'px-2',
      },
      {
        variant: 'destructiveRounded',
        size: 'lg',
        className: 'px-6',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
