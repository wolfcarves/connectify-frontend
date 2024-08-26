'use client';

import React from 'react';
import Avatar from '@/components/common/Avatar/Avatar';
import { Button } from '@/components/ui/button';
import { UserPlus } from '@phosphor-icons/react';
import Typography from '@/components/ui/typography';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const FriendsPage = () => {
  return (
    <div className="pb-10">
      <Typography.H4 title="Find Friends" className="my-5" weight="medium" />

      <div className="flex flex-wrap justify-between gap-2 mt-10">
        {Array.from({ length: 20 }).map((_, idx) => (
          <article
            key={idx}
            className="flex items-center justify-between w-full sm:max-w-[calc(50%-5px)] h-20 rounded-lg pe-4"
          >
            <div className="flex gap-3">
              <Avatar src="" />

              <div className="flex flex-col">
                <Typography.Span title="Rodel Crisosto" />

                <Typography.Span
                  title="3 mutual friends"
                  size="sm"
                  color="muted"
                />
              </div>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="xs"
                    icon={<UserPlus size={20} />}
                  />
                </TooltipTrigger>
                <TooltipContent className="bg-accent" side="right">
                  <Typography.Span title="Add friend" color="muted" />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </article>
        ))}
      </div>
    </div>
  );
};

export default FriendsPage;
