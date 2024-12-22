import { ComponentProps, useContext, type ReactNode } from 'react';
import { parseDate } from '@/utils/parseDate';
import UserComponent from '@/components/modules/User/User';
import Typography from '@/components/ui/typography';
import { AUDIENCE } from './PostAudienceModal';
import { PostContext } from './Post';
import Card from '@/components/common/Card/Card';

const PostCard = ({ children }: { children?: ReactNode }) => {
  return <Card className="space-y-5 my-5 px-3 pt-4 pb-2">{children}</Card>;
};

const PostCardHeader = (props: ComponentProps<'div'>) => {
  return (
    <div className="flex justify-between items-start gap-2.5" {...props} />
  );
};

interface PostCardUserProps {
  avatar?: string;
  name?: string;
  username?: string;
  timestamp?: string;
}

const PostCardUser = ({ timestamp, ...props }: PostCardUserProps) => {
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

const PostCardContent = ({ children }: { children?: ReactNode }) => {
  return (
    <Typography.P className="whitespace-pre-line">{children}</Typography.P>
  );
};

PostCard.User = PostCardUser;
PostCard.Header = PostCardHeader;
PostCard.Content = PostCardContent;

export default PostCard;
