'use client';

import useSession from '@/hooks/useSession';
import { useParams, usePathname } from 'next/navigation';
import { ComponentProps } from 'react';
interface SidebarProps extends ComponentProps<'aside'> {
  position: 'left' | 'right';
  excludedRoutes?: string[];
}

const Sidebar = ({
  children,
  className,
  position,
  excludedRoutes,
}: SidebarProps) => {
  const params = useParams<{ username: string }>();
  const session = useSession();
  const pathname = usePathname();
  const pathnameIsProfile = session.username === params.username;

  if (
    excludedRoutes?.includes(pathname) ||
    (pathnameIsProfile && position === 'right')
  ) {
    return <aside className={`min-w-[15rem] ${className}`} />;
  }

  return (
    <aside className={`min-w-[15rem] ${className}`}>
      <div className={`fixed min-w-[15rem]`}>{children}</div>
    </aside>
  );
};

export default Sidebar;
