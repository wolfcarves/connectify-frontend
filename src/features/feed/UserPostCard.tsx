import React from 'react';
import { Button } from '@/components/ui/button';
import {
  AiOutlineLike,
  AiOutlineMessage,
  AiOutlineShareAlt,
} from 'react-icons/ai';

const UserPostCard = () => {
  return (
    <article className=" rounded-md p-4 space-y-4 my-5">
      <header>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-foreground rounded-full"></div>

          <div>
            <h1 className="text-sm font-medium">Rodel Crisosto</h1>
            <span className="text-sm text-foreground/80">2 hours ago</span>
          </div>
        </div>
      </header>

      <div>
        <p className="font-body text-foreground/70">
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
