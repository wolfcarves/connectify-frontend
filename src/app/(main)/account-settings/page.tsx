import LogoutForm from '@/features/account-settings/forms/LogoutForm';
import { withAuthGuard } from '@/higher-order/withAuthGuard';

const AccountSettings = () => {
  return (
    <>
      {/* <ThemeSwitch /> */}
      <LogoutForm />
    </>
  );
};

export default withAuthGuard(AccountSettings);
