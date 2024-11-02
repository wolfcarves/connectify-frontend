'use client';

import useGetUserPost from '@/hooks/queries/useGetUserPost';
import useGetPostComments from '@/hooks/queries/useGetPostComments';
import Post from '@/components/modules/Post/Post';
import PostContainer from '@/components/modules/Post/PostContainer';
import CommentContainer from '@/components/modules/Comment/CommentContainer';
import Comment from '@/components/modules/Comment/Comment';
import PostCommentForm from './form/PostCommentForm';
import BackButton from '@/components/common/BackButton';

const PostView = ({ uuid }: { uuid: string }) => {
  const { data: postData, isPending: isPostLoading } = useGetUserPost(uuid);
  const { data: commentsData, isPending: isCommentsLoading } =
    useGetPostComments(postData?.post?.id);

  return (
    <>
      <BackButton />
      <PostContainer isLoading={isPostLoading}>
        <Post data={postData} />
      </PostContainer>
      <CommentContainer isLoading={isCommentsLoading}>
        {commentsData?.map(data => <Comment key={data?.id} data={data} />)}
      </CommentContainer>
      <PostCommentForm postId={postData?.post?.id} />
    </>
  );
};

export default PostView;
