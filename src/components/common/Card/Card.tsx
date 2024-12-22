import React, { ComponentProps } from 'react';

interface CardProps extends ComponentProps<'div'> {}

const Card = ({ className, ...props }: CardProps) => {
  return (
    <div
      className={`rounded-2xl border bg-card p-2.5 ${className}`}
      {...props}
    />
  );
};

export default Card;
