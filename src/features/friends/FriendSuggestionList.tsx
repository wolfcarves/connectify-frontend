'use client';

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
import useGetFriendSuggestions from '@/hooks/queries/useGetFriendSuggestions';
import getCloudinaryImageUrl from '@/utils/getCloudinaryImageUrl';

const FriendSuggestionList = () => {
  const { data: friendSuggestions } = useGetFriendSuggestions();

  return (
    <div className="pb-10">
      <Typography.H4 title="Find Friends" className="my-5" weight="medium" />

      <div className="flex flex-wrap justify-between gap-2 mt-10">
        {friendSuggestions?.map(({ id, avatar, name, username }, idx) => {
          const _avatar = getCloudinaryImageUrl(avatar);

          return (
            <article
              key={idx}
              className="flex items-center justify-between w-full sm:max-w-[calc(50%-5px)] h-20 rounded-lg pe-4"
            >
              <div className="flex gap-3">
                <Avatar src={_avatar} />

                <div className="flex flex-col">
                  <Typography.Span title={name} />

                  <Typography.Span
                    title={`@${username}`}
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
          );
        })}
      </div>
    </div>
  );
};

export default FriendSuggestionList;
