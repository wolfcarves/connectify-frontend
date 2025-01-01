import React, { ComponentProps } from 'react';

type BaseSideContainerProps = ComponentProps<'div'>;

interface SideContainerProps extends BaseSideContainerProps {
  position: 'left' | 'right';
}

const SideContainer = ({
  children,
  className,
  position,
  ...props
}: SideContainerProps) => {
  return (
    <aside
      className={`${position === 'left' ? 'w-[16rem]' : 'w-[20rem]'} ${className}`}
      {...props}
    >
      {children}
    </aside>
  );
};

export default SideContainer;
