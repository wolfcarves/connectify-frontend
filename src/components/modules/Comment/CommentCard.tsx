import Avatar from '@/components/common/Avatar/Avatar';
import Typography from '@/components/ui/typography';
import { Comment } from '@/services';

const CommentCard = ({ user, comment, created_at, updated_at }: Comment) => {
  return (
    <div className="flex flex-col items-start">
      <div className="flex gap-3">
        <Avatar src="https://github.com/shadcn.png" />

        <div className="bg-card/40 rounded-2xl space-y-0.5 py-2 px-3">
          <Typography.Span title={user.name} size="xs" weight="medium" />
          <Typography.P title={comment} className="w-full" size="sm" />
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
