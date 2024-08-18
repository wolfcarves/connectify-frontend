import LogoutForm from '@/features/account-settings/forms/LogoutForm';
import ThemeSwitch from '@/features/account-settings/switch/ThemeSwitch';
import { withAuthGuard } from '@/higher-order/withAuthGuard';

const AccountSettings = () => {
  return (
    <>
      <ThemeSwitch />
      <LogoutForm />
    </>
  );
};

export default withAuthGuard(AccountSettings);
