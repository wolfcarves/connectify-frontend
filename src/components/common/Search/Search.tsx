import React from 'react';
import Input, { InputProps } from '../Input';
import { FieldValues } from 'react-hook-form';
import { CiSearch } from 'react-icons/ci';

const Search = <T extends FieldValues>(props: InputProps<T>) => {
  return (
    <div className="relative">
      <Input autoComplete="off" className="pe-10" {...props} />

      <div className="flex items-center absolute end-0 top-0 bottom-0 px-2">
        <CiSearch className="text-2xl" />
      </div>
    </div>
  );
};

export default Search;
