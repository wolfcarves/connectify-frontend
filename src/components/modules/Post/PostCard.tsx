import { ReactNode } from 'react';
import { Post } from '@/services';
import User from '@/components/common/User';
import Typography from '@/components/ui/typography';

interface PostProps {
  content?: string;
  action: ReactNode;
  commentSection?: ReactNode;
}

const PostCard = ({ content, action, commentSection }: PostProps) => {
  return (
    <>
      <article className="rounded-md space-y-4 my-2">
        <User name="Rodel Crisosto" timestamp="4h" />

        <Typography.P title={content} />

        {action}
      </article>

      {commentSection}
    </>
  );
};

export default PostCard;
