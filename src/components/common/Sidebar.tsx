import { ComponentProps } from 'react';

type SidebarProps = ComponentProps<'aside'>;

const Sidebar = ({ children, className }: SidebarProps) => {
  return (
    <aside className={`flex-grow max-w-[15rem] pe-5 ${className}`}>
      {children}
    </aside>
  );
};

export default Sidebar;
