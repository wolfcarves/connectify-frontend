import React from 'react';
import Logo from './Logo';
import Searchbar from './Searchbar';
import { Button } from '../ui/button';
import { GoPlus } from 'react-icons/go';

const Header = () => {
  return (
    <header>
      <div className="container flex justify-between items-center h-24">
        <div className="flex items-center">
          <Logo />
          <Searchbar />
        </div>

        <div>
          <Button size="xs" className="rounded-full">
            Create post
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
