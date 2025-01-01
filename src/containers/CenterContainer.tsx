import React, { ComponentProps } from 'react';

type BaseCenterContainerProps = ComponentProps<'div'>;

interface CenterContainerProps extends BaseCenterContainerProps {}

const CenterContainer = ({
  children,
  className,
  ...props
}: CenterContainerProps) => {
  return (
    <div className="flex flex-1">
      <div
        className={`flex-grow mx-auto w-full max-w-3xl ${className}`}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export default CenterContainer;
