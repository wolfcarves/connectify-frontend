import LogoutForm from '@/features/account-settings/LogoutForm';
import ThemeSwitch from '@/features/account-settings/ThemeSwitch';
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
