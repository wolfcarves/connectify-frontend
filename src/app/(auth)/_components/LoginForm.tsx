import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BackButton from '@/components/common/BackButton';
import Link from 'next/link';

const LoginForm = () => {
  return (
    <div className="my-20 bg-background px-4 sm:px-6 lg:px-8">
      <div className="space-y-10">
        <div className="flex flex-col gap-1 items-center space-y-2">
          <div className="w-14 h-14 bg-secondary rounded-lg"></div>

          <h2 className="text-3xl font-bold text-foreground">
            Login to your account
          </h2>

          <p className="text-lg text-foreground/80">Welcome come back</p>
        </div>

        <form className="space-y-6" action="#" method="POST">
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <Label htmlFor="email" className="sr-only">
                Email or username
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
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
  );
};

export default LoginForm;
