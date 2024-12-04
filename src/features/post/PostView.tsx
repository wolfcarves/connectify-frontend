'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import useGetUserPost from '@/hooks/queries/useGetUserPost';
import useGetPostComments from '@/hooks/queries/useGetPostComments';
import Post from '@/components/modules/Post/Post';
import PostContainer from '@/components/modules/Post/PostContainer';
import CommentContainer from '@/components/modules/Comment/CommentContainer';
import CommentCreateForm from '../comment/form/CommentCreateForm';
import { notFound } from 'next/navigation';
import Comment from '@/components/modules/Comment/Comment';
import CommentSkeleton from '@/components/modules/Comment/CommentSkeleton';
import { useIntersection } from '@mantine/hooks';

const PostView = ({ uuid }: { uuid: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  const [activeReplies, setActiveReplies] = useState<number[]>([]);

  const { data: postData, isPending: isPostLoading } = useGetUserPost(uuid);
  const {
    data: comments,
    isPending: isCommentsLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetPostComments(postData?.post?.id);

  const handleReplyClick = (commentId: number) => {
    if (!activeReplies.includes(commentId))
      setActiveReplies(prev => [...prev, commentId]);
  };

  const _comments = useMemo(
    () => comments?.pages.flatMap(c => c.data.map(c => c)),
    [comments],
  );

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) fetchNextPage();
  }, [entry?.isIntersecting, fetchNextPage, hasNextPage]);

  if (!postData && !isPostLoading) return notFound();

  return (
    <>
      <PostContainer isLoading={isPostLoading}>
        <Post data={postData} />
      </PostContainer>

      <CommentContainer isLoading={isCommentsLoading}>
        {_comments?.map((comment, idx) => {
          return (
            <React.Fragment key={`${comment.id}${idx}`}>
              {idx === _comments.length - 1 ? (
                <Comment ref={ref} data={comment} />
              ) : (
                <Comment data={comment} />
              )}
            </React.Fragment>
          );
        })}

        {isFetchingNextPage && (
          <div className="space-y-3">
            <CommentSkeleton count={3} />
          </div>
        )}
      </CommentContainer>

      <CommentCreateForm postId={postData?.post?.id} />
    </>
  );
};

export default PostView;
