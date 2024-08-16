import { Button } from '@/components/ui/button';
import {
  AiOutlineLike,
  AiOutlineMessage,
  AiOutlineShareAlt,
} from 'react-icons/ai';
import UserCardInfo from '@/features/user/cards/UserCardInfo';
import { Post } from '@/services';

const UserPostCard = ({ content, likes, comments, shares }: Post) => {
  return (
    <article className="rounded-md space-y-4 my-10">
      <header>
        <UserCardInfo />
      </header>

      <div>
        <p className="font-body text-accent-foreground">{content}</p>
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
  );
};

export default UserPostCard;
