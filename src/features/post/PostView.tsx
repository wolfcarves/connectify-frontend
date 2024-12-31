'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  const [localComments, setLocalComments] = useState<
    { id: number; comment: string }[]
  >([]);

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

  const handleCommentSubmit = (commentId: number, value: string) => {
    setLocalComments(prev => [...prev, { id: commentId, comment: value }]);
  };

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
          {/* {localComments &&
            localComments
              .map(comment => {
                return (
                  <div key={comment?.id}>
                    <Comment
                      postId={postData?.post.id!}
                      data={{
                        id: comment.id,
                        user: {
                          avatar: session.avatar!,
                          id: session.userId!,
                          name: session.name!,
                          username: session.username!,
                        },
                        is_liked: false,
                        likes_count: 0,
                        replies_count: 0,
                        content: comment.comment,
                        created_at: 'Just now',
                        updated_at: new Date().toISOString(),
                      }}
                      isLocalComment={true}
                    />
                  </div>
                );
              })
              .reverse()} */}

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
        <CommentInput
          postId={postData?.post?.id}
          onSubmit={handleCommentSubmit}
          modal={modal}
        />
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
