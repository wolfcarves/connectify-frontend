import { ReactNode } from 'react';
import Link from 'next/link';
import Logo from '../Logo';
import Searchbar from '../Searchbar';

const Header = async ({ menu }: { menu?: ReactNode }) => {
  return (
    <header className="sticky top-0 border-b bg-background lg:container z-50">
      <div className="flex justify-between items-center h-16 md:h-20 w-full px-4 lg:px-0">
        <div className="flex items-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        <Searchbar />

        <div className="space-x-2">{menu}</div>
      </div>
    </header>
  );
};

export default Header;
