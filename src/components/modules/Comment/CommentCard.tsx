import { type ReactNode } from 'react';
import Avatar from '@/components/common/Avatar/Avatar';
import Typography from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Spinner from '@/components/ui/spinner';
import { parseDate } from '@/utils/parseDate';

export const CommentCard = ({ children }: { children?: ReactNode }) => {
  return (
    <article className="w-max max-w-[400px] min-w-[180px]">{children}</article>
  );
};

export const CommentContent = ({
  avatar,
  username,
  name,
  comment,
  isReplyActive,
}: {
  avatar?: string;
  name?: string;
  username?: string;
  comment?: string;
  isReplyActive?: boolean;
}) => {
  return (
    <div className="flex gap-x-2">
      <div>
        <Avatar href={username} src={avatar} size="sm" />
        {isReplyActive && (
          <div className="flex justify-center w-full h-full pt-1.5">
            <div className="w-0.5 h-full bg-border" />
          </div>
        )}
      </div>

      <div
        className="dark:bg-accent bg-card shadow-sm min-h-10 rounded-2xl resize-none focus:outline-0 focus:ring-1 focus:ring-offset-4 focus:ring-border scroll-smooth scrollbar-thumb-foreground/10 scrollbar-track-foreground/0 scrollbar-thin px-3 pt-1.5 pb-2"
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
          title={comment}
          size="sm"
          className="whitespace-pre-line"
        />
      </div>
    </div>
  );
};

export const CommentActionCard = ({
  timestamp,
  isReplyActive,
  repliesCount,
  onReplyClick,
  isLoading,
}: {
  timestamp?: string;
  isReplyActive?: boolean;
  repliesCount?: number;
  onReplyClick?: () => void;
  isLoading?: boolean;
}) => {
  const hasReplies = repliesCount && repliesCount >= 2;

  return (
    <>
      <div className="flex gap-2 items-center ms-10 px-2 pt-0.5 pb-1">
        <Typography.Span
          title={timestamp ? parseDate(timestamp) : 'Just now'}
          size="xs"
          color="muted"
        />

        <div className="flex items-center">
          <Button type="button" variant="ghost" size="xxs">
            <Typography.Span
              title="Like"
              size="xs"
              weight="medium"
              color="muted"
            />
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

      {(!isReplyActive && hasReplies) || (isLoading && hasReplies) ? (
        <>
          <div className="flex h-5 w-full ps-[17px] pb-1">
            <div className="w-7 border-b-2 border-l-2 rounded-bl-xl" />

            <button
              className="flex gap-x-1 my-auto ms-1 hover:opacity-80 mt-1"
              onClick={onReplyClick}
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
      ) : null}
    </>
  );
};

CommentCard.Content = CommentContent;
CommentCard.Action = CommentActionCard;
