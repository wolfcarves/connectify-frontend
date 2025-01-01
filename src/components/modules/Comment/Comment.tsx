import { forwardRef, memo, useRef, useState } from 'react';
import type { Comment as CommentType } from '@/services';
import { CommentCard } from './CommentCard';
import useGetRepliesByCommentId from '@/hooks/queries/useGetRepliesByCommentId';
import ReplyCreateForm from '@/features/reply/form/ReplyCreateForm';
import Reply from '../Reply/Reply';
import useGetCurrentSession from '@/hooks/queries/useGetCurrentSession';

interface CommentProps {
  postId: number;
  data: CommentType;
  isLocalComment: boolean;
}

const Comment = forwardRef<HTMLInputElement, CommentProps>(
  ({ postId, data: comment, isLocalComment }: CommentProps, ref) => {
    const { data: session } = useGetCurrentSession();
    const replyFormRef = useRef<{ setFocus: () => void }>(null);
    const [localReplies, setLocalReplies] = useState<
      { id: number; content: string }[]
    >([]);

    const [isOptimisticLiked, setIsOptimisticLiked] = useState<boolean>(false);
    const [isReplyOpen, setIsReplyOpen] = useState<boolean>(
      comment?.replies_count === 1 || false,
    );

    const { data: replies, isLoading: isRepliesLoading } =
      useGetRepliesByCommentId({
        postId,
        commentId: comment?.id,
        enabled: comment.replies_count === 1 || isReplyOpen,
      });

    const handleLikeClick = () => {
      if (isLocalComment) setIsOptimisticLiked(true);
    };

    const handleReplyClick = () => {
      setIsReplyOpen(true);
      replyFormRef.current?.setFocus();
    };

    return (
      <div ref={ref}>
        <CommentCard>
          <CommentCard.Content
            isReplyOpen={isReplyOpen || comment?.replies_count !== 0}
            avatar={comment?.user.avatar}
            name={comment?.user.name}
            username={comment?.user.username}
            content={comment.content}
          />
          <CommentCard.Action
            isLiked={isOptimisticLiked || comment.is_liked}
            likesCount={isOptimisticLiked ? 1 : comment.likes_count}
            postId={postId}
            commentId={comment?.id}
            timestamp={comment?.created_at}
            onLikeClick={handleLikeClick}
            onReplyClick={handleReplyClick}
          />
          <CommentCard.ViewAllButton
            visible={!isReplyOpen && comment?.replies_count > 1}
            onClick={handleReplyClick}
            isLoading={isRepliesLoading}
            repliesCount={comment?.replies_count}
          />
        </CommentCard>

        {isReplyOpen &&
          replies?.data.map(data => {
            return (
              <Reply
                key={data?.id}
                postId={postId}
                data={data}
                isNested={false}
              />
            );
          })}

        {localReplies &&
          localReplies.map(reply => {
            return (
              <Reply
                key={reply?.id}
                postId={postId}
                data={{
                  id: reply.id,
                  content: reply.content,
                  is_liked: false,
                  likes_count: 0,
                  replies_count: 0,
                  user: {
                    id: session?.id!,
                    avatar: session?.avatar!,
                    name: session?.name!,
                    username: session?.username!,
                  },
                }}
                isNested={false}
              />
            );
          })}

        {isReplyOpen && !isRepliesLoading && (
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

export default memo(Comment);
