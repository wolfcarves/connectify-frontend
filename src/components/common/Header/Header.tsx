import { ReactNode } from 'react';
import Link from 'next/link';
import Logo from '../Logo';

const Header = async ({ menu }: { menu?: ReactNode }) => {
  return (
    <header className="lg:container">
      <div className="flex justify-between items-center h-24 w-full px-4 lg:px-0">
        <div className="flex items-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        <div className="space-x-2">{menu}</div>
      </div>
    </header>
  );
};

export default Header;
