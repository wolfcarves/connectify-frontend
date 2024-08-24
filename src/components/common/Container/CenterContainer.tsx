import React, { ComponentProps } from 'react';

type BaseCenterContainerProps = ComponentProps<'div'>;

interface CenterContainerProps extends BaseCenterContainerProps {}

const CenterContainer = ({
  children,
  className,
  ...props
}: CenterContainerProps) => {
  return (
    <main
      className={`flex-grow mx-auto w-full max-w-lg ${className}`}
      {...props}
    >
      {children}
    </main>
  );
};

export default CenterContainer;
