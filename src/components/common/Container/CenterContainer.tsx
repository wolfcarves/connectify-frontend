import React, { ComponentProps } from 'react';

type BaseCenterContainerProps = ComponentProps<'div'>;

interface CenterContainerProps extends BaseCenterContainerProps {}

const CenterContainer = ({
  children,
  className,
  ...props
}: CenterContainerProps) => {
  return (
    <div
      className={`flex-grow mx-auto w-full max-w-xl px-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default CenterContainer;
