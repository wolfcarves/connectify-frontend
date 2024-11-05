import Header from '@/components/common/Header/Header';
import HeaderMenuLink from '@/components/common/Header/HeaderMenuLink';
import SignUpForm from '@/features/auth/SignUpForm';

export default function SignUpPage() {
  return (
    <>
      <Header menu={<HeaderMenuLink href="/login" label="Login account" />} />
      <SignUpForm />
    </>
  );
}
