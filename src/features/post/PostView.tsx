'use client';

import useGetUserPost from '@/hooks/queries/useGetUserPost';
import useGetPostComments from '@/hooks/queries/useGetPostComments';
import Post from '@/components/modules/Post/Post';
import PostContainer from '@/components/modules/Post/PostContainer';
import CommentContainer from '@/components/modules/Comment/CommentContainer';
import CommentCreateForm from '../comment/form/CommentCreateForm';
import { notFound } from 'next/navigation';
import { CommentCard } from '@/components/modules/Comment/CommentCard';
import ReplyInput from '@/components/modules/Reply/ReplyInput';

const PostView = ({ uuid }: { uuid: string }) => {
  const { data: postData, isPending: isPostLoading } = useGetUserPost(uuid);
  const { data: commentsData, isPending: isCommentsLoading } =
    useGetPostComments(postData?.post?.id);

  if (!postData && !isPostLoading) return notFound();

  return (
    <>
      <PostContainer isLoading={isPostLoading}>
        <Post data={postData} />
      </PostContainer>
      <CommentContainer isLoading={isCommentsLoading}>
        {commentsData?.map(data => (
          <>
            <CommentCard>
              <CommentCard.Content
                avatar={data?.user.avatar}
                name={data?.user.name}
                username={data?.user.username}
                comment={data?.comment}
              />
              <CommentCard.Action />
            </CommentCard>

            <ReplyInput avatar={data?.user.avatar} />
          </>
        ))}
      </CommentContainer>

      <CommentCreateForm postId={postData?.post?.id} />
    </>
  );
};

export default PostView;
