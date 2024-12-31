import { type ReactNode } from 'react';
import Avatar from '@/components/common/Avatar/Avatar';
import Typography from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Spinner from '@/components/ui/spinner';
import { parseDate } from '@/utils/parseDate';
import useLikeComment from '@/hooks/mutations/useLikeComment';
import { toast } from '@/components/ui/use-toast';

export const CommentCard = ({ children }: { children?: ReactNode }) => {
  return (
    <article className="w-max max-w-[400px] min-w-[180px]">{children}</article>
  );
};

export const CommentContent = ({
  avatar,
  username,
  name,
  content,
  isReplyOpen,
}: {
  avatar?: string;
  name?: string;
  username?: string;
  content?: string;
  isReplyOpen?: boolean;
}) => {
  return (
    <div className="flex gap-x-2">
      <div>
        <Avatar href={username} src={avatar} size="sm" />
        {isReplyOpen && (
          <div className="flex justify-center w-full h-full pt-1.5">
            <div className="w-0.5 h-full bg-border" />
          </div>
        )}
      </div>

      <div
        className="dark:bg-accent bg-card shadow-sm min-h-10 rounded-2xl px-3 pt-1.5 pb-2"
        style={{ overflowWrap: 'anywhere' }}
      >
        <Link href={`/${username}`}>
          <Typography.Span
            title={name}
            size="sm"
            weight="semibold"
            className="hover:opacity-80"
          />
        </Link>
        <Typography.P
          title={content}
          size="sm"
          className="whitespace-pre-line"
        />
      </div>
    </div>
  );
};

export const CommentAction = ({
  postId,
  commentId,
  isLiked,
  likesCount,
  timestamp,
  onLikeClick,
  onReplyClick,
}: {
  postId: number;
  commentId: number;
  likesCount: number;
  isLiked: boolean;
  timestamp: string;
  onLikeClick: () => void;
  onReplyClick: () => void;
}) => {
  const { mutateAsync: likeComment, isPending: isLikeCommentPending } =
    useLikeComment();

  const handleLikeClick = async () => {
    try {
      onLikeClick();
      await likeComment({ postId, commentId });
    } catch (error) {
      toast({ title: 'This post might be deleted' });
    }
  };

  return (
    <>
      <div className="flex gap-2 items-center ms-10 px-2 pt-0.5 pb-1">
        <Typography.Span
          title={timestamp === 'Just now' ? 'Just now' : parseDate(timestamp)}
          size="xs"
          color="muted"
        />

        <div className="flex items-center">
          <Button
            type="button"
            variant="ghost"
            size="xxs"
            onClick={handleLikeClick}
            disabled={isLikeCommentPending}
          >
            <Typography.Span
              title="Like"
              size="xs"
              weight="medium"
              color={isLiked ? 'primary' : 'muted'}
            />

            {likesCount >= 1 && (
              <Typography.Span
                title={`( ${likesCount} )`}
                size="xs"
                weight="medium"
                color={isLiked ? 'primary' : 'muted'}
              />
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="xxs"
            onClick={onReplyClick}
          >
            <Typography.Span
              title="Reply"
              size="xs"
              weight="medium"
              color="muted"
            />
          </Button>
        </div>
      </div>
    </>
  );
};

interface CommentViewAllButtonProps {
  visible?: boolean;
  repliesCount: number;
  isLoading: boolean;
  onClick: () => void;
}

const CommentViewAllButton = ({
  visible,
  repliesCount,
  isLoading,
  onClick,
}: CommentViewAllButtonProps) => {
  if (!visible) return null;

  return (
    <>
      <div className="flex h-5 w-full ps-[17px] pb-1">
        <div className="w-7 border-b-2 border-l-2 rounded-bl-xl" />

        <button
          className="flex gap-x-1 my-auto ms-1 hover:opacity-80 mt-1"
          onClick={onClick}
        >
          <Typography.Span
            title={`View all ${repliesCount} replies`}
            size="xs"
            weight="medium"
            color="muted"
          />
          {isLoading && <Spinner />}
        </button>
      </div>

      <div className="h-3" />
    </>
  );
};

CommentCard.Content = CommentContent;
CommentCard.Action = CommentAction;
CommentCard.ViewAllButton = CommentViewAllButton;
