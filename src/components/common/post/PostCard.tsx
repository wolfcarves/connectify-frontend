import { Button } from '@/components/ui/button';
import {
  AiOutlineLike,
  AiOutlineMessage,
  AiOutlineShareAlt,
} from 'react-icons/ai';
import { Post } from '@/services';
import User from '@/components/common/User';
import Typography from '@/components/ui/typography';
import CommentCard from '../Card/CommentCard';

const PostCard = ({ content, likes, comments, shares }: Post) => {
  return (
    <>
      <article className="rounded-md space-y-4 my-2">
        <User name="Rodel Crisosto" timestamp="4h" />

        <div>
          <Typography.P title={content} color="muted" />
        </div>

        <div className="space-x-2">
          <Button variant="ghost" size="sm">
            <AiOutlineLike className="text-lg me-1" />
            {likes}
          </Button>

          <Button variant="ghost" size="sm">
            <AiOutlineMessage className="text-lg me-1" />
            {comments}
          </Button>

          <Button variant="ghost" size="sm">
            <AiOutlineShareAlt className="text-lg me-1" />
            {shares}
          </Button>
        </div>
      </article>

      <div className="border-t">
        <Typography.H6 title="Comments" size="sm" className="my-4" />

        <CommentCard />
      </div>
    </>
  );
};

export default PostCard;
