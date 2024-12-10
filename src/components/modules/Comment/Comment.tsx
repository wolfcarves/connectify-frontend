import { forwardRef, useRef, useState } from 'react';
import type { Comment as CommentType } from '@/services';
import { CommentCard } from './CommentCard';
import useGetRepliesByCommentId from '@/hooks/queries/useGetRepliesByCommentId';
import useSession from '@/hooks/useSession';
import ReplyCreateForm from '@/features/reply/form/ReplyCreateForm';
import Reply from '../Reply/Reply';

interface CommentProps {
  postId?: number;
  data: Omit<CommentType, 'created_at' | 'updated_at'> &
    Partial<Pick<CommentType, 'created_at' | 'updated_at'>>;
}

const Comment = forwardRef<HTMLInputElement, CommentProps>(
  ({ postId, data: comment }: CommentProps, ref) => {
    const session = useSession();
    const replyFormRef = useRef<{ setFocus: () => void }>(null);
    const [localReplies, setLocalReplies] = useState<
      { id: number; content: string }[]
    >([]);
    const [isLocalReplyLoading, seIsLocalReplyLoading] =
      useState<boolean>(false);

    const [isReplyActive, setIsReplyActive] = useState<boolean>(
      comment?.replies_count === 1 || false,
    );

    const { data: replies, isLoading: isRepliesLoading } =
      useGetRepliesByCommentId({
        postId,
        commentId: comment?.id,
        enabled: comment.replies_count === 1 || isReplyActive,
      });

    const handleReplyClick = () => {
      replyFormRef.current?.setFocus();
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
            onReplyClick={handleReplyClick}
            repliesCount={comment?.replies_count}
            isLoading={isRepliesLoading}
            timestamp={comment?.created_at}
          />
        </CommentCard>

        {isReplyActive &&
          replies?.data.map(data => {
            return <Reply key={data?.id} postId={postId} data={data} />;
          })}

        <div className={isLocalReplyLoading ? 'opacity-50' : ''}>
          {localReplies &&
            localReplies.map(reply => {
              return (
                <Reply
                  key={reply?.id}
                  postId={postId}
                  data={{
                    id: reply.id,
                    content: reply.content,
                    replies_count: 0,
                    user: {
                      avatar: session.avatar!,
                      id: session.userId!,
                      name: session.name!,
                      username: session.username!,
                    },
                  }}
                />
              );
            })}
        </div>

        {isReplyActive && !isRepliesLoading && (
          <ReplyCreateForm
            ref={replyFormRef}
            postId={postId}
            commentId={comment?.id}
            onSubmit={(commentId, value) =>
              setLocalReplies(prev => [
                ...prev,
                { id: commentId, content: value },
              ])
            }
          />
        )}
      </div>
    );
  },
);

Comment.displayName = 'Comment';

export default Comment;
