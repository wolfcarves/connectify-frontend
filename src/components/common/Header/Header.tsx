'use client';

import SideContainer from '@/containers/SideContainer';
import HeaderLogo from './HeaderLogo';
import HeaderMenu from './HeaderMenu';
import CenterContainer from '@/containers/CenterContainer';
import Searchbar from '../Searchbar/Searchbar';

const Header = () => {
  return (
    <header className="sticky top-0 bg-background dark:bg-background-light z-50">
      <div className="flex justify-between items-center lg:container h-14 md:h-16 w-full px-2 lg:px-4">
        <SideContainer position="left">
          <HeaderLogo />
        </SideContainer>

        <CenterContainer className="px-4">
          <Searchbar />
        </CenterContainer>

        <SideContainer position="right">
          <HeaderMenu />
        </SideContainer>
      </div>
    </header>
  );
};

export default Header;
