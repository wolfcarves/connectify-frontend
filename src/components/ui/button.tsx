import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { AiOutlineLoading } from 'react-icons/ai';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex gap-1.5 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors select-none focus-visible:outline-none active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-primary/20 text-primary hover:opacity-70',
        tertiary: 'bg-secondary text-secondary-foreground hover:opacity-70',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent/50 hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        opacity: 'bg-transparent hover:opacity-80',
      },
      size: {
        default: 'h-10 px-4 py-2',
        xxs: 'h-6 rounded-md px-1.5',
        xs: 'h-8 rounded-md px-3',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  visible?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      icon,
      visible = true,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    if (!visible) return <></>;

    return (
      <>
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {!isLoading ? (
            <>
              {icon}
              {props.children}
            </>
          ) : (
            <AiOutlineLoading className="animate-spin text-lg" />
          )}
        </Comp>
      </>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
