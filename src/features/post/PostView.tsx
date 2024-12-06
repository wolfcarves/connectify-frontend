'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import useGetUserPost from '@/hooks/queries/useGetUserPost';
import useGetCommentsByPostId from '@/hooks/queries/useGetCommentsByPostId';
import Post from '@/components/modules/Post/Post';
import PostContainer from '@/components/modules/Post/PostContainer';
import CommentContainer from '@/components/modules/Comment/CommentContainer';
import CommentCreateForm from '../comment/form/CommentCreateForm';
import { notFound } from 'next/navigation';
import Comment from '@/components/modules/Comment/Comment';
import CommentSkeleton from '@/components/modules/Comment/CommentSkeleton';
import { useIntersection } from '@mantine/hooks';
import useSession from '@/hooks/useSession';

const PostView = ({ uuid }: { uuid: string }) => {
  const session = useSession();
  const [localComments, setLocalComments] = useState<
    { id: number; comment: string }[]
  >([]);
  const [isLocalCommentLoading, setIsLocalCommentLoading] =
    useState<boolean>(false);

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
    hasNextPage,
  } = useGetCommentsByPostId(postData?.post?.id);

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
      <PostContainer isLoading={isPostLoading} skeletonCount={1}>
        <Post data={postData} />
      </PostContainer>

      <CommentContainer isLoading={isCommentsLoading}>
        {localComments &&
          localComments.map((comment, idx) => {
            return (
              <div key={idx}>
                <Comment
                  data={{
                    id: comment.id,
                    user: {
                      avatar: session.avatar!,
                      id: session.userId!,
                      name: session.name!,
                      username: session.username!,
                    },
                    replies_count: 0,
                    comment: comment.comment,
                  }}
                />
              </div>
            );
          })}

        {_comments?.map((comment, idx) => {
          return (
            <React.Fragment key={`${comment.id}${idx}`}>
              <Comment data={comment} />
            </React.Fragment>
          );
        })}

        {hasNextPage && (
          <div ref={ref} className="space-y-3">
            <CommentSkeleton count={3} />
          </div>
        )}
      </CommentContainer>

      <CommentCreateForm
        postId={postData?.post?.id}
        onLoad={status => setIsLocalCommentLoading(status)}
        onSubmit={(commentId, value) =>
          setLocalComments(prev => [...prev, { id: commentId, comment: value }])
        }
      />
    </>
  );
};

export default PostView;
