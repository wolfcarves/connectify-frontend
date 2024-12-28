import type { ReactNode } from 'react';
import Avatar from '@/components/common/Avatar/Avatar';
import Typography from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { parseDate } from '@/utils/parseDate';
import Spinner from '@/components/ui/spinner';

export const ReplyCard = ({ children }: { children?: ReactNode }) => {
  return (
    <article className="relative w-full max-w-[400px] min-w-[180px]">
      {children}
    </article>
  );
};

export const ReplyContent = ({
  isReplyOpen,
  avatar,
  username,
  name,
  content,
  isNested,
  isLast,
}: {
  isReplyOpen?: boolean;
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
      <div className="flex">
        <div className="w-7 h-4 border-l-2 border-b-2 rounded-bl-[10px] -translate-x-[2px]" />

        <div className="ms-1.5 h-full">
          <Avatar href={username} src={avatar} size="xs" />
          {!isNested && isReplyOpen && (
            <div className="mx-auto w-0.5 h-full bg-border mt-1.5" />
          )}
        </div>
      </div>

      <div className="dark:bg-accent bg-card shadow-sm min-h-10 rounded-2xl px-3 pt-1.5 pb-2">
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
  onReplyClick,
  timestamp,
}: {
  onReplyClick?: () => void;
  timestamp?: string;
}) => {
  return (
    <>
      <div className="flex">
        <div className={`flex justify-center border-l-2 ms-[17px] `} />

        <div className="flex gap-2 items-center ms-[4.5rem] text-nowrap">
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
    </>
  );
};

interface ReplyViewAllButtonProps {
  visible: boolean;
  onClick: () => void;
  isLoading: boolean;
  repliesCount: number;
}

const ReplyViewAllButton = ({
  visible,
  onClick,
  isLoading,
  repliesCount,
}: ReplyViewAllButtonProps) => {
  if (!visible) return null;

  return (
    <div className="flex">
      <div className="w-[1.25rem] border-r-2" />

      <div className="flex h-5 w-full ps-[47px] pb-1">
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

      <div className="h-7" />
    </div>
  );
};

ReplyCard.Content = ReplyContent;
ReplyCard.Action = ReplyActionCard;
ReplyCard.ViewAllButton = ReplyViewAllButton;
