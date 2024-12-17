import { ComponentProps, useContext, type ReactNode } from 'react';
import { parseDate } from '@/utils/parseDate';
import UserComponent from '@/components/modules/User/User';
import Typography from '@/components/ui/typography';
import { AUDIENCE } from '../../../features/post/modal/PostAudienceModal';
import { PostContext } from './Post';

const PostCard = ({ children }: { children?: ReactNode }) => {
  return (
    <article className="rounded-2xl space-y-5 my-5 bg-card border px-3 pt-4 pb-2">
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

const User = ({ timestamp, ...props }: UserProps) => {
  const postCtx = useContext(PostContext);

  return (
    <>
      <div className="flex gap-x-1">
        <UserComponent
          quality={50}
          unoptimized
          timestamp={parseDate(timestamp)}
          {...props}
        />

        <Typography.Span title="•" color="muted" />

        <Typography.Span
          title={
            AUDIENCE.find(aud => aud.value === postCtx?.ctxValue.audience)?.icon
          }
          color="muted"
          className="text-xxs mt-[0.27rem]"
        />
      </div>
    </>
  );
};

const Content = ({ children }: { children?: ReactNode }) => {
  return (
    <Typography.P className="whitespace-pre-line">{children}</Typography.P>
  );
};

PostCard.User = User;
PostCard.Header = Header;
PostCard.Content = Content;

export default PostCard;
