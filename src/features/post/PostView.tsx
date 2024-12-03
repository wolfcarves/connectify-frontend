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
import { useState } from 'react';
import { ReplyCard } from '@/components/modules/Reply/ReplyCard';
import Comment from '@/components/modules/Comment/Comment';

const PostView = ({ uuid }: { uuid: string }) => {
  const [activeReplies, setActiveReplies] = useState<number[]>([]);

  const { data: postData, isPending: isPostLoading } = useGetUserPost(uuid);
  const { data: commentsData, isPending: isCommentsLoading } =
    useGetPostComments(postData?.post?.id);

  const handleReplyClick = (commentId: number) => {
    if (!activeReplies.includes(commentId))
      setActiveReplies(prev => [...prev, commentId]);
  };

  if (!postData && !isPostLoading) return notFound();

  return (
    <>
      <PostContainer isLoading={isPostLoading}>
        <Post data={postData} />
      </PostContainer>

      <CommentContainer isLoading={isCommentsLoading}>
        {commentsData?.map(comment => (
          <Comment key={comment.id} data={comment} />
        ))}
      </CommentContainer>

      <CommentCreateForm postId={postData?.post?.id} />
    </>
  );
};

export default PostView;

{
  /* {commentsData?.map(data => (
          <>
            <CommentCard>
              <CommentCard.Content
                avatar={data?.user.avatar}
                name={data?.user.name}
                username={data?.user.username}
                comment={data?.comment}
                isReplyOpen={false}
              />
              <CommentCard.Action
                onReplyClick={() => handleReplyClick(data?.id)}
              />
            </CommentCard>
          </>
        ))} */
}

{
  /* <ReplyCard>
              <ReplyCard.Content
                avatar={data?.user.avatar}
                name={data?.user.name}
                username={data?.user.username}
                reply={data?.comment}
                isReplying={activeReplies.includes(data?.id)}
              />
              <ReplyCard.Action
                isReplying={activeReplies.includes(data?.id)}
                onReplyClick={() => handleReplyClick(data?.id)}
              />
            </ReplyCard>

            {activeReplies.includes(data?.id) && (
              <ReplyInput avatar={data?.user.avatar} />
            )} */
}
