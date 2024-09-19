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
    <div className="my-10 space-y-4">
      <h1 className="font-semibold">Account</h1>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleLogoutUser)}>
          <Button variant="destructive" isLoading={isDestroySessionLoading}>
            Logout account
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default LogoutForm;
