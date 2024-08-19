import UserProfileImage from '@/features/user/image/UserProfileImage';
import UserProfilePosts from '@/features/user/tabs/UserProfilePosts';
import {
  GET_ALL_USER_POSTS,
  getAllUserPostsQuery,
} from '@/hooks/queries/useGetAllUserPosts';
import getQueryClient from '@/lib/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const UserProfilePage = async ({
  params,
}: {
  params: { userId?: string; username?: string };
}) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getAllUserPostsQuery(Number(params.userId)));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserProfileImage />
      <UserProfilePosts userId={Number(params.userId)} />
    </HydrationBoundary>
  );
};

export default UserProfilePage;
