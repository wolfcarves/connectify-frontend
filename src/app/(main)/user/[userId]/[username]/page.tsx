import UserProfileImage from '@/features/user/image/UserProfileImage';
import UserProfileTabs from '@/features/user/tabs/UserProfileTabs';
import { withAuthGuard } from '@/higher-order/withAuthGuard';

const UserProfilePage = () => {
  return (
    <>
      <UserProfileImage />
      <UserProfileTabs />
    </>
  );
};

export default withAuthGuard(UserProfilePage);
