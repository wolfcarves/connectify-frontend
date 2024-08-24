import Avatar from '@/components/common/Avatar/Avatar';
import Typography from '@/components/ui/typography';
import { Comment as CommentProps } from '@/services';

const Comment = ({ data }: { data?: CommentProps[] }) => {
  return (
    <>
      {data?.map(({ id, comment, user }) => (
        <div key={id} className="flex gap-2">
          <Avatar src={user.avatar} size="sm" />

          <div className="bg-accent min-h-10 rounded-2xl resize-none focus:outline-0 focus:ring-1 focus:ring-offset-4 focus:ring-border scroll-smooth scrollbar-thumb-foreground/10 scrollbar-track-foreground/0 scrollbar-thin px-3 pt-1.5 pb-2">
            <Typography.Span title={user.name} size="sm" weight="semibold" />
            <Typography.P title={comment} size="sm" />
          </div>
        </div>
      ))}
    </>
  );
};

export default Comment;
