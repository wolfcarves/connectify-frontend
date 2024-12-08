import { forwardRef, useCallback, useState } from 'react';
import type { Comment as CommentType } from '@/services';
import { CommentCard } from './CommentCard';
import useGetRepliesByCommentId from '@/hooks/queries/useGetRepliesByCommentId';
import useSession from '@/hooks/useSession';
import ReplyCreateForm from '@/features/reply/form/ReplyCreateForm';
import { ReplyCard } from '../Reply/ReplyCard';

interface CommentProps {
  postId?: number;
  data: Omit<CommentType, 'created_at' | 'updated_at'> &
    Partial<Pick<CommentType, 'created_at' | 'updated_at'>>;
}

const Comment = forwardRef<HTMLInputElement, CommentProps>(
  ({ postId, data: comment }: CommentProps, ref) => {
    const session = useSession();

    const [isReplyActive, setIsReplyActive] = useState<boolean>(false);
    const { data: replies, isLoading: isRepliesLoading } =
      useGetRepliesByCommentId({
        postId,
        commentId: comment?.id,
        enabled: comment.replies_count === 1 || isReplyActive,
      });

    const handleReplyClick = () => {
      setIsReplyActive(true);
    };

    return (
      <div ref={ref}>
        <CommentCard>
          <CommentCard.Content
            isReplyActive={isReplyActive || comment?.replies_count !== 0}
            avatar={comment?.user.avatar}
            name={comment?.user.name}
            username={comment?.user.username}
            content={comment.content}
          />
          <CommentCard.Action
            isReplyActive={isReplyActive}
            timestamp={comment?.created_at}
            repliesCount={comment?.replies_count}
            onReplyClick={handleReplyClick}
            isLoading={isRepliesLoading}
          />
        </CommentCard>

        {replies &&
          replies?.data.length > 1 &&
          isReplyActive &&
          replies?.data.map(({ id, user, content, created_at }) => {
            return (
              <ReplyCard key={id}>
                <ReplyCard.Content
                  avatar={user?.avatar}
                  username={user?.username}
                  name={user?.name}
                  reply={content}
                  isReplyActive={isReplyActive}
                />
                <ReplyCard.Action
                  isReplyActive={isReplyActive}
                  timestamp={created_at}
                />
              </ReplyCard>
            );
          })}

        {isReplyActive && !isRepliesLoading && (
          <ReplyCreateForm
            postId={postId}
            commentId={comment?.id}
            avatar={session.avatar!}
          />
        )}
      </div>
    );
  },
);

Comment.displayName = 'Comment';

export default Comment;

{
  /* {isReplyActive &&
          replies &&
          replies?.data.length > 1 &&
          replies?.data.map(reply => (
            <ReplyCard key={reply.id}>
              <ReplyCard.Content
                avatar={reply?.user.avatar}
                username={reply?.user.username}
                name={reply?.user.name}
                reply={reply?.content}
                isReplyActive={isReplyActive}
              />
              <ReplyCard.Action isReplyActive={isReplyActive} />
            </ReplyCard>
          ))}

       */
}
