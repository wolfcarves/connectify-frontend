'use client';

import User from '@/components/common/User';
import PostCard from '@/components/modules/Post/PostCard';
import useGetAllUserPosts from '@/hooks/queries/useGetAllUserPosts';

const UserProfilePosts = ({ userId }: { userId: number }) => {
  const { data: posts } = useGetAllUserPosts(userId);

  return (
    <>
      {posts?.map(({ post, user }) => {
        return (
          <PostCard key={post.id}>
            <User
              avatar={user.avatar}
              name={user.name}
              timestamp={post.created_at}
            />
          </PostCard>
        );
      })}
    </>
  );
};

export default UserProfilePosts;
