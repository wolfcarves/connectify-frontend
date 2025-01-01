import './globals.css';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import Providers from '@/providers/Providers';
import getQueryClient from '@/lib/getQueryClient';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import prefetchCurrentSession from '@/requests/prefetch/prefetchCurrentSession';

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
        <Providers>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <main>{children}</main>
          </HydrationBoundary>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
