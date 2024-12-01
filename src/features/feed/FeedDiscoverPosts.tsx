'use client';

import PostCardSkeleton from '@/components/modules/Post/PostCardSkeleton';
import PostContainer from '@/components/modules/Post/PostContainer';
import Post from '@/components/modules/Post/Post';
import useGetFeedWorldPosts from '@/hooks/queries/useGetFeedWorldPosts';

const FeedDiscoverPosts = () => {
  const { data: posts, isLoading: isPostsLoading } = useGetFeedWorldPosts();

  return (
    <PostContainer>
      {isPostsLoading && <PostCardSkeleton count={10} />}

      {posts?.map(post => {
        return <Post key={post.post.id} data={post} />;
      })}
    </PostContainer>
  );
};

export default FeedDiscoverPosts;
