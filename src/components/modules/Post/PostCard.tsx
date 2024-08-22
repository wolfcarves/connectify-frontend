import Typography from '@/components/ui/typography';
import { ReactNode } from 'react';
import Image from 'next/image';
import { convertUtil } from '@/utils/convertUtil';

const PostCard = ({ children }: { children?: ReactNode }) => {
  return <article className="rounded-md space-y-4 my-5">{children}</article>;
};

const Content = ({ children }: { children?: ReactNode }) => {
  return <Typography.P>{children}</Typography.P>;
};

interface UserProps {
  avatar?: string;
  name?: string;
  timestamp?: string;
}

const User = ({ avatar, name, timestamp }: UserProps) => {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`${!avatar && 'animate-pulse'} bg-accent min-w-11 w-11 min-h-11 h-11 relative rounded-full`}
      >
        {avatar && (
          <Image
            alt="avatar"
            src={avatar}
            fill
            className="rounded-full"
            sizes="100%"
          />
        )}
      </div>

      <div className="flex flex-col">
        <Typography.Span title={name} weight="semibold" />
        <Typography.Span
          title={convertUtil(timestamp)}
          size="sm"
          color="muted"
        />
      </div>
    </div>
  );
};

PostCard.User = User;
PostCard.Content = Content;

export default PostCard;
