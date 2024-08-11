'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Input from '@/components/common/Input';
import BackButton from '@/components/common/BackButton';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import useSignUpUserMutation from '@/hooks/mutation/useSignUpUserMutation';
import { zodResolver } from '@hookform/resolvers/zod';

export const signUpSchema = z
  .object({
    email: z
      .string()
      .email()
      .min(1, 'Please enter your email')
      .max(100, 'Invalid email'),
    username: z
      .string()
      .min(1, 'Please enter your username')
      .max(30, 'User is too long'),
    password: z.string(),
    confirm_password: z.string(),
  })
  .superRefine(({ password, confirm_password }, { addIssue }) => {
    if (password !== confirm_password) {
      addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password did not match',
        path: ['password'],
      });

      addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password did not match',
        path: ['confirm_password'],
      });
    }
  });

type SignUpSchema = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const methods = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const { handleSubmit, control } = methods;

  const { mutateAsync: signUpUserMutate } = useSignUpUserMutation();

  const handleSignUpForm = async (data: SignUpSchema) => {
    // await signUpUserMutate(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="my-10 mx-auto w-full max-w-[28rem]">
        <div className="bg-background px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-lg space-y-8">
            <div className="flex items-start">
              <BackButton />
            </div>
            <div>
              <h2 className=" text-center text-3xl font-bold tracking-tight text-foreground">
                Sign up for an account
              </h2>
            </div>

            <form
              onSubmit={handleSubmit(handleSignUpForm)}
              className="mt-8 space-y-6"
            >
              <div className="space-y-4 rounded-md shadow-sm">
                <Input
                  label="Email"
                  name="email"
                  control={control}
                  placeholder="Email address"
                />

                <Input
                  label="Username"
                  name="username"
                  control={control}
                  placeholder="Username"
                />

                <Input
                  label="Password"
                  name="password"
                  type="password"
                  control={control}
                  placeholder="Password"
                />

                <Input
                  label="Confirm password"
                  name="confirm_password"
                  type="password"
                  control={control}
                  placeholder="Re-enter your password"
                />
              </div>

              <div>
                <Button type="submit" className="w-full mt-32 rounded-full">
                  Sign up
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default SignUpForm;
