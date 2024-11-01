import Typography from '@/components/ui/typography';
import type { ReactNode } from 'react';
import User from '@/components/common/User';
import { convertUtil } from '@/utils/convertUtil';

const PostCard = ({ children }: { children?: ReactNode }) => {
  return (
    <article className="rounded-2xl space-y-5 my-5 bg-accent/20 border px-3 py-4">
      {children}
    </article>
  );
};

const Content = ({ children }: { children?: ReactNode }) => {
  return <Typography.P>{children}</Typography.P>;
};

interface UserProps {
  avatar?: string;
  name?: string;
  username?: string;
  timestamp?: string;
}

const PostCardUser = (props: UserProps) => {
  return (
    <div className="flex justify-between items-center gap-2.5">
      <User {...props} />

      <Typography.Span
        title={convertUtil(props.timestamp)}
        size="sm"
        color="muted"
      />
    </div>
  );
};

PostCard.User = PostCardUser;
PostCard.Content = Content;

export default PostCard;
