'use client';

import PostCardSkeleton from '@/components/modules/Post/PostCardSkeleton';
import PostContainer from '@/components/modules/Post/PostContainer';
import Post from '@/components/modules/Post/Post';
import useGetFeedWorldPosts from '@/hooks/queries/useGetFeedWorldPosts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useGetFeedFriendsPosts from '@/hooks/queries/useGetFeedFriendsPosts';

const FeedWorldPosts = () => {
  const {
    data: posts,
    isLoading: isPostsLoading,
    refetch,
  } = useGetFeedWorldPosts();

  return (
    <PostContainer className="py-10">
      {isPostsLoading && <PostCardSkeleton count={10} />}

      {posts?.map(post => {
        return <Post key={post.post.id} data={post} />;
      })}
    </PostContainer>
  );
};

const FeedFriendsPosts = () => {
  const { data: posts, isLoading: isPostsLoading } = useGetFeedFriendsPosts();

  return (
    <PostContainer className="py-10">
      {isPostsLoading && <PostCardSkeleton count={10} />}

      {posts?.map(post => {
        return <Post key={post.post.id} data={post} />;
      })}
    </PostContainer>
  );
};

const FeedPosts = () => {
  return (
    <Tabs defaultValue="world">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="world">World</TabsTrigger>
        <TabsTrigger value="friends">Friends</TabsTrigger>
      </TabsList>

      <TabsContent value="world">
        <FeedWorldPosts />
      </TabsContent>

      <TabsContent value="friends">
        <FeedFriendsPosts />
      </TabsContent>
    </Tabs>
  );
};

export default FeedPosts;
