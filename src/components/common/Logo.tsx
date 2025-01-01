'use client';

import React, { ComponentProps } from 'react';
import { useTheme } from 'next-themes';
import { RiReactjsLine } from 'react-icons/ri';

interface LogoProps extends ComponentProps<'div'> {
  size?: 'base' | 'lg';
}

const Logo = ({ size = 'base', className, ...props }: LogoProps) => {
  const { theme } = useTheme();

  return (
    <div
      className={`${theme === 'dark' && 'border-white'} ${size === 'base' ? 'w-11 h-11' : 'w-16 h-16'} flex justify-center items-center bg-primary rounded-full p-0.5 ${className}`}
      {...props}
    >
      <RiReactjsLine color="#FFFFFF" size={24} />
    </div>
  );
};

export default Logo;
