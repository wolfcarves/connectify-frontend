'use client';

import PostContainer from '@/components/modules/Post/PostContainer';
import Post from '@/components/modules/Post/Post';
import useGetFeedDiscoverPosts from '@/hooks/queries/useGetFeedDiscoverPosts';
import { useIntersection } from '@mantine/hooks';
import { useEffect, useMemo, useRef } from 'react';
import Typography from '@/components/ui/typography';
import PostCreate from '@/components/modules/Post/PostCreate';

const FeedDiscoverPosts = () => {
  const {
    data: posts,
    isPending: isPostsPending,
    fetchNextPage,
    hasNextPage,
  } = useGetFeedDiscoverPosts();

  const triggerElementRef = useRef<HTMLDivElement>(null);

  const { ref, entry } = useIntersection({
    root: triggerElementRef.current,
    threshold: 1,
  });

  const _posts = useMemo(() => posts?.pages.flatMap(p => p.data), [posts]);

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry?.isIntersecting, fetchNextPage]);

  if (_posts?.length === 0)
    return (
      <div className="my-10 mx-auto w-max">
        <Typography.Span title="No posts to show" color="muted" />
      </div>
    );

  return (
    <>
      <PostCreate />

      <PostContainer
        isLoading={isPostsPending}
        isFetchingNextPage={hasNextPage}
        skeletonCount={10}
        className="mt-5"
      >
        {_posts?.map(post => {
          return <Post key={post.post.id} data={post} />;
        })}
        <div ref={ref} />
      </PostContainer>
    </>
  );
};

export default FeedDiscoverPosts;
