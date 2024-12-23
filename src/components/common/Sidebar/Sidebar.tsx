'use client';

import React from 'react';

import { useParams, usePathname } from 'next/navigation';
import { ComponentProps, useEffect, useState } from 'react';
import useSession from '@/hooks/useSession';
interface SidebarProps extends ComponentProps<'aside'> {
  position: 'left' | 'right';
  includedRoutes?: string[];
}

const Sidebar = ({ children, className, includedRoutes }: SidebarProps) => {
  const params = useParams();
  const { username } = useSession();

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

    if (params.username) {
      setRender(username === params.username);
    }
  }, [includedRoutes, params.username, pathname, username]);

  if (!render) {
    return <aside className={`w-[16rem] ${className}`} />;
  }

  return (
    <aside className={`w-[16rem] ${className}`}>
      <div
        className={`fixed w-[16rem] h-[calc(100vh-10rem)] overflow-auto
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-gray-300
      dark:[&::-webkit-scrollbar-track]:bg-muted/20
      dark:[&::-webkit-scrollbar-thumb]:bg-muted
        `}
      >
        {children}
      </div>
    </aside>
  );
};

export default Sidebar;
