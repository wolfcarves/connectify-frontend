import type { ReactNode } from 'react';
import Avatar from '@/components/common/Avatar/Avatar';
import Typography from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
}: {
  avatar?: string;
  name?: string;
  username?: string;
  comment?: string;
}) => {
  return (
    <div className="flex gap-x-2">
      <div>
        <Avatar src={avatar} size="sm" />
        <div className="flex justify-center w-full h-full">
          <div className="w-0.5 h-full bg-muted" />
        </div>
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
        <Typography.P title={comment} size="sm" />
      </div>
    </div>
  );
};

export const CommentActionCard = () => {
  return (
    <div className="flex gap-2 items-center ms-10 px-2">
      <Typography.Span title="8h" size="xs" color="muted" />

      <div className="flex items-center">
        <Button type="button" variant="ghost" size="xxs">
          <Typography.Span title="Like" size="xs" weight="medium" />
        </Button>
        <Button type="button" variant="ghost" size="xxs">
          <Typography.Span title="Reply" size="xs" weight="medium" />
        </Button>
      </div>
    </div>
  );
};

CommentCard.Content = CommentContent;
CommentCard.Action = CommentActionCard;
