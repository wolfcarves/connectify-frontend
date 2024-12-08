import type { ReactNode } from 'react';
import Avatar from '@/components/common/Avatar/Avatar';
import Typography from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { parseDate } from '@/utils/parseDate';

export const ReplyCard = ({ children }: { children?: ReactNode }) => {
  return (
    <article className="relative w-max max-w-[400px] min-w-[180px]">
      {children}
    </article>
  );
};

export const ReplyContent = ({
  isReplyActive,
  avatar,
  username,
  name,
  content,
  isNested,
  isLast,
}: {
  isReplyActive?: boolean;
  avatar?: string;
  name?: string;
  username?: string;
  content?: string;
  isNested?: boolean;
  isLast?: boolean;
}) => {
  return (
    <div
      className={`flex gap-x-2 ms-[17px] border-l-2 ${isLast && 'border-l-transparent'}`}
    >
      <div className="flex flex-col">
        <div className="flex">
          <div className="w-7 h-4 border-l-2 border-b-2 rounded-bl-[10px] -translate-x-[2px]" />

          <div className="ms-1.5">
            <Avatar href={username} src={avatar} size="xs" />
            {!isNested && (
              <div className="mx-auto w-0.5 h-full bg-border mt-1.5" />
            )}
          </div>
        </div>
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
        <Typography.P title={content} size="sm" />
      </div>
    </div>
  );
};

export const ReplyActionCard = ({
  isReplyActive,
  onReplyClick,
  timestamp,
  isNested,
  isLast,
}: {
  isReplyActive?: boolean;
  onReplyClick?: () => void;
  timestamp?: string;
  isNested?: boolean;
  isLast?: boolean;
}) => {
  return (
    <div className="flex">
      <div className="flex justify-center w-[36px] h-[1.90rem]">
        {true && (
          <div
            className={`w-0.5 h-full bg-border ${isLast && 'bg-transparent'}`}
          />
        )}
      </div>

      <div
        className={`flex justify-center w-[32px] h-[1.90rem] ${!isNested && 'border-r-2'}`}
      />

      <div className="flex gap-2 items-center ms-6 pt-1">
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
    </div>
  );
};

ReplyCard.Content = ReplyContent;
ReplyCard.Action = ReplyActionCard;
