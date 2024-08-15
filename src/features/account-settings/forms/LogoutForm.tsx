'use client';

import { Button } from '@/components/ui/button';
import useDestroySession from '@/hooks/mutations/useDestroySession';
import { FormProvider, useForm } from 'react-hook-form';

const LogoutForm = () => {
  const methods = useForm();
  const { handleSubmit } = methods;

  const {
    mutateAsync: destroySessionMutate,
    isPending: isDestroySessionLoading,
  } = useDestroySession();

  const handleLogoutUser = async () => {
    await destroySessionMutate();
  };

  return (
    <FormProvider {...methods}>
      <form className="my-10" onSubmit={handleSubmit(handleLogoutUser)}>
        <Button variant="destructive" isLoading={isDestroySessionLoading}>
          Logout account
        </Button>
      </form>
    </FormProvider>
  );
};

export default LogoutForm;
