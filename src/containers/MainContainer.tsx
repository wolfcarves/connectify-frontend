import React, { ComponentProps } from 'react';

type MainContainerProps = ComponentProps<'div'>;

const MainContainer = ({
  children,
  className,
  ...props
}: MainContainerProps) => {
  return (
    <div className={`pb-14 md:pb-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default MainContainer;
