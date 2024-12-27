import { cva } from 'class-variance-authority';
import { ComponentProps, ReactNode } from 'react';

const sizes = {
  xxs: 'text-xxs',
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  md: 'text-md',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
  '7xl': 'text-7xl',
  '8xl': 'text-8xl',
  '9xl': 'text-9xl',
};

const weights = {
  thin: 'font-thin',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
};

const typography = cva('-translate-y-[1px]', {
  variants: {
    size: sizes,
    color: {
      primary: 'text-primary',
      foreground: 'text-foreground',
      background: 'text-background',
      muted: 'text-muted-foreground',
      destructive: 'text-destructive',
    },
    weight: weights,
  },
  defaultVariants: {
    color: 'foreground',
    weight: 'normal',
  },
});

interface TypographyProps {
  title?: string | number | ReactNode;
  children?: ReactNode;
  size?: keyof typeof sizes;
  color?: 'primary' | 'foreground' | 'background' | 'muted' | 'destructive';
  className?: ComponentProps<'h1'>['className'];
  weight?: keyof typeof weights;
}

const H1 = ({
  title,
  size,
  color,
  weight,
  className,
  children,
}: TypographyProps) => {
  return (
    <h1
      className={`text-4xl ${typography({ size, color, weight, className })}`}
    >
      {title ?? children}
    </h1>
  );
};

const H2 = ({
  title,
  size,
  color,
  weight,
  className,
  children,
}: TypographyProps) => {
  return (
    <h2
      className={`text-3xl ${typography({ size, color, weight, className })}`}
    >
      {title ?? children}
    </h2>
  );
};

const H3 = ({
  title,
  size,
  color,
  weight,
  className,
  children,
}: TypographyProps) => {
  return (
    <h3
      className={`text-2xl ${typography({ size, color, weight, className })}`}
    >
      {title ?? children}
    </h3>
  );
};

const H4 = ({
  title,
  size,
  color,
  weight,
  className,
  children,
}: TypographyProps) => {
  return (
    <h4 className={`text-xl ${typography({ size, color, weight, className })}`}>
      {title ?? children}
    </h4>
  );
};

const H5 = ({
  title,
  size,
  color,
  weight,
  className,
  children,
}: TypographyProps) => {
  return (
    <h5 className={`text-lg ${typography({ size, color, weight, className })}`}>
      {title ?? children}
    </h5>
  );
};

const H6 = ({
  title,
  size,
  color,
  weight,
  className,
  children,
}: TypographyProps) => {
  return (
    <h6
      className={`text-base ${typography({ size, color, weight, className })}`}
    >
      {title ?? children}
    </h6>
  );
};

const P = ({
  title,
  size,
  color,
  weight,
  className,
  children,
}: TypographyProps) => {
  return (
    <p
      className={`text-base ${typography({ size, color, weight, className })}`}
    >
      {title ?? children}
    </p>
  );
};

const Span = ({
  title,
  size,
  color,
  weight,
  className,
  children,
}: TypographyProps) => {
  return (
    <span
      className={`text-base ${typography({ size, color, weight, className })}`}
    >
      {title ?? children}
    </span>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  P,
  Span,
};
