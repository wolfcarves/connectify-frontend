import { forwardRef, useState } from 'react';
import type { Comment as CommentType } from '@/services';
import { CommentCard } from './CommentCard';
import useGetRepliesByCommentId from '@/hooks/queries/useGetRepliesByCommentId';
import ReplyCreateForm from '@/features/reply/form/ReplyCreateForm';
import { ReplyCard } from '../Reply/ReplyCard';
import useSession from '@/hooks/useSession';

interface CommentProps {
  data: Omit<CommentType, 'created_at' | 'updated_at'> &
    Partial<Pick<CommentType, 'created_at' | 'updated_at'>>;
}

const Comment = forwardRef<HTMLInputElement, CommentProps>(
  ({ data: comment }: CommentProps, ref) => {
    const session = useSession();

    const [isReplyActive, setIsReplyActive] = useState<boolean>(false);
    const { data: replies, isLoading: isRepliesLoading } =
      useGetRepliesByCommentId(
        comment?.id,
        comment.replies_count === 1 || isReplyActive,
      );

    const handleReplyClick = () => {
      setIsReplyActive(true);
    };

    return (
      <div ref={ref}>
        <CommentCard>
          <CommentCard.Content
            isReplyActive={isReplyActive || comment?.replies_count > 0}
            avatar={comment?.user.avatar}
            name={comment?.user.name}
            username={comment?.user.username}
            comment={comment.comment}
          />
          <CommentCard.Action
            timestamp={comment?.created_at}
            isReplyActive={isReplyActive}
            repliesCount={comment?.replies_count}
            onReplyClick={handleReplyClick}
            isLoading={isRepliesLoading}
          />
        </CommentCard>

        {/* Show reply if only one */}
        {replies &&
          replies?.data.length === 1 &&
          replies?.data.map(reply => (
            <ReplyCard key={reply.id}>
              <ReplyCard.Content
                avatar={reply?.user.avatar}
                username={reply?.user.username}
                name={reply?.user.name}
                reply={reply?.reply}
                isReplyActive={isReplyActive}
              />
              <ReplyCard.Action isReplyActive={isReplyActive} />
            </ReplyCard>
          ))}

        {isReplyActive &&
          replies &&
          replies?.data.length > 1 &&
          replies?.data.map(reply => (
            <ReplyCard key={reply.id}>
              <ReplyCard.Content
                avatar={reply?.user.avatar}
                username={reply?.user.username}
                name={reply?.user.name}
                reply={reply?.reply}
                isReplyActive={isReplyActive}
              />
              <ReplyCard.Action isReplyActive={isReplyActive} />
            </ReplyCard>
          ))}

        {isReplyActive && (
          <ReplyCreateForm commentId={comment?.id} avatar={session.avatar!} />
        )}
      </div>
    );
  },
);

Comment.displayName = 'Comment';

export default Comment;
