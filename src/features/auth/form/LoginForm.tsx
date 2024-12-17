'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Input from '@/components/common/Input';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import useLoginUser from '@/hooks/mutations/useLoginUser';
import errorHandler from '@/utils/errorHandler';
import { zodResolver } from '@hookform/resolvers/zod';

export const schema = z.object({
  username: z.string().min(1, 'Please enter your username'),
  password: z.string().min(1, 'Please enter your password'),
});

type LoginSchema = z.infer<typeof schema>;

const LoginForm = () => {
  const methods = useForm<LoginSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: 'cazcade',
      password: 'awdawd123',
    },
  });

  const { handleSubmit, control, setError } = methods;

  const { mutateAsync: loginUserMutate, isPending: isLoginUserLoading } =
    useLoginUser();

  const handleLoginForm = async (data: LoginSchema) => {
    try {
      await loginUserMutate(data);
    } catch (error) {
      errorHandler(error, schema, setError);
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-6" onSubmit={handleSubmit(handleLoginForm)}>
        <div className="space-y-4 rounded-md">
          <div>
            <Input
              type="text"
              size="lg"
              name="username"
              control={control}
              placeholder="Username or email"
            />
          </div>
          <div>
            <Input
              type="password"
              size="lg"
              name="password"
              control={control}
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <Button
            type="submit"
            className="w-full rounded-xl"
            size="lg"
            isLoading={isLoginUserLoading}
          >
            Login
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
