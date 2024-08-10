'use client';

import { FormProvider, useForm } from 'react-hook-form';
import Input from './Input';
import { z } from 'zod';
import { IoSearchOutline } from 'react-icons/io5';

const searchSchema = z.object({
  query: z.string(),
});

type SearchSchema = z.infer<typeof searchSchema>;

const Searchbar = () => {
  const methods = useForm<SearchSchema>();
  const { control, handleSubmit } = methods;

  const handleSearch = (data: SearchSchema) => {};

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleSearch)}
        className="flex items-center gap-1 ms-40"
      >
        <IoSearchOutline className="text-xl" />
        <Input
          type="text"
          name="query"
          control={control}
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 mt-0"
          placeholder="Search "
        />
      </form>
    </FormProvider>
  );
};

export default Searchbar;
