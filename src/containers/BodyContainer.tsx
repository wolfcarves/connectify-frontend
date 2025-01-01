import React, { ComponentProps } from 'react';

type BodyContainerProps = ComponentProps<'div'>;

const BodyContainer = ({
  children,
  className,
  ...props
}: BodyContainerProps) => {
  return (
    <div
      className={`flex gap-x-4 lg:container min-h-screen py-10 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default BodyContainer;
