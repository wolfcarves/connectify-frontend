'use client';

import PostCardSkeleton from '@/components/modules/Post/PostCardSkeleton';
import PostContainer from '@/components/modules/Post/PostContainer';
import Post from '@/components/modules/Post/Post';
import useGetFeedFriendsPosts from '@/hooks/queries/useGetFeedFriendsPosts';

const FeedConnectionPosts = () => {
  const { data: posts, isLoading: isPostsLoading } = useGetFeedFriendsPosts();

  return (
    <PostContainer>
      {isPostsLoading && <PostCardSkeleton count={10} />}

      {posts?.map(post => {
        return <Post key={post.post.uuid} data={post} />;
      })}
    </PostContainer>
  );
};

export default FeedConnectionPosts;
