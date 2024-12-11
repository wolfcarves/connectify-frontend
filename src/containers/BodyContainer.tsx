import React, { ComponentProps } from 'react';

type BodyContainerProps = ComponentProps<'div'>;

const BodyContainer = ({
  children,
  className,
  ...props
}: BodyContainerProps) => {
  return (
    <div
      className={`flex flex-1 lg:container mt-5 px-2 md:px-4 py-10 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default BodyContainer;
