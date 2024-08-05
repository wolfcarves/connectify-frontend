import React from 'react';
import { Button } from '../ui/button';

const HeroTitle = () => {
  return (
    <div className="my-24">
      <div>
        <h1 className="text-center text-[4.5rem] font-extrabold">
          A Todo List Web Application
        </h1>

        <div className="flex flex-col items-center w-full max-w-[55rem] mx-auto">
          <p className="text-center text-xl text-foreground/80 py-[40px] px-0 sm:px-8 leading-[1.5]">
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
