'use client';

import HeaderLogo from './HeaderLogo';
import HeaderMenu from './HeaderMenu';

const Header = () => {
  return (
    <header className="sticky top-0 border-b border-b-border/50 bg-background dark:bg-background-light z-50">
      <div className="flex justify-between items-center lg:container h-14 md:h-16 w-full px-4 lg:px-0">
        <HeaderLogo />
        <HeaderMenu />
      </div>
    </header>
  );
};

export default Header;
