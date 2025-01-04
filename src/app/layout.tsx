import './globals.css';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import getQueryClient from '@/lib/getQueryClient';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import prefetchCurrentSession from '@/requests/prefetch/prefetchCurrentSession';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { ThemeProvider } from '@/components/ui/theme-provider';
import NextTopLoader from 'nextjs-toploader';
import AuthProvider from '@/providers/AuthProvider';

const marRope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  display: 'auto',
  variable: '--body-font',
});

export const metadata: Metadata = {
  title: 'VibeOut',
  description:
    'Connect with friends, family and other people you know. Share photos and videos, send messages and get updates.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = getQueryClient();
  await prefetchCurrentSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${marRope.className} bg-background-light`}>
        <ReactQueryProvider>
          <NextTopLoader />
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <AuthProvider>
                <main>{children}</main>
              </AuthProvider>
            </HydrationBoundary>
            <Toaster />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
