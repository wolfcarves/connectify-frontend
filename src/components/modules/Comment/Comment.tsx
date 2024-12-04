import { forwardRef, useState } from 'react';
import type { Comment as CommentType } from '@/services';
import { CommentCard } from './CommentCard';
import useGetRepliesByCommentId from '@/hooks/queries/useGetRepliesByCommentId';
import Reply from '../Reply/Reply';
import ReplyCreateForm from '@/features/reply/form/ReplyCreateForm';

interface CommentProps {
  data: CommentType;
}

const Comment = forwardRef<HTMLInputElement, CommentProps>(
  ({ data: comment }: CommentProps, ref) => {
    const [isReplyActive, setIsReplyActive] = useState<boolean>(false);
    const { data: replies, isLoading: isRepliesLoading } =
      useGetRepliesByCommentId(comment?.id, isReplyActive);

    const handleReplyClick = () => {
      setIsReplyActive(true);
    };

    return (
      <div ref={ref}>
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
            isLoading={isRepliesLoading}
          />
        </CommentCard>

        {isReplyActive &&
          replies?.data.map(reply => <Reply key={reply.id} data={reply} />)}

        {isReplyActive && (
          <ReplyCreateForm
            avatar={comment.user.avatar}
            isLoading={isRepliesLoading}
          />
        )}
      </div>
    );
  },
);

Comment.displayName = 'Comment';

export default Comment;
