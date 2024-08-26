'use client';
import { usePathname } from 'next/navigation';
import { ComponentProps } from 'react';
interface SidebarProps extends ComponentProps<'aside'> {
  excludedRoutes?: string[];
}

const Sidebar = ({ children, className, excludedRoutes }: SidebarProps) => {
  const pathname = usePathname();

  if (excludedRoutes?.includes(pathname)) {
    return <></>;
  }

  return (
    <aside className={`min-w-[15rem] ${className}`}>
      <div className={`fixed min-w-[15rem]`}>{children}</div>
    </aside>
  );
};

export default Sidebar;
