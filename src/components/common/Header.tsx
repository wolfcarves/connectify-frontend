import React from 'react';
import Logo from './Logo';
import Searchbar from './Searchbar';
import { Button } from '../ui/button';
import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <div className="container flex justify-between items-center h-24">
        <div className="flex items-center">
          <Logo />
          <Searchbar />
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
