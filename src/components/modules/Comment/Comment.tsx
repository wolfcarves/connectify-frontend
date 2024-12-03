import { useState } from 'react';
import type { Comment as CommentProps } from '@/services';
import { CommentCard } from './CommentCard';
import useGetRepliesByCommentId from '@/hooks/queries/useGetRepliesByCommentId';
import Reply from '../Reply/Reply';
import ReplyCreateForm from '@/features/reply/form/ReplyCreateForm';

const Comment = ({ data: comment }: { data: CommentProps }) => {
  const [isReplyActive, setIsReplyActive] = useState<boolean>(false);
  const { data: replies } = useGetRepliesByCommentId(
    comment?.id,
    isReplyActive,
  );

  const handleReplyClick = () => {
    setIsReplyActive(true);
  };

  return (
    <>
      <CommentCard>
        <CommentCard.Content
          avatar={comment?.user.avatar}
          name={comment?.user.name}
          username={comment?.user.username}
          comment={comment.comment}
          isReplyActive={comment?.replies_count > 0 || isReplyActive}
        />
        <CommentCard.Action
          isReplyActive={isReplyActive}
          repliesCount={comment?.replies_count}
          onReplyClick={handleReplyClick}
        />
      </CommentCard>

      {replies?.data.map(reply => <Reply key={reply.id} data={reply} />)}

      {isReplyActive && <ReplyCreateForm avatar={comment.user.avatar} />}
    </>
  );
};

export default Comment;
