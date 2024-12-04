import type { ReactNode } from 'react';
import Avatar from '@/components/common/Avatar/Avatar';
import Typography from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const ReplyCard = ({ children }: { children?: ReactNode }) => {
  return (
    <article className="relative  w-max max-w-[400px] min-w-[180px]">
      {children}
    </article>
  );
};

export const ReplyContent = ({
  avatar,
  username,
  name,
  reply,
  isReplying,
}: {
  avatar?: string;
  name?: string;
  username?: string;
  reply?: string;
  isReplying?: boolean;
}) => {
  return (
    <div className="flex gap-x-2">
      <div className="flex">
        <div className="flex justify-end w-[19px] h-full">
          <div className="w-0.5 h-full bg-muted" />
        </div>

        <div className="w-7 h-4 border-b-2"></div>

        <Avatar src={avatar} size="xs" />
      </div>

      <div
        className="bg-accent min-h-10 rounded-2xl resize-none focus:outline-0 focus:ring-1 focus:ring-offset-4 focus:ring-border scroll-smooth scrollbar-thumb-foreground/10 scrollbar-track-foreground/0 scrollbar-thin px-3 pt-1.5 pb-2"
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
        <Typography.P title={reply} size="sm" />
      </div>
    </div>
  );
};

export const ReplyActionCard = ({
  isReplying,
  onReplyClick,
}: {
  isReplying?: boolean;
  onReplyClick?: () => void;
}) => {
  return (
    <div className="flex">
      <div className="flex justify-center w-[36px] h-[1.90rem]">
        <div className="w-0.5 h-full bg-muted" />
      </div>

      <div className="flex gap-2 items-center ms-10 px-2 pt-1">
        <Typography.Span title="8h" size="xs" color="muted" />

        <div className="flex items-center">
          <Button type="button" variant="ghost" size="xxs">
            <Typography.Span title="Like" size="xs" weight="medium" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="xxs"
            onClick={onReplyClick}
          >
            <Typography.Span title="Reply" size="xs" weight="medium" />
          </Button>
        </div>
      </div>
    </div>
  );
};

ReplyCard.Content = ReplyContent;
ReplyCard.Action = ReplyActionCard;