'use client';

import PostCardSkeleton from '@/components/modules/Post/PostCardSkeleton';
import PostContainer from '@/components/modules/Post/PostContainer';
import Post from '@/components/modules/Post/Post';
import useGetUserPost from '@/hooks/queries/useGetUserPost';
import BackButton from '@/components/common/BackButton';
import PostCommentForm from './form/PostCommentForm';
import CommentContainer from '@/components/modules/Comment/CommentContainer';
import Comment from '@/components/modules/Comment/Comment';
import useGetPostComments from '@/hooks/queries/useGetPostComments';
import CommentSkeleton from '@/components/modules/Comment/CommentSkeleton';
import { useCallback } from 'react';

const PostView = ({ uuid }: { uuid: string }) => {
  const { data: postData, isLoading: isPostLoading } = useGetUserPost(uuid);
  const { data: commentsData, isLoading: isCommentsLoading } =
    useGetPostComments(postData?.post?.id);

  return (
    <>
      <BackButton />

      <PostContainer>
        {isPostLoading ? (
          <PostCardSkeleton count={1} />
        ) : (
          <Post data={postData} />
        )}
      </PostContainer>

      <CommentContainer>
        {isCommentsLoading ? (
          <CommentSkeleton count={10} />
        ) : (
          <Comment data={commentsData} />
        )}
      </CommentContainer>

      <PostCommentForm uuid={uuid} />
    </>
  );
};

export default PostView;
