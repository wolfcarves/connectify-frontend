import Avatar from '@/components/common/Avatar/Avatar';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import useSession from '@/hooks/useSession';
import { MouseEvent } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';

const ChatDropdownList = ({
  onMessageClick,
}: {
  onMessageClick: (e: MouseEvent<HTMLDivElement>) => void;
}) => {
  const { avatar } = useSession();

  return (
    <div>
      <div className="p-2">
        <Typography.Span
          title="Messages"
          color="muted"
          className="uppercase"
          weight="medium"
          size="sm"
        />
      </div>

      <div className="relative" onClick={onMessageClick}>
        <div className="flex gap-x-2 text-start w-full hover:bg-muted/50 hover:cursor-pointer p-3">
          <Avatar src={avatar} size="lg" />
          <div className="flex flex-col">
            <Typography.Span title="Rodel Crisosto" weight="medium" />
            <Typography.Span
              title="Kumusta na par?"
              className="line-clamp-3"
              size="sm"
              color="muted"
            />
          </div>
        </div>

        <Button
          variant="ghost"
          className="absolute right-5 top-0 bottom-0 my-auto rounded-full hover:bg-muted"
          icon={<HiDotsHorizontal size={20} className="text-foreground/90" />}
          size="icon"
          onClick={e => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

export default ChatDropdownList;
