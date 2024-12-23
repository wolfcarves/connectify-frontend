import React, { ComponentProps } from 'react';

type BaseCenterContainerProps = ComponentProps<'div'>;

interface CenterContainerProps extends BaseCenterContainerProps {}

const CenterContainer = ({
  children,
  className,
  ...props
}: CenterContainerProps) => {
  return (
    <main className="flex flex-1">
      <div
        className={`flex-grow mx-auto w-full max-w-lg ${className}`}
        {...props}
      >
        {children}
      </div>
    </main>
  );
};

export default CenterContainer;
