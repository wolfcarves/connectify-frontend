'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BackButton from '@/components/common/BackButton';

const SignUpForm = () => {
  return (
    <div className="my-20 mx-auto w-full max-w-[28rem]">
      <div className="my-20 bg-background px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg space-y-8">
          <div className="flex items-start">
            <BackButton />
          </div>
          <div>
            <h2 className=" text-center text-3xl font-bold tracking-tight text-foreground">
              Sign up for an account
            </h2>
          </div>

          <form className="mt-8 space-y-6" action="#" method="POST">
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <Label htmlFor="email" className="sr-only">
                  Email address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 px-3 text-foreground ring-1 ring-inset ring-muted placeholder:text-muted-foreground focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
              <div>
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full border-0 py-1.5 px-3 text-foreground ring-1 ring-inset ring-muted placeholder:text-muted-foreground focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
              </div>
              <div>
                <Label htmlFor="confirm-password" className="sr-only">
                  Confirm Password
                </Label>
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full border-0 py-1.5 px-3 text-foreground ring-1 ring-inset ring-muted placeholder:text-muted-foreground focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  placeholder="Confirm Password"
                />
              </div>
              <div>
                <Label htmlFor="organization" className="sr-only">
                  Organization
                </Label>
                <Input
                  id="organization"
                  name="organization"
                  type="text"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 px-3 text-foreground ring-1 ring-inset ring-muted placeholder:text-muted-foreground focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  placeholder="Organization"
                />
              </div>
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
  );
};

export default SignUpForm;
