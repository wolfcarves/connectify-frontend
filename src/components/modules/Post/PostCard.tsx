import { ComponentProps, useContext, useState, type ReactNode } from 'react';
import { parseDate } from '@/utils/parseDate';
import UserComponent from '@/components/modules/User/User';
import Typography from '@/components/ui/typography';
import { AUDIENCE } from './PostAudienceModal';
import { PostContext } from './Post';
import Card from '@/components/common/Card/Card';

interface PostCardProps extends ComponentProps<'div'> {
  children?: ReactNode;
  withBorder?: boolean;
}

const PostCard = ({ children, withBorder = true, ...props }: PostCardProps) => {
  if (!withBorder)
    return (
      <article
        className={`space-y-5 pt-4 pb-2 ${!withBorder && 'pe-2'}`}
        {...props}
      >
        {children}
      </article>
    );

  return (
    <Card className="space-y-5 px-3 pt-4 pb-2" {...props}>
      {children}
    </Card>
  );
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
  const isContentLong = (children as string).length >= 120;

  const [expanded, setExpanded] = useState<boolean>(!isContentLong);

  return (
    <>
      <Typography.P className={`whitespace-pre-line`}>
        <span className={`${!expanded && 'line-clamp-2'}`}>{children}</span>

        {!expanded && (
          <button onClick={() => setExpanded(true)}>
            <Typography.Span
              title="See more..."
              weight="medium"
              className="hover:opacity-90"
            />
          </button>
        )}
      </Typography.P>
    </>
  );
};

PostCard.User = PostCardUser;
PostCard.Header = PostCardHeader;
PostCard.Content = PostCardContent;

export default PostCard;
