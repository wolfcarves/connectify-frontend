import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { ReactNode } from 'react';
import NextTopLoader from 'nextjs-toploader';
import SessionProvider from './SessionProvider';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ReactQueryProvider>
      <NextTopLoader />
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <SessionProvider>{children}</SessionProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
