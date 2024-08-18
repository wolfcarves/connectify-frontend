import { ReactNode } from 'react';
import User from '@/components/common/User';
import Typography from '@/components/ui/typography';

interface PostProps {
  postId?: number;
  content?: string;
  action: ReactNode;
  commentSection?: ReactNode;
  created_at?: string;
}

const PostCard = ({
  postId,
  content,
  action,
  commentSection,
  created_at,
}: PostProps) => {
  return (
    <div>
      <article className="rounded-md space-y-4 my-2">
        <User name="Rodel Crisosto" timestamp={created_at} />
        <Typography.P title={content} />
        {action}
      </article>

      {commentSection}
    </div>
  );
};

export default PostCard;
