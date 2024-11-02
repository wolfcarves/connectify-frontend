'use client';

import PostCardSkeleton from '@/components/modules/Post/PostCardSkeleton';
import useGetAllUserPosts from '@/hooks/queries/useGetAllUserPosts';
import PostContainer from '@/components/modules/Post/PostContainer';
import Post from '@/components/modules/Post/Post';
import Typography from '@/components/ui/typography';

const UserProfilePosts = ({ username }: { username: string }) => {
  const { data: posts, isLoading: isPostsLoading } =
    useGetAllUserPosts(username);

  return (
    <>
      <Typography.H4 title="Posts" weight="semibold" className="my-7" />

      {!posts && <Typography.Span title="No posts to show" color="muted" />}

      <PostContainer className="pb-10">
        {isPostsLoading && <PostCardSkeleton count={3} />}

        {posts?.map(post => {
          return <Post key={post.post.id} data={post} />;
        })}
      </PostContainer>
    </>
  );
};

export default UserProfilePosts;
