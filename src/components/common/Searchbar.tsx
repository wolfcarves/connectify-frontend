'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from './Input';
import { IoSearchOutline } from 'react-icons/io5';

const searchSchema = z.object({
  query: z.string(),
});

type SearchSchema = z.infer<typeof searchSchema>;

const Searchbar = () => {
  const methods = useForm<SearchSchema>();
  const { handleSubmit } = methods;

  const handleSearch = () => {};

  return (
    <form
      onSubmit={handleSubmit(handleSearch)}
      className="relative flex items-center gap-3"
    >
      <IoSearchOutline className="absolute start-2 text-xl text-muted/80" />
      <Input
        placeholder="Search"
        className="min-w-[300px] w-[50%] placeholder:text-medium px-8"
      />
    </form>
  );
};

export default Searchbar;
