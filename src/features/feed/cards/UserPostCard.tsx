import { Button } from '@/components/ui/button';
import {
  AiOutlineLike,
  AiOutlineMessage,
  AiOutlineShareAlt,
} from 'react-icons/ai';
import UserCardInfo from '@/features/user/cards/UserCardInfo';

const UserPostCard = () => {
  return (
    <article className="rounded-md space-y-4 my-10">
      <header>
        <UserCardInfo />
      </header>

      <div>
        <p className="font-body text-accent-foreground">
          Worem ipsum dolor sit amet consectetur adipisicing elit. Nisi neque
          totam dolorem accusamus repudiandae aut autem ipsa nemo quos atque
          quibusdam vel expedita iure quod inventore accusantium explicabo
          doloribus voluptatem obcaecati, laboriosam consectetur? Minima iusto,
          quo debitis excepturi optio tenetur!
        </p>
      </div>

      <div className="space-x-2">
        <Button variant="ghost" size="sm">
          <AiOutlineLike className="text-lg me-1" />
          204
        </Button>

        <Button variant="ghost" size="sm">
          <AiOutlineMessage className="text-lg me-1" />
          204
        </Button>

        <Button variant="ghost" size="sm">
          <AiOutlineShareAlt className="text-lg me-1" />
          204
        </Button>
      </div>
    </article>
  );
};

export default UserPostCard;
