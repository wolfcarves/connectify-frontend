import Header from '@/components/common/Header/Header';
import HeaderMenuLink from '@/components/common/Header/HeaderMenuLink';
import LoginForm from '@/features/auth/LoginForm';

export default function LoginPage() {
  return (
    <>
      <Header menu={<HeaderMenuLink href="/signup" label="Create account" />} />
      <LoginForm />
    </>
  );
}
