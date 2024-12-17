import React from 'react';
import { Button } from '@/components/ui/button';
import { CiSearch } from 'react-icons/ci';

const HeaderSearch = () => {
  return (
    <div className="flex items-center gap-x-2 select-none">
      <input
        placeholder="Search"
        className="border bg-card rounded-2xl w-[30rem] ms-[5rem] py-2 px-4 focus:outline-none"
      />

      <Button
        icon={<CiSearch size={22} />}
        variant="ghost"
        size="sm"
        className="rounded-lg border border-transparent hover:border-border"
      />
    </div>
  );
};

export default HeaderSearch;
