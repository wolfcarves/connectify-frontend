import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { ReactNode } from 'react';
import NextTopLoader from 'nextjs-toploader';
import AuthProvider from './AuthProvider';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ReactQueryProvider>
      <NextTopLoader />
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </AuthProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
