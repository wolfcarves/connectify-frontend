import AuthHeader from '@/components/common/AuthHeader';
import { ReactNode } from 'react';

const AuthLayoutChildContainer = ({ children }: { children: ReactNode }) => (
  <>
    <div className="my-20 mx-auto w-full max-w-[28rem]">{children}</div>
  </>
);

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AuthHeader />
      <AuthLayoutChildContainer>{children}</AuthLayoutChildContainer>
    </>
  );
}
