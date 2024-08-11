'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Input from '@/components/common/Input';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

type LoginSchema = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const methods = useForm<LoginSchema>();
  const { handleSubmit, control } = methods;

  const handleLoginForm = (data: LoginSchema) => {};

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
              <div className="space-y-4 rounded-md shadow-sm">
                <div>
                  <Input
                    name="username"
                    control={control}
                    placeholder="Username or email"
                  />
                </div>
                <div>
                  <Input
                    name="password"
                    control={control}
                    placeholder="Password"
                  />
                </div>
              </div>

              <div>
                <Button type="submit" className="w-full mt-32 rounded-full">
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
