'use client';

import React from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  return (
    <Button variant="ghost" className="px-2" onClick={() => router.back()}>
      <ArrowLeftIcon className="h-5 w-5" />
    </Button>
  );
};

export default BackButton;
