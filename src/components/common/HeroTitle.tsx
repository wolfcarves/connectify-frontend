import React from 'react';
import { Button } from '../ui/button';

const HeroTitle = () => {
  return (
    <div className="my-24">
      <div className="space-y-6">
        <h1 className="text-center text-[3rem] leading-[3.5rem] md:leading-[5.5rem] md:text-[4.5rem] font-extrabold bg-clip-text bg-gradient-to-b from-foreground to-foreground/50 text-transparent">
          Discover All Projects In One Place
        </h1>

        <div className="flex flex-col items-center w-full max-w-[55rem] mx-auto">
          <p className="text-center text-lg md:text-xl text-foreground/80 py-[40px] px-0 sm:px-8 leading-[1.5]">
            Built by passionate developer name{' '}
            <span className="text-foreground font-semibold">
              Rodel Crisosto
            </span>
            , The goal of this simple project is to learn RBAC, Docker,
            Deployment and Testing.
          </p>

          <div className="space-x-4">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="secondary">
              View Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroTitle;
