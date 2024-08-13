import React from 'react';
import Logo from './Logo';
import Searchbar from './Searchbar';
import { Button } from '../ui/button';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="lg:container">
      <div className="flex justify-between items-center h-24 w-full px-4 lg:px-0">
        <div className="flex items-center">
          <Logo />
          {/* <Searchbar /> */}
        </div>

        <div>
          <Link href="/post">
            <Button size="xs" className="rounded-full">
              Create post
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
