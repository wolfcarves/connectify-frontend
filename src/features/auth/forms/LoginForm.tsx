'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Input from '@/components/common/Input';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import useLoginUserMutation from '@/hooks/mutations/useLoginUserMutation';
import errorHandler from '@/utils/errorHandler';

export const schema = z.object({
  username: z.string(),
  password: z.string(),
});

type LoginSchema = z.infer<typeof schema>;

const LoginForm = () => {
  const methods = useForm<LoginSchema>({
    defaultValues: {
      username: 'cazcade',
      password: 'awdawd123',
    },
  });
  const { handleSubmit, control, setError } = methods;

  const { mutateAsync: loginUserMutate, isPending: isLoginUserLoading } =
    useLoginUserMutation();

  const handleLoginForm = async (data: LoginSchema) => {
    try {
      await loginUserMutate(data);
    } catch (error) {
      errorHandler(error, schema, setError);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="my-20 mx-auto w-full max-w-[28rem]">
        <div className="my-20 bg-background px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            <div className="flex flex-col gap-1 items-center space-y-2">
              <div className="w-12 h-12 bg-secondary rounded-lg"></div>

              <h2 className="text-3xl font-bold text-foreground">
                Login to your account
              </h2>

              <p className="text-lg text-foreground/80">Welcome come back</p>
            </div>

            <form
              className="space-y-6"
              onSubmit={handleSubmit(handleLoginForm)}
            >
              <div className="space-y-4 rounded-md">
                <div>
                  <Input
                    type="text"
                    name="username"
                    control={control}
                    placeholder="Username or email"
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    name="password"
                    control={control}
                    placeholder="Password"
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full mt-32 rounded-full"
                  isLoading={isLoginUserLoading}
                >
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default LoginForm;
