'use client';

import PostContainer from '@/components/modules/Post/PostContainer';
import Post from '@/components/modules/Post/Post';
import useGetFeedWorldPosts from '@/hooks/queries/useGetFeedWorldPosts';
import { useIntersection } from '@mantine/hooks';
import { useEffect, useRef } from 'react';

const FeedDiscoverPosts = () => {
  const {
    data: posts,
    isPending: isPostsLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetFeedWorldPosts();
  const triggerElementRef = useRef<HTMLDivElement>(null);

  const { ref, entry } = useIntersection({
    root: triggerElementRef.current,
    threshold: 1,
  });

  const _posts = posts?.pages.flatMap(p => p.data);

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry]);

  return (
    <PostContainer
      isLoading={isPostsLoading}
      isFetchingNextPage={hasNextPage}
      skeletonCount={10}
    >
      {_posts?.map(post => {
        return <Post key={post.post.id} data={post} />;
      })}
      <div ref={ref} />
    </PostContainer>
  );
};

export default FeedDiscoverPosts;
