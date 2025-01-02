import LogoutForm from '@/features/account-settings/LogoutForm';
import ThemeSwitch from '@/features/account-settings/ThemeSwitch';

const AccountSettings = () => {
  return (
    <>
      <ThemeSwitch />
      <LogoutForm />
    </>
  );
};

export default AccountSettings;
