'use client';

import React from 'react';
import { ComponentProps, useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import SideContainer from '@/containers/SideContainer';

interface SidebarProps extends ComponentProps<'aside'> {
  position: 'left' | 'right';
  includedRoutes?: string[];
}

const Sidebar = ({
  children,
  className,
  position,
  includedRoutes,
}: SidebarProps) => {
  const params = useParams();

  const pathname = usePathname();
  const [render, setRender] = useState<boolean>(false);

  useEffect(() => {
    if (includedRoutes) {
      const regex = new RegExp(includedRoutes?.join('|'), 'i');
      const isIncluded = regex.test(pathname);

      setRender(isIncluded);
    } else {
      setRender(true);
    }
  }, [includedRoutes, params.username, pathname]);

  if (!render) {
    return <SideContainer position={position} />;
  }

  return (
    <SideContainer position={position}>
      <div
        className={`fixed ${position === 'left' ? 'w-[16rem]' : 'w-[20rem]'} h-[calc(100vh-10rem)] overflow-auto
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-muted/20
        dark:[&::-webkit-scrollbar-thumb]:bg-muted
        ${className}`}
      >
        {children}
      </div>
    </SideContainer>
  );
};

export default Sidebar;
