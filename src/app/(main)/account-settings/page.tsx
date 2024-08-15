import LogoutForm from '@/features/account-settings/forms/LogoutForm';
import ThemeSwitch from '@/features/account-settings/switch/ThemeSwitch';

export default function AccountSettings() {
  return (
    <>
      <ThemeSwitch />
      <LogoutForm />
    </>
  );
}
