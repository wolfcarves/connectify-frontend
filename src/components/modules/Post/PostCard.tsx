import Typography from '@/components/ui/typography';
import type { ReactNode } from 'react';
import User from '@/components/modules/User/User';
import { convertUtil } from '@/utils/convertUtil';

const PostCard = ({ children }: { children?: ReactNode }) => {
  return (
    <article className="rounded-2xl space-y-5 my-5 bg-card border px-3 py-4">
      {children}
    </article>
  );
};

interface UserProps {
  avatar?: string;
  name?: string;
  username?: string;
  timestamp?: string;
}

const PostCardUser = (props: UserProps) => {
  return (
    <div className="flex justify-between items-start gap-2.5">
      <User quality={50} unoptimized {...props} />

      <Typography.Span
        title={convertUtil(props.timestamp)}
        color="muted"
        className="text-xxs xs:text-sm"
      />
    </div>
  );
};

const Content = ({ children }: { children?: ReactNode }) => {
  return <Typography.P>{children}</Typography.P>;
};

PostCard.User = PostCardUser;
PostCard.Content = Content;

export default PostCard;
