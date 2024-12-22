'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Input from '@/components/common/Input';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import useLoginUser from '@/hooks/mutations/useLoginUser';
import errorHandler from '@/utils/errorHandler';
import { zodResolver } from '@hookform/resolvers/zod';
import Typography from '@/components/ui/typography';

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
              name="username"
              control={control}
              placeholder="Username or email"
              autoComplete="off"
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

        <div className="space-y-2">
          <Button
            type="submit"
            className="w-full rounded-xl"
            isLoading={isLoginUserLoading}
          >
            Login
          </Button>

          <Button type="button" variant="link" className="w-full rounded-xl">
            Create an account
          </Button>
        </div>

        <div className="flex gap-x-2 items-center w-full">
          <div className="h-[1px] flex flex-1 bg-muted" />
          <Typography.Span title="Or authorize with" size="sm" />
          <div className="h-[1px] flex flex-1 bg-muted" />
        </div>

        <div className="flex gap-x-2">
          <Button type="button" variant="outline" className="w-full rounded-xl">
            Google
          </Button>
          <Button type="button" variant="outline" className="w-full rounded-xl">
            Facebook
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
