import UserProfileImage from '@/features/user/UserProfileImage';
import UserProfilePosts from '@/features/user/UserProfilePosts';
import { withAuthGuard } from '@/higher-order/withAuthGuard';

interface SearchParams {
  params: { username: string };
}

const UserProfilePage = async ({ params }: SearchParams) => {
  return (
    <>
      <UserProfileImage username={params.username} />
      <UserProfilePosts username={params.username} />
    </>
  );
};

export default withAuthGuard(UserProfilePage);
