import UserProfileImage from '@/features/user/image/UserProfileImage';
import UserProfilePosts from '@/features/user/tabs/UserProfilePosts';
import UserProfileTab from '@/features/user/tabs/UserProfileTab';
import { withAuthGuard } from '@/higher-order/withAuthGuard';

const UserProfilePage = () => {
  return (
    <>
      <UserProfileImage />
      <UserProfileTab />
      <UserProfilePosts />
    </>
  );
};

export default withAuthGuard(UserProfilePage);
