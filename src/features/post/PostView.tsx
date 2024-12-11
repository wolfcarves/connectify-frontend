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
import useSession from '@/hooks/useSession';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/ui/spinner';

const PostView = ({ uuid }: { uuid: string }) => {
  const session = useSession();
  const [localComments, setLocalComments] = useState<
    { id: number; content: string }[]
  >([]);

  const { data: postData, isPending: isPostLoading } = useGetUserPost(uuid);
  const {
    data: comments,
    isPending: isCommentsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCommentsByPostId(postData?.post?.id);

  const _comments = useMemo(
    () => comments?.pages.flatMap(c => c.data),
    [comments],
  );

  const commentsCount = useMemo(
    () =>
      comments?.pages.map(p => p.pagination.remaining_items)?.[
        comments.pages.length - 1
      ],
    [comments?.pages],
  );

  const handleShowOtherComments = () => {
    fetchNextPage();
  };

  if (!postData && !isPostLoading) return notFound();

  return (
    <>
      <PostContainer isLoading={isPostLoading} skeletonCount={1}>
        <Post data={postData} />
      </PostContainer>

      <CommentContainer isLoading={isCommentsLoading}>
        {localComments &&
          localComments.map(comment => {
            return (
              <div key={comment?.id}>
                <Comment
                  postId={postData?.post?.id}
                  data={{
                    id: comment.id,
                    user: {
                      avatar: session.avatar!,
                      id: session.userId!,
                      name: session.name!,
                      username: session.username!,
                    },
                    replies_count: 0,
                    content: comment.content,
                  }}
                />
              </div>
            );
          })}

        {_comments?.map(comment => {
          return (
            <Comment
              key={comment.id}
              postId={postData?.post?.id}
              data={comment}
            />
          );
        })}

        {hasNextPage && (
          <div className="flex py-1">
            <Button
              variant="ghost"
              size="xxs"
              onClick={handleShowOtherComments}
              disabled={isFetchingNextPage}
            >
              View other {commentsCount} comments
            </Button>

            {isFetchingNextPage && <Spinner />}
          </div>
        )}

        {isFetchingNextPage && (
          <div className="space-y-3">
            <CommentSkeleton count={3} />
          </div>
        )}
      </CommentContainer>

      <CommentCreateForm
        postId={postData?.post?.id}
        onSubmit={(commentId, value) =>
          setLocalComments(prev => [...prev, { id: commentId, content: value }])
        }
      />
    </>
  );
};

export default PostView;
