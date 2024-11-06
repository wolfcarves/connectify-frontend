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
    return <aside className={`min-w-[15rem] ${className}`} />;
  }

  return (
    <aside className={`min-w-[15rem] ${className}`}>
      <div className={`fixed min-w-[15rem]`}>{children}</div>
    </aside>
  );
};

export default Sidebar;
