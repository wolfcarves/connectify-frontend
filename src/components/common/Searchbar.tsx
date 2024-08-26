'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { IoSearchOutline } from 'react-icons/io5';
import CenterContainer from './Container/CenterContainer';

const searchSchema = z.object({
  query: z.string(),
});

type SearchSchema = z.infer<typeof searchSchema>;

const Searchbar = () => {
  const methods = useForm<SearchSchema>();
  const { control, handleSubmit } = methods;

  const handleSearch = (data: SearchSchema) => {};

  return (
    <CenterContainer className="ps-10">
      <form
        onSubmit={handleSubmit(handleSearch)}
        className="flex items-center gap-3"
      >
        <IoSearchOutline className="text-xl" />

        <input
          type="text"
          name="query"
          className="border-0 text-sm w-full bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none mt-0"
          placeholder="Search "
        />
      </form>
    </CenterContainer>
  );
};

export default Searchbar;
