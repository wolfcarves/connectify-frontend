import React, { ComponentProps } from 'react';

interface CardProps extends ComponentProps<'div'> {}

const Card = ({ className, ...props }: CardProps) => {
  return (
    <div
      className={`rounded-lg sm:rounded-2xl bg-card shadow-sm p-2.5 ${className}`}
      {...props}
    />
  );
};

export default Card;
