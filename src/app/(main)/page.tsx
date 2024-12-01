/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/feed');
  }, []);

  return <>Test</>;
};

export default IndexPage;
