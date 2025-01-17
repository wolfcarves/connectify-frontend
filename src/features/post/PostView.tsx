'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import useGetUserPost from '@/hooks/queries/useGetUserPost';
import useGetCommentsByPostId from '@/hooks/queries/useGetCommentsByPostId';
import Post from '@/components/modules/Post/Post';
import PostContainer from '@/components/modules/Post/PostContainer';
import CommentContainer from '@/components/modules/Comment/CommentContainer';
import { notFound } from 'next/navigation';
import Comment from '@/components/modules/Comment/Comment';
import CommentSkeleton from '@/components/modules/Comment/CommentSkeleton';
import { useIntersection } from '@mantine/hooks';
import CommentInput from '@/components/modules/Comment/CommentInput';
import ScrollContainer from '@/containers/ScrollContainer';

const PostView = ({ uuid, modal }: { uuid: string; modal: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  const { data: postData, isPending: isPostPending } = useGetUserPost(uuid);
  const {
    data: comments,
    isPending: isCommentsLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetCommentsByPostId(postData?.post?.id!);

  const _comments = useMemo(
    () => comments?.pages.flatMap(c => c.data),
    [comments],
  );

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) fetchNextPage();
  }, [entry?.isIntersecting, fetchNextPage, hasNextPage]);

  if (!postData && !isPostPending) return notFound();

  return (
    <>
      <ScrollContainer enableScroll={modal}>
        <PostContainer isLoading={isPostPending} skeletonCount={1}>
          <Post data={postData!} modal={modal} />
        </PostContainer>

        <CommentContainer
          isLoading={isCommentsLoading}
          hasComment={_comments && _comments?.length > 0}
        >
          {_comments?.map(comment => {
            return (
              <Comment
                key={comment.id}
                postId={postData?.post.id!}
                data={comment}
                isLocalComment={false}
              />
            );
          })}

          {hasNextPage && (
            <div ref={ref} className="space-y-3">
              <CommentSkeleton count={3} />
            </div>
          )}
        </CommentContainer>
      </ScrollContainer>

      {postData?.post.id && (
        <CommentInput postId={postData?.post?.id} modal={modal} />
      )}
    </>
  );
};

{
  /* To avoid last comment to be overlayed by comment input */
}
// {!modal && !hasNextPage && _comments.length - 1 === idx && (
//   <div className="h-24" />
// )}

export default PostView;
