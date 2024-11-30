import { ComponentProps, type ReactNode } from 'react';
import { convertUtil } from '@/utils/convertUtil';
import UserComponent from '@/components/modules/User/User';
import Typography from '@/components/ui/typography';

const PostCard = ({ children }: { children?: ReactNode }) => {
  return (
    <article className="rounded-2xl space-y-5 my-5 bg-card border px-3 py-4">
      {children}
    </article>
  );
};

const Header = (props: ComponentProps<'div'>) => {
  return (
    <div className="flex justify-between items-start gap-2.5" {...props} />
  );
};

interface UserProps {
  avatar?: string;
  name?: string;
  username?: string;
  timestamp?: string;
}

const User = ({ username, ...props }: UserProps) => {
  return (
    <>
      <div className="flex">
        <UserComponent
          quality={50}
          unoptimized
          username={username}
          {...props}
        />

        <div className="w-1" />

        <Typography.Span
          title={` • ${convertUtil(props.timestamp)}`}
          color="muted"
          className="mt-0.5 text-xxs"
        />
      </div>
    </>
  );
};

const Content = ({ children }: { children?: ReactNode }) => {
  return <Typography.P>{children}</Typography.P>;
};

PostCard.User = User;
PostCard.Header = Header;
PostCard.Content = Content;

export default PostCard;
