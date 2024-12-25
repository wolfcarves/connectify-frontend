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
import useSession from '@/hooks/useSession';
import CommentInput from '@/components/modules/Comment/CommentInput';
import PostScrollContainer from '@/components/modules/Post/PostScrollContainer';

const PostView = ({ uuid, modal }: { uuid: string; modal: boolean }) => {
  const session = useSession();
  const [localComments, setLocalComments] = useState<
    { id: number; comment: string }[]
  >([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  const { data: postData, isPending: isPostLoading } = useGetUserPost(uuid);
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

  if (!postData && !isPostLoading) return notFound();

  return (
    <>
      <PostScrollContainer enableScroll={modal}>
        <PostContainer isLoading={isPostLoading} skeletonCount={1}>
          <Post data={postData!} modal={modal} />
        </PostContainer>

        <CommentContainer
          isLoading={isCommentsLoading}
          hasComment={
            localComments.length > 0 || (_comments && _comments?.length > 0)
          }
        >
          {localComments &&
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
                        replies_count: 0,
                        content: comment.comment,
                      }}
                    />
                  </div>
                );
              })
              .reverse()}

          {_comments?.map((comment, idx) => {
            return (
              <React.Fragment key={comment.id}>
                <Comment postId={postData?.post.id!} data={comment} />

                {/* To avoid last comment to be overlayed by comment input */}
                {!modal && !hasNextPage && _comments.length - 1 === idx && (
                  <div className="h-24" />
                )}
              </React.Fragment>
            );
          })}

          {hasNextPage && (
            <div ref={ref} className="space-y-3">
              <CommentSkeleton count={3} />
            </div>
          )}
        </CommentContainer>
      </PostScrollContainer>

      {postData?.post.id && (
        <CommentInput
          postId={postData?.post?.id}
          onSubmit={(commentId, value) =>
            setLocalComments(prev => [
              ...prev,
              { id: commentId, comment: value },
            ])
          }
          modal={modal}
        />
      )}
    </>
  );
};

export default PostView;
