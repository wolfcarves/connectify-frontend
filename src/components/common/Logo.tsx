import React, { ComponentProps } from 'react';
import { RiReactjsLine } from 'react-icons/ri';

interface LogoProps extends ComponentProps<'div'> {
  animated?: boolean;
  size?: 'base' | 'lg';
}

const Logo = ({
  animated = false,
  size = 'base',
  className,
  ...props
}: LogoProps) => {
  return (
    <div
      className={`
      ${size === 'base' ? 'w-11 h-11' : 'w-16 h-16'}
      group relative flex justify-center items-center bg-primary rounded-full select-none p-0.5 ${className}`}
      {...props}
    >
      <div
        className={`${animated ? 'animate-ping' : 'hidden'} absolute w-full h-full bg-primary rounded-full`}
      />

      <RiReactjsLine
        color="#FFFFFF"
        size={size === 'lg' ? 30 : 24}
        className={`${animated ? '' : 'group-hover:animate-spin'} duration-1000`}
      />
    </div>
  );
};

export default Logo;
