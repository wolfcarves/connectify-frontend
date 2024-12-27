'use client';

import PostCardSkeleton from '@/components/modules/Post/PostCardSkeleton';
import useGetAllUserPosts from '@/hooks/queries/useGetAllUserPosts';
import PostContainer from '@/components/modules/Post/PostContainer';
import Post from '@/components/modules/Post/Post';
import Typography from '@/components/ui/typography';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';
import { useIntersection } from '@mantine/hooks';

const UserProfilePosts = () => {
  const params = useParams<{ username: string }>();

  const {
    data: posts,
    isPending: isPostsPending,
    fetchNextPage,
    hasNextPage,
  } = useGetAllUserPosts(params.username);

  const _posts = useMemo(() => posts?.pages.flatMap(p => p.data), [posts]);

  const triggerElementRef = useRef<HTMLDivElement>(null);

  const { ref, entry } = useIntersection({
    root: triggerElementRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting && _posts?.length !== 0) fetchNextPage();
  }, [entry?.isIntersecting, fetchNextPage, hasNextPage, _posts]);

  if (_posts?.length === 0)
    return (
      <div className="my-10 mx-auto w-max">
        <Typography.Span title="No posts to show" color="muted" />
      </div>
    );

  return (
    <>
      <Typography.H4 title="Posts" weight="semibold" className="my-7" />

      {!posts && !isPostsPending && (
        <Typography.Span
          title="No posts to show"
          color="muted"
          className="my-4"
        />
      )}

      <PostContainer
        className="pb-10"
        isLoading={isPostsPending}
        isFetchingNextPage={hasNextPage}
        skeletonCount={10}
      >
        {isPostsPending && <PostCardSkeleton count={3} />}
        {_posts?.map(post => {
          return <Post key={post.post.id} data={post} />;
        })}
        <div ref={ref} />
      </PostContainer>
    </>
  );
};

export default UserProfilePosts;
